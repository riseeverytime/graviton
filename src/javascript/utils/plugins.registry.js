import { state } from '@mkenzo_8/puffin'

const registry = new state({
	list: {},
	colorsSchemes: {},
})

function add(pkg) {
	registry.data.list[pkg.name] = pkg
	registry.data.colorsSchemes[pkg.name] = pkg.colorsScheme
}

const PluginsRegistry = {
	registry,
	add,
}

export default PluginsRegistry
