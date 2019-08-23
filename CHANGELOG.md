# Graviton Changelog

This file contains "important" commits, small ones will probably not be added.

### 200823 - 1 [1.0.3]
- Added bouncing effect to the market
- Created an Issues template
- Converted Setup pages into templates
- Added a button in Settings > Advanced > Developer Tools to open a directory folder
- Fixed, market_plugin template's select button wasn't applyng the theme

### 200822 - 1 [1.0.3]
- Some parts of the UI are becoming modificable templates
- Renamed CSS class g_editors to editor_screen
- Wasn't saving the language properly

### 200821 - 1 [1.0.3]
- You can now drag and drop a file in to an empty screen
- Fixed Market, it was showing the select button even for no-theme plugins

### 200820 - 1 [1.0.3]
- Better source code management
- Applying accent color was throwing not supported error

### 200819 - 1 [1.0.3]
- Better language management

### 200818 - 2 [1.0.3]
- Updated plugin notification wasn't throwing
- Improvements

### 200818 - 1 [1.0.3]
- Fixed char counter
- Improved design of the screens
- Added a remove screen button when it's empty

### 200817 - 1 [1.0.3]
- Now using Semver to parse plugin versions
- Better dark highlighting
- Prevent from overloading a theme

### 200816 - 1 [1.0.3]
- Added Esperanto (not finished)
- Removed mousetrap from source, now it's a dependency
- If there are not themes intalled it will show a message it is supposed to appear the themes list
- Mistakes on plugin's package.json won't cause boot blocks, but it will throw a warn message

### 200814 - 3 [1.0.3]
- Fixed from previous commits, codemirror dialogs were the default.
- Added a new menu, Edit, and re structured the menus.

### 200814 - 2 [1.0.3]
- Fixed, cannot read the reame of plugins in the market

### 200814 - 1 [1.0.3]
- Created a basic test
- Removed Codemirror from source and turned in to a dependency
- Created a basic test script
- Bug fixes on market

### 200813 - 2 [1.0.3]
- Fixed, selecting text from another editor while having another one focused won't bug the line and char counter
- Removed the minimap option due it was too unestable

### 200813 - 1 [1.0.3]
- FluentMod caused to appear two Dark themes 
- Added 2 tabs in the plugin opened page, Readme and permissions
- When closing files the line and char counter wasn't been hiding
- When changing themes it also loads it's custom icons

### 200812 - 1 [1.0.3]
- Now themes can use custom icons
- New file & folder input now are focused by default
- Added a "Load more" plugins button in the market

### 200810 - 1 [1.0.3]
- Now, you can use Ctrl+Wheel or Ctrl+Up/Down to change the editor font size
- Increased the space between lines in the editor
- Added a line and char indicator in the status bar of the editors
- Now using getTranslation() method around all the app, which prevents from getting undefined in the texts
- A notification will be thrown when trying to update a plugin which is not listed in the official market

### 200809 - 1 [1.0.3]
- Better way of requiring plugin's package.json
- Fixed, when closing tabs from different screen it's language reference in status bar wasn't been updated

### 200808 - 1 [1.0.3]
- Added a settings icon
- Added a button to clear recents projects in the welcome screen

### 200808 - 1 [1.0.3]
- Dialogs content now have a maxium height

### 200807 - 1 [1.0.3]
- Added some emojies to the UI
- Refreshed the customization section in settings
- Fixed, the context menus button onclicks weren't binding
- Now, all JavaScript files are using the strict mode

### 200806 - 1 [1.0.3]
- Modified the notification constructor, check the docs
- Added a MiniMap (optional)

### 200805 - 1 [1.0.3]
- Updated Electron to  v5.0.0
- A plugin with errors on it's javascript will throw a warn in Graviton console and will not block it's start-up.

### 200804 - 1 [1.0.3]
- Resizing free C(custom) / image editors was throwing error

### 200803 - 1 [1.0.3]
- Now you can pass a directory to open as argument when starting graviton from the terminal
- Fixed, production build couldn't boot
- You can now put spacers on the context menus
- Added a method which makes easier to update the current focused editor status bar language

### 200802 - 1 [1.0.3]
- Added an optional parameter to the notification constructor which allows you to set a default delay, you can also close it

### 200801 - 1 [1.0.3]
- Added the font tipography to the context menu
- Implemented a cache system for the market

### 200731 - 2 [1.0.3]
- Added the bounce effect to the autocompletion context
- Fixed, you weren't able to show the terminal once was hidden from the top menu "Editor"
- Fixed, the plugins databases folder wasn't creating

