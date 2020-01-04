function highlightScreen(id){
  if(document.getElementById(id)==null) return;
  editor_screens.forEach(function(screen){
    if(screen.id != id){
      document.getElementById(screen.id).classList.remove("active");
    }
  })
  document.getElementById(id).classList.add("active");
  current_screen.id = id
}

module.exports = {
  add: function (id=`screen_${graviton.getRandom()}`) {
    const current_id = id;
    current_screen = {
      id: current_id
    }
    const screen = {
      id: current_screen.id
    }
    editor_screens.push(screen)
    const new_screen_editor = document.createElement('div')
    new_screen_editor.ondragover = (event) => {
      if (event.target.children[1] !== undefined || !event.target.classList.contains('g_editors_editors')) return
      editor_screens.forEach(current => {
        if (current.id === screen.id) {
          current_screen = screen
          document.getElementById(screen.id).classList.add('dragging')
        }
      })
    }
    new_screen_editor.ondragleave = (event) => {
      document.getElementById(screen.id).classList.remove('dragging')
    }
    new_screen_editor.ondragenter = (event) => {
      document.getElementById(screen.id).classList.remove('dragging')
    }
    new_screen_editor.ondrop = event => {
      document.getElementById(screen.id).classList.remove('dragging')
      if (!event.target.classList.contains('g_editors_editors')) return
      event.preventDefault()
      const files = event.dataTransfer.files
      for (let file of files) {
        current_screen.id = screen.id
        editor_screens.forEach(current => {
          if (current.id === screen.id) {
            current_screen = screen
          }
        })
        new Tab({
          id: Math.random() + file.path.replace(/\\/g, '') + 'B',
          path: file.path,
          name: file.path,
          type: 'file'
        })
      }
      return false
    }
    new_screen_editor.classList = 'editor_screen'
    new_screen_editor.id = current_id
    new_screen_editor.innerHTML = `
      <div class="g_tabs_bar flex smallScrollBar"></div>  
      <div class="g_editors_editors" >
       <div class=temp_dir_message> 
        <div>
          <p style="display:inline-block;"dragable=false class="translate_word " idT="FullWelcomeMessage" >${getTranslation(
            'FullWelcomeMessage'
          )}</p>
          <img style="display:inline-block;" draggable="false" class="emoji-normal" src="src/openemoji/1F60E.svg"> 
        </div>
        ${(function () {
      if (editor_screens.length > 1) {
        return `<span aa=${current_id} class=link onclick="screens.remove('${current_id}')">Remove screen</span> `
      } else {
        return ''
      }
    })()}
        </div>
       </div>
      <div class="g_status_bar" ></div>`
    document.getElementById('screens').appendChild(new_screen_editor)
    for (i = 0; i < editor_screens.length && editor_screens.length !== 1; i++) {
      if (
        document.getElementById(editor_screens[i].id).children[1].children[0]
          .children[1] === undefined
      ) {
        document.getElementById(
          editor_screens[i].id
        ).children[1].children[0].innerHTML += `<span aa=${
          editor_screens[i].id
        } class=link onclick="screens.remove('${
          editor_screens[i].id
        }')">Remove screen</span>`
      }
    }
    new_screen_editor.onclick = function(){
      highlightScreen(current_id)
    }
    highlightScreen(current_id)
    document.dispatchEvent(graviton.events.splitScreen())
    graviton.resizeTerminals()
  },
  remove: function (id) {
    if (editor_screens.length != 1) {
      for (i = 0; i < editor_screens.length; i++) {
        if (editor_screens[i].id === id) {
          let screen_tabs = tabs.filter(tab => {
            return tab.getAttribute('screen') === id
          })
          if (screen_tabs.length === 0) {
            document.dispatchEvent(graviton.events.closedScreen( editor_screens[i]))
            document.getElementById(id).remove()
            editor_screens.splice(i, 1)
            editors.map((ed,index)=>{
              if(ed.screen == id) editors.splice(index,1)
            })  
            current_screen = {
              id: editor_screens[editor_screens.length - 1].id
            }
            if (editor_screens.length === 1) {
              if (
                document.getElementById(editor_screens[0].id).children[1]
                  .children[0].children[1] !== undefined
              ) {
                document
                  .getElementById(editor_screens[0].id)
                  .children[1].children[0].children[1].remove()
              }
              if (tabs.length == 0) {
                editingTab = null
              }
            }
            highlightScreen(current_screen.id)
            return true
          } else {
            graviton.throwError(
              getTranslation('Notification.CloseAllTabsBefore')
            )
            return false
          }
        }
      }
      graviton.resizeTerminals()
    } else {
      graviton.throwError(
        getTranslation('Notification.CannotRemoveMoreScreens')
      )
      return false
    }
  },
  default: function () {
    for (i = 0; i < editor_screens.length; i++) {
      if (i > 0) {
        const number = i
        let screen_tabs = tabs.filter(tab => {
          return tab.getAttribute('screen') === id
        })
        if (screen_tabs.length === 0) {
          document.getElementById(editor_screens[number].id).remove()
          editor_screens.splice(number, 1)
          editors.splice(number, 1)
          current_screen = {
            id: editor_screens[editor_screens.length - 1].id
          }
          i--
          if (editor_screens.length === 1) {
            if (
              document.getElementById(editor_screens[0].id).children[1]
                .children[0].children[1] !== undefined
            ) {
              document
                .getElementById(editor_screens[0].id)
                .children[1].children[0].children[1].remove()
            }
          }
          highlightScreen(current_screen.id)
        } else {
          graviton.throwError(
            getTranslation('Notification.CloseAllTabsBefore')
          )
        }
      }
    }
  }
}
