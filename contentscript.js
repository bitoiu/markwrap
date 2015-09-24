'use strict'

/**
 * Insert the text at the cursor into the active element. Note that we're
 * intentionally not appending or simply replacing the value of the editable
 * field, as we want to allow normal pasting conventions. If you paste at the
 * beginning, you shouldn't see all your text be replaced.
 * Taken from:
 * http://stackoverflow.com/questions/7404366/how-do-i-insert-some-text-where-the-cursor-is
 */
function insertTextAtCursor(text) {
  var el = document.activeElement
  var val = el.value
  var endIndex
  var range
  var doc = el.ownerDocument
  if (typeof el.selectionStart === 'number' &&
    typeof el.selectionEnd === 'number') {
    endIndex = el.selectionEnd
    el.value = val.slice(0, endIndex) + text + val.slice(endIndex)
    el.selectionStart = el.selectionEnd = endIndex + text.length
  } else if (doc.selection !== 'undefined' && doc.selection.createRange) {
    el.focus()
    range = doc.selection.createRange()
    range.collapse(false)
    range.text = text
    range.select()
  }
}

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {

  switch (request.action) {

    case "getSelection" :
    {
      sendResponse({selection: window.getSelection().toString()})
      break
    }

    case "paste" :
    {
      alert("this would be pasted in" + request.data)
      break
    }
  }

})