### 200731 - 1 [1.0.3]
- Added a "Open in explorer" option in the context menu for directories on the explorer menu

### 200730 - 3 [1.0.3]
- Deprecated the property "folder"

### 200730 - 2 [1.0.3]
- Graviton will throw a warn message in the console while getting error while parsing the plugins's package.json
- Added an empty message in case there aren't any plugin installed in the market section

### 200730 - 1 [1.0.3]
- Added an optional parameter to the notification builder, a buttons object.

### 200729 - 3 [1.0.3]
- Added a background to the editor numbers
- Added a missing class
- Fixed, vertical scroll bounce animation was throwed always while scrolling horizontally

### 200729 - 2 [1.0.3]
- Removed unnecessary code
- Addded a new section in the setup process
- Added Turkish language

### 200729 - 1 [1.0.3]
- Fixed, after creating a new tab you were unable to focus another editor by just clicking on it.
- You don't have to close settings to save current changed preference
- Added a toggle for the bounce effect

### 200728 - 1 [1.0.3]
- Testing a bouncing effect in some lists
- Better maximize button (Windows)

### 200727 - 2 [1.0.3]
- You can now reorganize tabs of the same screen by drag & drop!
- Better Dialog building

### 200727 - 1 [1.0.3]
- graviton.getPlugin('name') now also returns it's database object in case it exists

### 200726 - 1 [1.0.3]
- You can now link codemirror themes and use it in your theme
- You can now create & and remove folders and also create files!
- Added Hungarian support
- Added a report button in the market

### 200725 - 3 [1.0.3]
- Rolling back to the old updating system

### 200725 - 2 [1.0.3]
- Added Rust support
- Fixed, custom themes were removing the selected blur ammount

### 200725 - 1 [1.0.3]
- Custom themes! You can now make use of CSS code
- Fixed, now you can see not-download plugin's readmes

### 200723 - 1 [1.0.3]
- Fixed Markdown highlighter

### 200723 - 1 [1.0.3]
- New theme selector in the setup proecss
- Added a blur slider
- You can now open a terminal in a custom path even if there is no folder opened
- You can now hide the terminal (Ctrl+H) or from the menu "Editor"
- Dividede the CSS source
- Added the function "installFromLocal()" to install plugins from local source

### 200721 - 1 [1.0.3]
- You can now pass a path when opening a terminal
- Rewrote the autocompletator almost in Js (less bugs, faster)
- Fixed, now Ruby files with .rb format are also highlighted
- Fixed, sometimes Graviton wasn't selecting the saved theme at booting
- Removed the year from the license

### 200720 - 1 [1.0.3]
- Fixed some bugs when starting Graviton
- New CSS icon

### 200719 - 1 [1.0.3]
- Fixed, Installing the default themes before the setup couldn't finish sometimes
- Improved Market (better plugin loading)
- Fixed Hoek and Cryptiles securities alerts

### 200718 - 1 [1.0.3]
- Market throws a notification if you have any plugin which has a new update
- You can now update your plugins by clicking on the Update button
- Market now shows you what plugins need to be updated
- Fixed some dialogs were unable to open
- Added 3 more CSS variables

### 200717 - 1 [1.0.3]
- Now you can right click to reload a folder in the explorer (also works for the global directory)
- Fixed global directory title
- Fixed, now you can apply a different theme while having a terminal opened

### 200716 - 1 [1.0.3]
- Themes section on Market now loads faster
- Installed plugins now also show it's stars count
- Better source organization
- Installed plugins showed undefined on stars count

### 200715 - 1 [1.0.3]
- Better factory reset
- Better plugin uninstalling
- Other improvements

### 200714 - 1 [1.0.3]
- Added an stars counter, which refers to the plugin's repository stars
- Added market error strings to English
- Fixed themes section error wasn't displaying
- Fixed context menu while hovering lights color buttons

### 200713 - 2 [1.0.3]
- Fixed, now you can open new terminals

### 200713 - 1 [1.0.3]
- Added a market shortcut in settings (under themes)

### 200712 - 2 [1.0.3]
- Fixed, cannot load files cause of codemirror cannot load the highlighting theme
- Fixed changelog.md dates
- Fixed the loading animation background

### 200712 - 1 [1.0.3]
- Installing a plugin will automatically load it's css files
- Uninstalling a plugin will automatically remove it's css links from the editor
- Better loading animation on Market
- Bug fixes
- Added installed and uninstalled extensions events

