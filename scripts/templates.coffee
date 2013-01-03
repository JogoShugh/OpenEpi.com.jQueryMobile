(->
  templateNames = ["input-text", "display-moduleList", "input-textarea"]
  templateInsaneNames = ("text!../templates/" + name + ".jade" for name in templateNames)

  define templateInsaneNames, (args...) ->
    templates = {}
    templates[templateNames[i]] = args[i] for i in [0..args.length]
    return templates
)()