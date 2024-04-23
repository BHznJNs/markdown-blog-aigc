<script setup>
import { ref, onMounted } from "vue"
import { useI18n } from "vue-i18n"
import echartsImporter from "@blog/src/scripts/importers/charts/echarts.js"
import TabView from "../tab-view.vue"
import DataCard from "./data-card.vue"
import sunImage from "../../../../assets/sun.svg"
import articleImage from "../../../../assets/article.svg"
import textImage from "../../../../assets/text.svg"

const data = {
    daysUsed: 81,
    blogCount: 32,
    wordCount: 18800,
}
const { t } = useI18n()
const lastYear = ref(null)
const pastYears = ref(null)
const lastYearChartOption = {"width":900,"height":240,"title":{"top":20,"left":"center","text":"年度字数统计"},"visualMap":{"show":false,"type":"piecewise","pieces":[{"min":0,"max":200},{"min":200,"max":500},{"min":500,"max":1500},{"min":1500,"max":3000},{"min":3000,"max":6000},{"min":6000}]},"calendar":{"top":80,"left":30,"right":30,"cellSize":["auto",16],"range":["2023-3-20","2024-3-19"],"yearLabel":{"show":false}},"series":{"type":"heatmap","coordinateSystem":"calendar","data":[["2023-6-10",504],["2023-6-10",137],["2023-6-10",153],["2023-6-14",3464],["2023-7-7",1744],["2023-7-13",1835],["2023-7-19",504],["2023-7-19",685],["2023-7-19",232],["2023-7-19",259],["2023-8-10",1790],["2023-8-19",612],["2023-9-15",5354],["2023-9-24",63],["2023-9-24",9],["2023-9-30",21],["2023-9-30",34],["2023-10-15",10],["2023-10-16",119],["2023-10-16",453],["2023-10-17",495],["2023-10-21",674],["2023-10-22",690],["2023-10-24",1340],["2023-10-28",803],["2023-10-29",1293],["2023-11-1",1649],["2023-11-16",127],["2023-11-16",254],["2023-11-30",1402],["2023-12-3",49],["2023-12-8",1125],["2023-12-18",4612],["2023-12-19",98],["2023-12-20",147],["2023-12-20",853],["2023-12-27",426],["2023-12-28",201],["2023-12-29",352],["2023-12-29",172],["2023-12-30",117],["2023-12-30",310],["2023-12-30",241],["2023-12-30",90],["2023-12-30",296],["2023-12-30",161],["2023-12-30",143],["2024-1-1",175],["2024-1-1",1805],["2024-1-1",167],["2024-1-2",218],["2024-1-2",744],["2024-1-3",195],["2024-1-3",367],["2024-1-4",208],["2024-1-13",86],["2024-1-13",197],["2024-1-13",108],["2024-1-13",161],["2024-1-13",92],["2024-1-13",134],["2024-1-13",93],["2024-1-13",201],["2024-1-14",132],["2024-1-14",139],["2024-1-18",946],["2024-1-18",575],["2024-1-21",1931],["2024-1-29",84],["2024-2-16",141],["2024-2-17",1409],["2024-2-26",131],["2024-2-26",569],["2024-2-27",634],["2024-2-29",610],["2024-2-29",936],["2024-3-3",72],["2024-3-4",139],["2024-3-7",181],["2024-3-18",515],["2024-3-19",185]]}}
const pastYearsChartOption = {"title":{"top":30,"left":"center","text":"历年字数统计"},"xAxis":{"type":"category","data":[2023,2024]},"yAxis":{"type":"value"},"grid":{"top":80,"left":75},"dataZoom":{"type":"slider","startValue":0,"endValue":5,"zoomLock":true},"series":{"data":[36102,14280],"type":"bar"}}

onMounted(() => {
    lastYear.value.__ChartOptions__ = lastYearChartOption
    pastYears.value.__ChartOptions__ = pastYearsChartOption
    echartsImporter()
})
</script>

<template>
<TabView>
    <div class="data-cards">
        <DataCard
            :imageSrc="sunImage"
            :data="data.daysUsed + ' ' + t('main.overview.dayUnit')"
            :description="t('main.overview.daysUsed')"
        />
        <DataCard
            :imageSrc="articleImage"
            :data="data.blogCount + ' ' + t('main.overview.blogUnit')"
            :description="t('main.overview.blogCount')"
        />
        <DataCard
            :imageSrc="textImage"
            :data="data.wordCount + t('main.overview.wordUnit')"
            :description="t('main.overview.wordCount')"
        />
    </div>

    <div class="data-chart">
        <div ref="lastYear" class="echarts-container"></div>
    </div>
    <div class="data-chart">
        <div ref="pastYears" class="echarts-container"></div>
    </div>
</TabView>
</template>

<style scoped>
.data-cards {
    display: grid;
    gap: 1rem;
    grid-template-columns: repeat(3, 1fr);
}

.data-chart {
    width: 100%;
    max-height: 80vh;
    margin-top: 1rem;
    overflow: auto;
    border-radius: 12px;
    box-shadow: var(--shadow-md-1);
    background-color: var(--default-bg-color);
    transition: box-shadow .3s;
}
.data-chart:hover {
    box-shadow: var(--shadow-md-2);
}

.echarts-container {
    width: 100%;
    height: 600px;
    max-height: 60vh;
}
</style>
