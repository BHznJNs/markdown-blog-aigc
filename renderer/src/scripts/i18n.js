import { createI18n } from "vue-i18n"
import messages from "@intlify/unplugin-vue-i18n/messages"

const options = {
    legacy: false,
    locale: "cn",
    fallbackLocale: "en",
    messages,
}

export default createI18n(options)
