import { defineConfig } from "vite"
import vueI18n from "@intlify/unplugin-vue-i18n/vite"
import vue from "@vitejs/plugin-vue"
import path from "path"

// https://vitejs.dev/config/
export default defineConfig({
    base: "./",
    root: "./renderer",
    build: {
        outDir: "../dist",
        minify: false,
        rollupOptions: {
            external: /blog\//
        },
    },
    resolve: {
        alias: {
            "@blog": path.resolve(__dirname, "../blog/")
        }  
    },
    plugins: [
        vue({
            template: {
                compilerOptions: {
                    isCustomElement: (tag) => tag.includes("-")
                }
            }
        }),
        vueI18n({
            include: path.resolve(__dirname, "../renderer/src/locales/**"),
        })
    ],
})
