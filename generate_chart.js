const fs = require('fs')

const raw = JSON.parse(fs.readFileSync('data.json', 'utf8'))

const labels = raw.map((entry) => entry.date)
const data = raw.map((entry) => entry.value)

const chartConfig = {
    type: 'line',
    data: {
        labels,
        datasets: [
            {
                label: 'Impact probability %',
                data,
                borderColor: 'blue',
                fill: false,
            },
        ],
    },
    options: {
        scales: {
            x: { title: { display: true, text: 'Date' } },
            y: { title: { display: true, text: 'Value' } },
        },
    },
}

let readmeContent = fs.existsSync('README.md')
    ? fs.readFileSync('README.md', 'utf8')
    : ''

const quickChartUrl = `https://quickchart.io/chart?c=${encodeURIComponent(
    JSON.stringify(chartConfig)
)}`

const chartMarkdown = `![Chart](${quickChartUrl})`

const chartRegex = /!\[Chart\]\(https:\/\/quickchart\.io\/chart\?c=.*?\)/

readmeContent = readmeContent.replace(chartRegex, chartMarkdown)

fs.writeFileSync('README.md', readmeContent, 'utf8')

console.log('Updated README.md with new chart image.')
