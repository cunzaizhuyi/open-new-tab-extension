import { useWebExtensionStorage } from '~/composables/useWebExtensionStorage'

export const storageDemo = useWebExtensionStorage('webext-demo', 'Storage Demo')

export const extensionEnabled = useWebExtensionStorage('extensionEnabled', true)