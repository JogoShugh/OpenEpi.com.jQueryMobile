define [
    'modules', 
    'templates',
    'backbone',
    'backbone-forms',
    'underscore',
    'toastr',
    'jquery',
    'jquery.mobile',
    'jquery.jade',
    'dateFormat'
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
    jade,
    dateFormat
) ->
  log = (message) ->
    console.log message

  info = (message, options) ->
    options = toastOptions options
    log options
    toastr.info message, options

  success = (message, options) ->
    options = toastOptions options  
    toastr.success message, options

  toastOptions = (options) ->
    if not options? 
      options = {}
    options.positionClass = 'toast-bottom-right'
    return options

  error = (message) ->
    toastr.error message
    console.log 'OpenEpi Error:' + message

  class OpenEpiShell
    constructor: ->
      @moduleModels = {}
      @templateModules = []
      @templatesListRendered = false

      $ =>
        h = $(window).height()
        $("#splash").css("height", h)
        $.mobile.loading('show')
        $('#bodyDiv').css('visibility','visible').hide().fadeIn('slow');
        $.mobile.loading('hide')

        $("#more").on
          popupbeforeposition: ->
            h = $(window).height()
            $("#more").css("height", h)

        $("#moreModule").on
          popupbeforeposition: ->
            h = $(window).height()
            $("#moreModule").css("height", h)            

        @renderModuleLinks()

        window.setTimeout ->
          $.mobile.changePage "#home"
        , 1750

    renderModuleLinks: ->
      info "Loaded all modules successfully...", {timeOut:1000}
      moduleSelector = $("#moduleSelector")
      tmpl = templates['display-moduleList']
      mods = modules : modules
      html = $.jade(tmpl, mods)
      moduleSelector.append(html)
      that = @
      $('.moduleItem a').each ->
        item = $(@)
        moduleName = item.attr('data-moduleName')
        item.bind 'click', =>
          that.moduleLoad moduleName

    moduleLoad: (moduleName, formValue) ->
      modulePage = $("#module")
      module = @getModule moduleName
      if not module?
        return      
      moduleModel = @getModuleModel module
      if not moduleModel?
        return

      $("#resultsMissing").show()
      $("#resultsPane").hide()

      modulePage.find('.fields').each (i, el) =>
        fieldContainer = $(el)
        fieldContainer.empty()
        $("#moduleTitle").text(module.title)
        model = new moduleModel
        args = model: model        
        formModel = new Backbone.Form(args)
        if formValue?
          formModel.model.attributes = formValue
        form = formModel.render()
        fieldContainer.html(form.el)

        # Finallly, rebind the click handler for the "Calculate" button and
        # attach it to the calculate method of the current module
        modulePage.find('.calculate').each (i, el) =>
          command = $(el)
          command.unbind('click').bind 'click', =>
            formValue = form.getValue()      
            $.mobile.loading('show')
            module.calculate formValue, (result) =>
              @showResult result, module.render
              $.mobile.loading('hide')
            , @error

        modulePage.find('.templateSave').each (i, el) =>
          command = $(el)
          command.unbind('click').bind 'click', =>
            formValue = form.getValue()
            @templatesAdd module, formValue
            stp = $('#saveTemplatePopup')
            stp.popup 'close'

        $("#moduleSummary").html(module.summary)
        $("#moduleDescription").html(module.description)
        authors = $("<div style='padding-left:5px'></div>")
        for authorType, authorCredit of module.authors
          authors.append("<div style='color:#333333'><b style='color:#555555'>#{authorType}:</b> #{authorCredit}</div>")
        $("#moduleAuthors").append(authors)
        $("#moduleInfo").collapsible()

        $.mobile.changePage("#module")
        modulePage.trigger('create'); # enhance the controls, JQM style

    getModule: (moduleName) ->
      module = modules[moduleName]
      if not module?
        error "Could not find module #{moduleName}"
        return null
      return module

    getModuleModel: (module) ->
      moduleModel = @moduleModels[module.name]
      if not moduleModel?
        moduleModel = Backbone.Model.extend(schema: module.inputFields)
        @moduleModels[module.name] = moduleModel
      return moduleModel

    showResult: (result, renderFn) ->
      resultPage = $('#results')
      resultData = $('#resultData')
      processing = $('#processing')
      resultData.hide()  
      processing.show()
      $("#resultsMissing").hide()
      $("#resultsPane").show()  
      $.mobile.changePage('#results')
      window.setTimeout ->
        processing.fadeOut().promise().done ->
          completeRender = (html) ->
            resultData.empty()
            resultData.append(html)
            resultData.fadeIn(200)
          renderFn(result, completeRender, error)
      , 200

    templatesAdd: (module, formValue) ->
      templateName = $('#templateName').val()
      templateModule = {templateName: templateName, module: module, formValue: formValue, dateTime: new Date().format()}
      @templateModules.unshift templateModule
      success "Template #{templateName} added"
      @templateModulesListRender()

    templateModulesListRender: ->
      templateModuleSelector = $("#templateModules")
      if (@templatesListRendered == false)
        tmpl = templates['display-templatesList']
        html = $.jade(tmpl, {})
        templateModuleSelector.append(html)
      
      $('#templateModulesList').empty()
      
      mods = templateModules : @templateModules
      tmplItems = templates['display-templatesListItem']
      items = $.jade(tmplItems, mods)
      $('#templateModulesList').append(items)
      
      $('.templateModule').children('a').each (i, el) =>
        item = $(el)
        index = Number(item.attr('data-index'))
        templateModule = @templateModules[index]
        moduleName = templateModule.module.name
        formValue = templateModule.formValue 
        item.bind 'click', =>
          @moduleLoad moduleName, formValue
      
      if @templatesListRendered
        try
          $('#templateModulesList').listview('refresh')
        catch ex
          console.log "Error:"
          console.log ex
      else  
        @templatesListRendered = true

  return OpenEpiShell
