chrome.commands.onCommand.addListener(function (command) {

  const MARKDOWN_LINK_TEMPLATE = "[$name]($href)"

  var clipboardContent = getClipboardContents()
    , markdownLink

  getSelection(function (selection) {

    markdownLink = MARKDOWN_LINK_TEMPLATE
      .replace("$name", selection)
      .replace("$href", clipboardContent)

    chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
      chrome.tabs.sendMessage(tabs[0].id, {action: "paste", data: markdownLink})
    })
  })

})

function getSelection(callback) {

  chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
    chrome.tabs.sendMessage(tabs[0].id, {action: "getSelection"}, function (response) {
      callback(response.selection)
    })
  })
}

/**
 * Not mine: something similar to this: https://gist.github.com/bitoiu/9358481bc38db67b32ff
 **/
function getClipboardContents() {

  var pasteTarget
    , pasteTargetParent
    , clipboardContent

  pasteTarget = document.createElement("div")
  pasteTarget.contentEditable = true

  pasteTargetParent = document.activeElement.appendChild(pasteTarget).parentNode
  pasteTarget.focus()
  document.execCommand("Paste", null, null)
  clipboardContent = pasteTarget.innerText
  pasteTargetParent.removeChild(pasteTarget)

  return clipboardContent
}
