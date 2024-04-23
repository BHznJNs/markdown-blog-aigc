import { createRouter, createWebHashHistory } from "vue-router"
import Overview from "../components/tabs/overview/overview.vue"
import Writing from "../components/tabs/writing/writing.vue"
import Release from "../components/tabs/release.vue"
import Setting from "../components/tabs/setting.vue"

const routes = [
    { path: "/", component: Overview },
    { path: "/overview", component: Overview },
    {
        path: "/writing",
        component: Writing,
        // children: [
        //     { path: ""        , component: Editor      },
        //     { path: "edit"    , component: Editor      },
        //     { path: "preview" , component: Preview     },
        //     { path: "files"   , component: FileBrowser },
        // ]
    },
    { path: "/release", component: Release },
    { path: "/setting", component: Setting },
]

const options = {
    history: createWebHashHistory(),
    routes,
}

export default createRouter(options)
