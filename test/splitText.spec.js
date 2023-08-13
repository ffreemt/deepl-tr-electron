/* eslint-env mocha */
const expect = require('chai').expect
const file2lines = require('../src/file2lines')
const splitText = require('../src/splitText')

// const consola = require('consola')
// consola.level = process.env.CONSOLA_DEBUG || 4 // set CONSOLA_DEBUG=4 to show debug

const logger = require('tracer').colorConsole({
  // format: '{{timestamp}} <{{title}}>{{file}}:{{line}}: {{message}}',
  dateformat: 'HH:MM:ss.L',
  level: process.env.TRACER_DEBUG || 'debug' // set TRACER_DEBUG=debug
})

const file1 = './data/test-en.txt'
// const file1 = '../data/test-en.txt'
// const file2 = '../data/test-zh.txt'

const lines1 = file2lines(file1)
// const lines2 = file2lines(file2)

// yarn test -f "@1 index"
// pn jest --watch -i filenamePattern -t testNamePatter
describe('@1-splitText-sanity-test', () => {
  // context(' ==== ', () => {

  test('#1-splitText-test-en.txt', async () => {
    /*
        const expect = require('chai').expect; const file2lines = require('./src/file2lines'); const splitText = require('./src/splitText'); const logger = require('tracer').colorConsole();
        const file1 = './data/test-en.txt'; const lines1 = file2lines(file1);

        import { expect } from 'chai' SyntaxError: Cannot use import statement inside the Node.js REPL
        node -r esm

        import { expect } from 'chai'
        import file2lines from './src/file2lines' // with module.exports = file2lines
        import splitText from './src/splitText' // axios does not work
        const file1 = './data/test-en.txt';
        const lines1 = file2lines(file1)

       */
    const numb = 3
    const result = splitText(lines1.slice(0, numb).join('\n'))
    logger.debug('result: %s', result)
    // console.log(result)

    // assert(result.length > 9)
    // assert(result[result.length -1][1].includes('小姐'))

    // lines1.slice(0, numb).join("\n").length: 108 < 1300
    expect(result.length).to.equal(1)
    expect(result[0].split(/\n/).length).to.equal(numb)
  })

  // lines1.slice(0, 10).join("\n").length 1882 => 2
  test('#2-splitText-test-en.txt', () => {
    const numb = 10
    const result = splitText(lines1.slice(0, numb).join('\n'))
    expect(result.length).to.equal(2)
    expect(result[0].split(/\n/).length + result[1].split(/\n/).length).to.equal(numb)
  })

  test('#3-splitText-test-en.txt', () => {
    const result = splitText(lines1.join('\n'))

    const lens = result.map(el => el.split('\n').length)
    // sum of lens == lines1.length
    expect(lens.reduce((acc, val) => acc + val, 0)).to.equal(lines1.length)
  })
  // })
})
