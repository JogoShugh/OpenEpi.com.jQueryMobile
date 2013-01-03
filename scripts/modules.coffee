define [
	'../modules/stdMortRatio',
	'../modules/add',
	'../modules/proportion'
]
, (args...) -> 
	modules = {}
	modules[module.name] = module for module in args
	return modules