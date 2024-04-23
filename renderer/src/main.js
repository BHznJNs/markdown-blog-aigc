import "./styles/style.css"
import { createApp } from "vue"
import i18n from "./scripts/i18n.js"
import router from "./scripts/router.js"
import App from "./App.vue"

const app = createApp(App)
app.use(i18n)
app.use(router)
app.mount("#app")
