const fs = require('fs')
const dateFns = require('date-fns')

const json = require('./data.json')

async function getData(url) {
    const response = await fetch(url)
    const data = await response.json()
    return data
}

async function init() {
    const { data } = await getData(
        'https://ssd-api.jpl.nasa.gov/sentry.api?des=2024%20YR4'
    )
    const { ip } = data.find((d) => d.date.startsWith('2032'))
    const collected = new Date()
    const today = dateFns.format(new Date(), 'dd MMM yyyy')
    fs.writeFileSync(
        './data.json',
        JSON.stringify(
            [...json, { date: today, value: +ip * 100, collected: +collected }],
            null,
            2
        )
    )
}

init()
