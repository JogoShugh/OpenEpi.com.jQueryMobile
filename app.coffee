define ['modules', 'templates'], (modules, templates) ->
  renderModuleLinks = ->
    info "Loaded all modules successfully...", {timeOut:1000}        
    moduleSelector = $("#moduleSelector")
    tmpl = templates['display-moduleList']
    html = $.jade(tmpl, {modules:modules})
    moduleSelector.append(html)

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
      viewModelData = {} # for raw property values to feed the viewModel monster
      fields = module.inputFields
      for field in fields
        viewModelData[field.id] = field.defaultValue
        tmpl = templates['input-' + field.type]
        html = $.jade(tmpl, field)
        fieldContainer.append(html)
        fieldContainer.find("[data-id='#{field.id}']").each ->
          if field.jqmType?
            $(@)[field.jqmType]() # fortify the DOM element with jQuery goodness
      model = new Backbone.Model(viewModelData) # Backbonify, Knockbackitize, and TKO
      viewModel = kb.viewModel(model)
      ko.applyBindings(viewModel, @)
      # Finallly, rebind the click handler for the "Calculate" button and
      # attach it to the calculate method of the current module
      modulePage.find('.calculate').each ->
        command = $(@)
        command.unbind('click').bind 'click', ->
          result = module.calculate viewModel, (result) ->
            showResult result
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
    , 1000

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
    , 1750