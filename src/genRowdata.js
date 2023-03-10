'use strict'
const zipLongest = (...args) => Array(Math.max(...args.map(a => a.length))).fill('').map((_, i) => args.map(a => a[i] === undefined ? '' : a[i]))

const logger = require('tracer').colorConsole({
format: '{{timestamp}} <{{title}}>{{file}}:{{line}}: {{message}}',
dateformat: 'HH:MM:ss.L',
level: process.env.TRACER_DEBUG || 'info'
})

// const headers = ['text1', 'text2', 'metric']
const headers = ['text1', 'text2']
// const genRowdata = ({ col1, col2 = [], col3 = [], isRow = false }) => {
const genRowdata = ({ col1, col2 = [], isRow = false }) => {
  logger.debug('col1: %j', col1)
  logger.debug('col2: %j', col2)

  let data
  if (isRow) {
    // data = [...col1]
    data = col1
    // logger.debug('\n\t\tdata %j', data)
  } else {
    // data = zipLongest(col1, col2, col3)
    data = zipLongest(col1, col2)
  }

  // logger.debug('\n\tdata %j', data)

  return data.map(row => zipLongest(headers, row)).map(el => Object.fromEntries(new Map(el))) // refer to ag-grid-test.js
}

module.exports = genRowdata
