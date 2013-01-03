define [
    'modules', 
    'templates',
    'backbone',
    'backbone-forms',
    'underscore',
    'toastr',
    'jquery',
    'jquery.mobile',
    'jquery.jade'
], 
(
    modules, 
    templates,
    Backbone,
    bbforms,
    _,
    toastr,
    $,
    jqm,
    jade
) ->
  renderModuleLinks = ->
    info "Loaded all modules successfully...", {timeOut:1000}        
    moduleSelector = $("#moduleSelector")
    tmpl = templates['display-moduleList']
    mods = new Object()
    mods.modules = modules
    html = $.jade(tmpl, mods)
    moduleSelector.append(html)

  moduleLoad = (moduleName) ->
    modulePage = $("#module")
    module = getModule moduleName
    if not module?
      return      
    moduleModel = getModuleModel module
    if not moduleModel?
      return

    $("#resultsMissing").show()
    $("#resultsPane").hide()
    modulePage.find('.fields').each ->      
      fieldContainer = $(@)
      fieldContainer.empty()
      
      model = new moduleModel
      form = new Backbone.Form(model: model).render()
      fieldContainer.html(form.el)

      window.CurrentModule = module
      window.CurrentModel = model # I know, evil...

      # Finallly, rebind the click handler for the "Calculate" button and
      # attach it to the calculate method of the current module
      modulePage.find('.calculate').each ->
        command = $(@)
        command.unbind('click').bind 'click', ->
          formValue = form.getValue()
          console.log formValue
          result = module.calculate formValue, (result) ->
            showResult result

      $.mobile.changePage("#module")
      modulePage.trigger('create'); # enhance the controls, JQM style

  moduleModels = {}

  getModule = (moduleName) ->
    module = modules[moduleName]
    if not module?
      error "Could not find module #{moduleName}"
      return null
    return module  

  getModuleModel = (module) ->
    moduleModel = moduleModels[module.name]
    if not moduleModel?
      moduleModel = Backbone.Model.extend(schema: module.inputFields)
      moduleModels[module.name] = moduleModel
    return moduleModel

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
    , 100

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