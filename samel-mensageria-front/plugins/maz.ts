import { installToaster, type ToasterOptions } from 'maz-ui'

export default defineNuxtPlugin((nuxtApp) => {
    const toasterOptions: ToasterOptions = {
        position: 'bottom-right',
        timeout: 10_000,
        persistent: false,
      } 
    nuxtApp.vueApp.use(installToaster, toasterOptions)
})