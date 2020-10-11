### 🔝 Important changes

- LSP integration (experimental)
- Built-in Terminal
- Improved Workspaces
- Iconpacks support
- New translated languages

### ✔ Changes

- Menu bar is now native in MacOS and GNU/Linux distributions
- General UI improvements
- Ability to remove projects from the log
- Tabs show file's icon
- Added support for new languages:
  - F#
  - Lua
  - Shell
  - Less
  - Golang
  - and many more
- Added an smooth cursor plugin built-in
- Improved NPM inspector
- New shortcuts:
  - Ctrl+Q: closes the app (Only in MacOS by default)
  - Ctrl+O: Open files easily
  - Ctrl+E: Focus the explorer panel
- Notifications sent by plugins will now indicate it's author
- Smoother animations when opening windows, dialogs, notifications, or items in the explorer panel
- Improved NPM Project Inspector

### 😁 Fixes

- Fixed command prompt's size when it's overflowing
- NPM Project service will now notify you if the opened folder doesn't have a valid name.

### 🤓 Core

- Using Emotion instead of PuffinStyle
- Slowly moving from JavaScript to TypeScript
- Using webpack instead of parcel
- Added Unit tests
- Updated to Electron v10
- Added a ExplorerProvider API, which could allow Graviton to access, read and modify other FileSystems rather than the local of the machine.
- Added a Terminal Clients API, to easily create new terminals