### 200711 - 2 [1.0.3]
- Added an spinner animation
- Added Dark theme to the market

### 200711 - 1 [1.0.3]
- Added themes to the market
- (Breaking update)
- Unified themes are plugins, now are the same

### 200710 - 1 [1.0.3]
- Now the plugins list is allocated in a repository (https://github.com/Graviton-Code-Editor/plugins_list)

### 200709 - 1 [1.0.3]
- Improved the Market

### 200708 - 2 [1.0.3]
- Added an installed plugins section
- Other improvements

### 200708 - 1 [1.0.3]
- Improved the market

### 200707 - 2 [1.0.3]
- Using nodegit instead of git directly, so the host doesn't have to install git to install extensions
- Small improvements

### 200707 - 1 [1.0.3]
- A extensions market! (currently testing)

### 200706 - 1 [1.0.3]
 - Changed Ctrl+P to Ctrl+Q (toggling menus visibility)

### 200705 - 1 [1.0.3]
- Added a button to hide the top menus in "Window" , you can also press Ctrl+P to toggle it
- Now the working directory is showed on top

### 200704 - 2 [1.0.3]
- Better terminals resizing

### 200704 - 1 [1.0.3]
- Terminals now resize if you resize the window(Still working on)

### 200702 - 1 [1.0.3]
- v1.0.3
- Fixed, you cannot close an opened terminal
- Added a new donation in the readme(2€ by Cristian Piva)


### 200701 - 2 [1.0.2]
- Reduced some elements in teh settings page
- Improved the logo showed in the boot animation

### 200701 - 1 [1.0.2]
- Aligned the closed folder icon

### 200630 - 1 [1.0.2]
- Better javascript plugins file import
- New events, new_terminal & closed_terminal

### 200629 - 1 [1.0.2]
- Fixed, now when you try to open a terminal without any directory opened it will throw a well-explained notification error.

### 200628 - 1 [1.0.2]
- Added shortcuts for Full Screen (F11)

### 200627 - 2 [1.0.2]
- Improved dialogs design

### 200627 - 1 [1.0.2]
- Fixed dark theme dropmenus
- Other improvements

### 200626 - 1 [1.0.2]
- Added search, replace and jump to line in the dropmenu "Tools"
- Cleaned some code
- Now you can increase, decrease and set by default the zoom from the new dropmenu "Window"

### 200625 - 2 [1.0.2]
- Fixed, custom tabs weren't creating properly
- Added some translation to catalan and spanish

### 200625 - 1 [1.0.2]
- Fixed, closing terminals in some cases threw error
- Fixed, loading a tab after creating and closing screens might be bugged.
- Fixed, applying theme just affected to the focused terminal.
- Improved Dark theme (remove .graviton/themes to apply changes)
- Fixed, now JSON syntax is well highlighted
- Added a TypeScript icon

### 200624 - 2 [1.0.2]
- Fixed, error throwed when updating the font size with an image opened as tab

### 200624 - 1 [1.0.2]
- Added an exit icon

### 200623 - 2 [1.0.2]
- Finally got Travis CI working

### 200623 - 1 [1.0.2]
- Added more events

### 200622 - 2 [1.0.2]
- Added a circle in every theme which shows it's accent color (Settings page)
- Added some events

### 200622 - 1 [1.0.2]
- New logo and website (graviton.ml)

### 200621 - 2 [1.0.2]
- Fixed, were throwing a Highlighting error when you install Graviton for the first time

### 200621 - 1 [1.0.2]
- Testing standardJS
- Converted updater.js in to a module
- Fixed building instructions

### 200620 - 2 [1.0.2]
- Fixed terminal starting directory

### 200620 - 1 [1.0.2]
- New icons for opening and closing a terminal
- Fixed some dropmenus were showinh "undefined" as it's hint

### 200619 - 2 [1.0.2]
- Improved terminal looking
- Fixed the welcome message wasn't centralized when a terminal was opened

### 200619 - 1 [1.0.2]
- Integrated Xterm.js, up to 1 for every editor opened. Open it from the menu "Editor" > "New terminal" (Still on testing, it's a little buggy).

### 200618 - 2 [1.0.2]
- Added small animation to the Codemirror dialogs
- Added a propertie to the Dropmenus object constructor, hint, so it will show the text you pass when you hover the button (Will be in docs).

### 200618 - 1 [1.0.2]
- Improved Codemirror dialogs design

### 200617 - 3 [1.0.2]
- Unified code

### 200617 - 2 [1.0.2]
- New key shortcut, CTRL+E toggles the ZenMode

### 200617 - 1 [1.0.2]
- Fixed, the context menu which appears by right clicking a file now works perfect.
- Unified methods

### 200616 - 1 [1.0.2]
- Indexed code
- Remove fs as dependecie

### 200616 - 1 [1.0.2]
- Enabled node integration by default

### 200615 - 2 [1.0.2]
- Added an exit file in the File dropmenu
- Improved the dropmenus API
- Improved the Readme

### 200615 - 1 [1.0.2]
- Updated API
- Updated how the changelog works

### 200614 - 1 [1.0.2]
- New method to create whatever you want under the status bar.(Will be in docs)

### 200613 - 2 [1.0.2]
- Now you can remove files by right clicking them and clicking on remove

### 200613 - 1 [1.0.2]
- Fixed, cannot close a file if it has been opened by the "Open File" button on the dropmenu "File".

### 200613 - 1 [1.0.2]
- Fiendlier OS name

### 200612 - 3 [1.0.1]
- Fixed, having 0 plugins installeds threw an error

### 200612 - 2 [1.0.1]
- Added a shadow in tabs
- Updated codemirror

### 200612 - 1 [1.0.1]
- Fixed, some icons weren't broken

### 200611 - 1 [1.0.1]
- Fixed, closing an  opened but not activated from another screen wasn't working properly.

### 200610 - 2 [1.0.1]
- Now, you can open the dropmenus of top bar by clicking one and hovering on the others (bit unstable)
- Now, you can unmaximize too (Windows)
- Now, unrecognized file formats will be showed as well on the status bar

### 200610 - 1 [1.0.1]
- Added key shortcuts : CTRL+N (Add screen) & CTRL+L (remove the current screen)
- Added an info icon on the help dropmenu in "About"
- Removing screens is now more accurate

### 200609 - 2 [1.0.1]
- New removing screens dialog design

### 200609 - 1 [1.0.1]
- Fixed, the current screen wasn't changed when it was deleted
- Added icons to the dropmenus
- Added Default view button
- If something is not translated to your language it will be showed in English.
- Fixed, now you can press "Ctrl+S" to save the current editing file
- Will throw a notification in case you are trying to load a directory which doesn't exist.
- Desactivated autocompletion by default cause it's so unstable
- Fixed MacOS icon
- Now Graviton will probably not throw any error after updating to a new version

### 200608 - 2 [1.0.1]
- Fixed, starting background color wasn't the right one.

### 200608 - 1 [1.0.0]
- Preparing for Beta launch! (v1.0.0)

### 200607 - 1 [0.7.7]
- If you open a file which already has an opened tha it will laod it's tab

### 200606 - 1 [0.7.7]
- Added transparency to all scrollbars (new css variable)
- Improved the screens design with more shadows and a rounded corner
- Fixed zen mode
- Now the status bar shows the language name and not the format.

### 200605 - 1 [0.7.7]
- Made a CarbonaraLive transcompiler plugin (testing)
- Improved API, now plugins can create Tabs with custom content, there is also a method which you can use to change the tab's content on live.
- Improved the code readibility
- Fixed, removing screens weren't working properly

### 200604 - 1 [0.7.7]
- Fixed, now themes cannot override the scalation css variable when the animations are off
- Improved stability
- Fixed, resizing fonts wasn't working properly
-	Fixed the dark highlighting theme selecting color transparency was so bad
- Fixed, it wasn't saving properly the files

### 200603 - 1 [0.7.7]
- Fixed, single status bar for every editor opened
- Fixed, now when you edit a file the right tab is changed
- Fixed the autocompletion windows wasn't showring properly

### 200602 - 2 [0.7.7]
- Testing with multiple tabs openeds at the same time

### 200602 - 1 [0.7.7]
- Redesigned plugins page
- Fixed, toolbar button weren't focusing
- Better directories explorer resizer

### 200601 - 1 [0.7.7]
- Now you can expand the files explorer from left to right by clicking on top right of it and moving the cursor
- **FINALLY** removed that white square on corners of scrollbars
- Correct the editors heights
- If you reduces the window's size it will still show the dropmenus
- Added an image icon for some image formats
- Minifided code for the directories and filed indexer
- Added a CSS variable for scalation effect
- Fixed minimize, close and maximize buttons margin
- Fixed, now you can open files as new tabs (previously weren't working)

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

This changelog didn't start when the project did ,so don't expect all commits to be here.
