const { spawn } = require('node:child_process')
// const ls = spawn('ls', ['-lh', '/usr'])

// python\install\python.exe -s -m dezmq
const python = spawn('../app/install/python.exe', ['-s', '-m', 'deepl_scraper_pp2.run_uvicorn'])

python.stdout.on('data', data => {
  console.log(`stdout: ${data}`)
})

python.stderr.on('data', data => {
  console.error(`stderr: ${data}`)
})

python.on('close', code => {
  console.log(`child process exited with code ${code}`)
})
