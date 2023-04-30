# deepl-tr-electron
[![DeepScan grade](https://deepscan.io/api/teams/19673/projects/23765/branches/725180/badge/grade.svg)](https://deepscan.io/dashboard#view=project&tid=19673&pid=23765&bid=725180) [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

deepl translate using deepl-scraper-pp2, electron and ag-grid

![deepl-tr-electron illustrated](https://raw.githubusercontent.com/ffreemt/deepl-tr-electron/main/data/deepl-tr-electron.png)

## Features
  * Translate between various languages pairs (select a target language from Options)
  * Save .csv and .docx (topdown and side-by-side)
    * topdown format: source text highlighted, ready for one-click-hide

    * side-by-side format: a two-column table
  * (new) Save translated text only (Save(trtxt)
![docx](https://raw.githubusercontent.com/ffreemt/deepl-tr-electron/main/data/docx.png)
 ![docxtable](https://raw.githubusercontent.com/ffreemt/deepl-tr-electron/main/data/docx-t.png)

## Installation (currently Windows only)
Download from [https://github.com/ffreemt/deepl-tr-electron/releases](https://github.com/ffreemt/deepl-tr-electron/releases) and click through.

## Usuage

* Execute the app as usual
* Click a cell or press Enter to edit; Click some other cell or rress Enter to exit editing.
* ctrl-T to translate or click menu File/DeeplTr

## For Developers

* Clone the repo
* Run `npm install` or `yarn` to install packages
* `npx electron .`
