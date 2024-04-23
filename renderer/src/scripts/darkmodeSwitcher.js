import eventbus from "@blog/src/utils/eventbus/inst.js"

const darkModeMediaQuery = window.matchMedia
    && window.matchMedia("(prefers-color-scheme: dark)")
const darkModeSwitcher = () => {
    const isDarkMode = darkModeMediaQuery.matches
    document.body.classList.toggle("dark", isDarkMode)
    windowOperation.setWindowBgColor(isDarkMode ? "#000000" : "#f7f7f7")
    eventbus.emit("darkmode-toggle", isDarkMode)
}

const observer = new MutationObserver(() => {
    const isDarkMode = document.body.classList.contains("dark")
    eventbus.emit("darkmode-toggle", isDarkMode)
})
observer.observe(document.body, {
    attributes: true,
    attributeFilter: ["class"]
})

export default function() {
    if (!darkModeMediaQuery) {
        return
    }
    darkModeMediaQuery.addListener(darkModeSwitcher)
    darkModeSwitcher()
}
