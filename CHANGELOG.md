# Graviton Changelog

This file contains "important" commits, small ones will probably not be added.

### 200530 - 1 [0.7.6]
- Fixed, linux-based distros throwed error when turning on "Use system's accent color"
- "New Project" window now uses the API, so the performance and stability is better

### 200529 - 2 [0.7.6]
- New light theme
- And other fixes

### 200529 - 1 [0.7.6]
- Fixed, content wasn't loading after clicking on an opened tab

### 200526 - 1 [0.7.6]
- Fixed editors height after loading a tab
- Redesigned the setup!
- More levels on the zoom app slider!
- Moved the highlighting switch under Editor settings
- Faster boot performance!
- Improved editor's infrastructure
- Added a "ignore" button in error boot menu

### 200525 - 1 [0.7.5]
- Added an option to use the system's accent color if is available
- Added a reboot button in boot error message
- Added a  CSS color shadows variable
- Added an option to enable line wrapping
- Redesigned the settings page!
- Load system's language if it's supported when setuping Graviton
- Updated the website link! www.graviton.ml
- Added scale effect on clicking directories and files in the explorer menu
- Faster startup!
- Testing a DrebleJS plugin
- Added a Window constructor to the API.

### 200517 - 1 [0.7.4]
- Some design changes

### 200430 - 1 [0.7.4]
- Updated build commands
- Added credits to the Readme.md
- Added a translation on Settings > Editor > Auto-Completion
- Updated version on package.json
- Fixed, weren't loading the image format properly on bottom bar
- Fixed, the bottom bar content weren't showing properly with Zen mode activated (hiding the explorer panel)
- Faster speed at switching between tabs
- Updated license
- Better image viewer

### 200429 - 1 [0.7.4]
- Added animation at :active buttons of context menu
- Fixed, unsaved icon on tabs are not showing properly
- Updated themes
- Improved Building instructions (BUILDING.md)

### 200426 - 1 [0.7.4]
- I'm crazy

### 200425 - 2 [0.7.4]
- Fixed, scrolling down with keys while on autocompletion cause to jump line

### 200425 - 1 [0.7.4]
- Fixed, notifcation X button wasn't showing properly
- Faster animation on hovering elements on the project-explorer
- Fixed, error at clicking a column on TimeFlow
- Fixed, the factory reset were throwing error
- Added a final page when setuping for the firs time, it says "Thanks for installing Graviton"
- Added changelog button on Settings
- Translated "Check for updates" button Settings 
- Fixed, directory-explorer on zen mode was showing a bottom scroll bar 
- Fixed, throwing error when disabling or enabling syntax highlighting when images are opened on tabs
- Added Coffescript, vue, rust, swift, perl, python, haskell, django syntax support

### 200423 - 1 [0.7.4]
- Now the X on tabs is only showed on selected and when hovering
- Fixed showing welcome page from the toolbar takes a long delay

### 200422 - 1 [0.7.4]
- Better code format

### 200421 - 1 [0.7.4]
- Unified welcome's page and setting's CSS
- Fixed, now you can save a file whereever you want (Save as)
- Preload images for a better UX
- Testing Git plugin which gives you the last commit of your **local** project
- Smalled code of control buttons

### 190419 - 1 [0.7.4]
- Translated welcome message to spanish and catalan
- Improved dialogs API

### 190418 - 3 [0.7.4]
- Fixed from (190418), linux and MacOS were showing the menu bar 
- More round buttons 
- Fixed, wrong path for the windows's icon on package.json
- Fixed from (190418), the backround element was in front of all
- Fixed from (190418), wrong configuration about Windows on package.json

### 190418 - 2 [0.7.4]
- Fixed throws error when changing font-size with any file opened
- Added changelog dialog inside the app
- Small improvements

### 190418 - 1 [0.7.4]
- Added MacOS support!!
- Translated to catalan
- Deprecated ukranian (probably temporally)
- Improved readme.md

### 190417 - 1 [0.7.4]
- Translated to spanish
- Added a building instructions on building.md

### 190416 - 2 [0.7.3]
- New image(example.jpg) for the readme

### 190416 - 1 [0.7.3]
- Now the top bar is higher
- Added scale animation on pressing dropmenu's and dialog's buttons
- Added an image viewer, when you open an image it will show it instead of showing the code
- Added a toggle for DevTools on Settings > Advanced > Developers
- Added the data tag number on the about dialog
- Added OS info on Settings > About > Current Version
- Added a button to cancel (continue editing file) on the dialog which appears when you try to close a file which is not saved.

### 190415 - 3 [0.7.3]
- Bootanimation background color is now darkgray
- If Graviton detects an error when booting it will show up a button which will clean config and logs(As a factory reset).
- Fixed Window's icon (icon.ico)

### 190415 - 2 [0.7.3]
- Added icon on linux

### 190415 - 1 [0.7.3]
- Native top bar for Linux. (Windows top bar is part of the electron window)
- Now, you can open dev tools even on production state
- Now, language's name will be stored as "g_l" instead of "Name" so, "Name" would be able to be translated literally.
- Added the logo icon to build

### 190414 - 1 [0.7.3]
- Fixed (already added) auto-completion switch on editor page on Settings.
- Fixed, now you can save a file when there is even only one tab opened.
- New logo!
- Small bug fixes

### 190413 - 1 [0.7.3]
- Unified all the configurations in one object
- Cleaned up code
- Added a new message on the editors part
- New Dark theme highlighting (forked from Michael Kaminsky)
- Enabled MarkDown for codemirror
- Small bug fixes
- Compressed codemirror

### 190412 - 1 [0.7.3]
- Fixed "close" (X) button is hidding when the zoom was the smallest one.
- Cleaned up code
- Improved the updates detect infrastructure
- Added links to the buttons on the About page on Settings
- Created changelog.md

This changelog didn't start when the project did so, don't expect all commits info to be here.