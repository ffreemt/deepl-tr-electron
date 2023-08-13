// -r esm
// import { expect } from "chai";
// import foo from "../src/foo";
// import consola from "consola";

/* eslint-env mocha */
const expect = require('chai').expect
const file2lines = require('../src/file2lines')

// const restAlign = require('../src/restAlign')
const deeplTranslate = require('../src/deeplTranslate')

// const consola = require('consola')
// consola.level = process.env.CONSOLA_DEBUG || 4 // set CONSOLA_DEBUG=4 to show debug

const logger = require('tracer').colorConsole({
  // format: '{{timestamp}} <{{title}}>{{file}}:{{line}}: {{message}}',
  dateformat: 'HH:MM:ss.L',
  level: process.env.TRACER_DEBUG || 'info' // set TRACER_DEBUG=debug
})

const file1 = './data/test-en.txt'
// const file2 = '../data/test-zh.txt'

const lines1 = file2lines(file1)
// const lines2 = file2lines(file2)

logger.debug('test-en.txt lines1: %s', lines1.slice(0, 3))
// logger.debug('test-zh.txt lines2: %j', lines2.slice(0, 2))

// yarn test -f "@1 index"
describe('@1-deeplTranslate-sanity-test', () => {
  // context(' ==== ', () => {

  test('#1-deeplTranslate-test-en.txt', async () => {
    // let [lines1a, lines2a] = [lines1.slice(0,10), lines2.slice(0,10)]
    let len = 10
    len = 6
    const result = await deeplTranslate(lines1.slice(0, len).join('\n'))
    logger.debug('result: %s', result)
    // console.log(result)

    // splitlines(result)
    const lines = result.trim().split(/[\r\n]+/)
    expect(lines.length).to.equal(len)
  })

  test('#2-deeplTranslate-test-en.txt', async () => {
    let len = 14
    len = 5
    const result = await deeplTranslate(lines1.slice(0, len).join('\n'))
    logger.debug('result: %j', result)

    // console.log(result)
    // expect(result.length).least(2)
    // expect(result.length).least(6)

    // splitlines(result)
    const lines = result.trim().split(/[\r\n]+/)
    expect(lines.length).to.equal(len)
  })
  // })
})
