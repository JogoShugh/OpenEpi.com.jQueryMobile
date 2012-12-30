templates = {}
modules = {}

fetchInputFieldTemplates = (callback) ->
  templateNames = ['input-text-tmpl', 'display-moduleList-tmpl']
  count = templateNames.length
  for i in [0..templateNames.length - 1]
    # This is a little tricky here...
    # The reason we need to define a closure is that the value of templateName must be closed
    # from the iteration value. Otherwise, by the time the async callback function inside
    # of each 'done' call executes, the value of currentTemplateName is always the LAST
    # name, which results in nothing good.
    # 
    # So, by closing it into a function, and then immediately calling it, everything works out fine
    getTemplate = ->
      currentTemplateName = templateNames[i]
      src = 'templates/' + currentTemplateName + '.jade'
      $.ajax(src, {dataType:'text'})    
        .done (data) ->
          templates[currentTemplateName] = data
          count--
          if count == 0
            callback()
        .fail (ex) ->
          count--
          error "Error loading input field templates in fetchInputFieldTemplates: " + ex        
          if count == 0
            callback()
    getTemplate()

bindModuleLinks = (callback) ->
  count = moduleLinks._links.modules.length
  totalCount = count
  successCount = 0
  for moduleLink in moduleLinks._links.modules
    $.ajax(moduleLink.href, {dataType:'text'})
      .done (data) ->
        eval('module = ' + data) # yes, eval :-D
        name = module.name
        modules[name] = module
        count--
        successCount++
        if count == 0
          info "Loaded #{successCount} of #{totalCount} modules correctly...", {timeOut:1000}
          callback()
      .fail (ex) ->
        count--
        error "Error loading module definition for module named #{moduleLink.id}: " + ex
        if count == 0
          info "Loaded #{successCount} of #{totalCount} modules correctly...", {timeOut:1000}        
          callback()

renderModuleLinks = ->
  moduleSelector = $("#moduleSelector")
  tmpl = templates['display-moduleList-tmpl']
  html = $.jade(tmpl, {modules:modules});
  moduleSelector.append(html);
  moduleList = $("#moduleList")
  #moduleList.listview()
  #moduleList.listview('refresh')

moduleLoad = (moduleName) ->
  modulePage = $("#module")
  module = modules[moduleName]
  if not module?
    error "Could not find module #{moduleName}"
    return

  $("#resultsMissing").show()
  $("#resultsPane").hide()

  modulePage.find('.fields').each ->
    fieldContainer = $(@)
    fieldContainer.empty()

    # Create a collection of raw values for a bindable model
    viewModelData = {}    

    fields = module.inputFields
    for field in fields
      viewModelData[field.id] = field.defaultValue

      tmpl = templates['input-' + field.type + '-tmpl']
      html = $.jade(tmpl, field);
      fieldContainer.append(html);

      # This calls the jquery mobile type on the field to "vivify it":
      fieldContainer.find("[data-id='#{field.id}']").each ->
        $(@)[field.jqmType]()

    # Create the bindable model with Backbone, Knockback, and Knockout :-D
    model = new Backbone.Model(viewModelData)
    viewModel = kb.viewModel(model)
    ko.applyBindings(viewModel, @)

    # Finallly, rebind the click handler for the "Calculate" button and
    # attach it to the calculate method of the current module
    modulePage.find('.calculate').each ->
      command = $(@)
      command.unbind('click')
      command.bind 'click', ->
        result = module.calculate(viewModel)
        showResult result

    # Show it!
    $.mobile.changePage("#module")
    $(".enterButton").addClass('ui-btn-down')

showResult = (result) ->  
  resultPage = $("#results")
  resultData = $("#resultData")
  drumRoll = $("#drumRoll")
  resultData.hide()  
  drumRoll.show()
  $("#resultsMissing").hide()
  $("#resultsPane").show()  
  $.mobile.changePage("#results")  
  window.setTimeout ->
    drumRoll.fadeOut().promise().done ->
      resultData.html(result)
      resultData.fadeIn()
  ,
    1000

info = (message, options) ->
  toastr.info message, options

error = (message) ->
  toastr.error message
  console.log 'OpenEpi Error:' + message  

$ ->
  fetchInputFieldTemplates ->
    bindModuleLinks ->
      renderModuleLinks()
      $('.moduleItem a').each ->        
        item = $(@)
        moduleName = item.attr('data-moduleName')
        item.bind 'click', ->
          moduleLoad moduleName    
      window.setTimeout ->
        $.mobile.changePage "#home"
      , 
        1750