import { addImportsDir, addServerScanDir, createResolver, defineNuxtModule } from '@nuxt/kit'
import type { NuxtModule } from '@nuxt/schema'

export interface ModuleOptions {}

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: 'authme',
    configKey: 'authme',
    compatibility: {
      nuxt: '^3.0.0'
    }
  },
  defaults: {},
  setup(_options, nuxt) {
    const resolver = createResolver(import.meta.url)
    const runtimeDir = resolver.resolve('./runtime')

    // Register server middleware and API (Nitro will scan server/middleware and server/api)
    addServerScanDir(resolver.resolve('./runtime/server'), { prepend: true })

    // Auto-import composables (useUser)
    addImportsDir(resolver.resolve('./runtime/composables'))
  }
}) as NuxtModule<ModuleOptions>
