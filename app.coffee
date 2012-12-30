define ['modules', 'templates'], (modules, templates) ->

  renderModuleLinks = ->
    info "Loaded all modules successfully...", {timeOut:1000}        
    moduleSelector = $("#moduleSelector")
    tmpl = templates['display-moduleList'];
    html = $.jade(tmpl, {modules:modules});
    moduleSelector.append(html);

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

        tmpl = templates['input-' + field.type]
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
        command.unbind('click').bind 'click', ->
          result = module.calculate(viewModel)
          showResult result

      # Show it!
      $.mobile.changePage("#module")

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