/**
 * Example file showing how to use the eslint-config-nitid package.
 *
 * This is for demonstration only and not part of the actual package.
 */

import nitidConfigFunction from './eslint.config.js'

// Use top-level await to resolve the async config function
const nitidConfig = await nitidConfigFunction()

export default nitidConfig
