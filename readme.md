<p align="center">
	<img align="center" src="https://graviton.netlify.app/logo.png"  width="256" height="64.5"/>
	<br>
	<a href="https://graviton.netlify.app">graviton.netlify.app</a>
</p>



[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://github.com/Graviton-Code-Editor/Graviton-App/blob/master/LICENSE.md)
![GitHub All Releases](https://img.shields.io/github/downloads/Graviton-Code-Editor/Graviton-App/total.svg)
![Commits](https://img.shields.io/github/commit-activity/m/Graviton-Code-Editor/Graviton-App/main)
[![GitHub contributors](https://img.shields.io/github/contributors/Graviton-Code-Editor/Graviton-App.svg)](https://GitHub.com/Graviton-Code-Editor/Graviton-App/graphs/contributors/)
[![Open Source Love svg3](https://badges.frapsoft.com/os/v3/open-source.svg?v=103)](https://github.com/Graviton-Code-Editor/Graviton-App/)
[![Discord Server](https://discordapp.com/api/guilds/536130219057086514/widget.png)](https://discord.gg/gg6CTYA)

Graviton is a Code Editor, for Desktop or as server service (WIP). 

See [this](./book/src/building.md) to run / compile it, by yourself. (There aren't any releases of the new version)

**NOTE**: Graviton is being rewritten, if you are searching for the old version (v2.3.0) go to this other [branch](https://github.com/Graviton-Code-Editor/Graviton-App/tree/2.3.0). Learn more about [here](https://github.com/Graviton-Code-Editor/Graviton-App/discussions/292).

Current state of the rewrite:

[![Screenshot of Graviton Rewrite](./screenshot.png)](./screenshot.png)

### 🏥 Rewrite Changes
- Ditch ElectronJS (NodeJS) in favor of [Tauri](https://tauri.studio/) (Rust)
- Use [Deno](https://deno.land/) as a runtime for third-party extensions
- Move from [PuffinJS](https://github.com/PuffinJS/puffin) to [React](https://reactjs.org/) for the Web frontend
- Core is declouped from the frontend itself, third-party editors can be built upon it

| Package             | Description | Version |
|---------------------|-------------|-------------|
| [gveditor-core](./core)       | Graviton core engine | [![](https://img.shields.io/crates/v/gveditor-core?style=plastic)](https://crates.io/crates/gveditor-core)     |   
| [gveditor-core-api](./core_api)   | Shared API for core and extensions | [![](https://img.shields.io/crates/v/gveditor-core?style=plastic)](https://crates.io/crates/gveditor-core-api)  |
| [gveditor-core-deno](./core_deno)   | Deno runtime for Graviton extensions | WIP  |
| [extensions/git](./extensions/git)      | Built-in Git Extension | WIP |
| [extensions/native-shell](./extensions/git)      | Native Shell Extension | WIP |
| [extensions/typescript-lsp](./extensions/typescript-lsp)      | Built-in TypeScript/JavaScript extension | WIP |
| [desktop](./desktop)             | Desktop web-based app | WIP |
| [server](./server)               | Self-hosted browser version  | WIP |
| [@gveditor/web](./web)                 | Web frontend  | [![](https://img.shields.io/badge/dynamic/json?color=red&label=%40gveditor%2Fweb&query=version&url=https%3A%2F%2Fraw.githubusercontent.com%2FGraviton-Code-Editor%2FGraviton-App%2Fmain%2Fweb%2Fpackage.json)](https://github.com/Graviton-Code-Editor/Graviton-App/tree/main/core) |
| [@gveditor/languages](./languages)             | Language translations  | [![](https://img.shields.io/badge/dynamic/json?color=red&label=%40gveditor%2Flanguages&query=version&url=https%3A%2F%2Fraw.githubusercontent.com%2FGraviton-Code-Editor%2FGraviton-App%2Fmain%2Flanguages%2Fpackage.json)](https://github.com/Graviton-Code-Editor/Graviton-App/tree/main/core) |

## 📑 Goals
- No freezes or lags
- Fast startup time
- Low memory usage
- Scalable through a consistent and dev-friendly plugins API
- Flexible workspace configurations
- Respect privacy
- Easy to use and pleasant UI
- Stable Intellisense (LSP)

## 📣 Community

- 💬 [Discord Server](https://discord.gg/cChzuMp)
- 📢 [Telegram Channel](https://t.me/gravitoneditor)
- 💭 [Twitter](https://twitter.com/gravitoneditor)

## 🎁 Donating

Feel free to donate in any way you want, if you want to support this project :)

- BTC address: `1HCBeYD564Y3AjQ3Ci6Fp2zosfZvevJuu6`
- Solana address: `5GzDDXyzhB9zA8vSHuEow5mQJ6Tk3kC4Bn2T9dp6nX3U`
- Paypal: https://www.paypal.me/mkenzo8

### Donators

- [Malok](https://github.com/malokdev)
- [Saúl Blanco](https://github.com/Saul-BT)
- Rôdeuse
- Alex Mayol
- [Machou](http://github.com/Machou)
- Cristina Piva

MIT License