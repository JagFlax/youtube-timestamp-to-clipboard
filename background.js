// Extension event listeners are a little different from the patterns you may have seen in DOM or
// Node.js APIs. The below event listener registration can be broken in to 4 distinct parts:
//
// * chrome      - the global namespace for Chrome's extension APIs
// * runtime     – the namespace of the specific API we want to use
// * onInstalled - the event we want to subscribe to
// * addListener - what we want to do with this event
//
// See https://developer.chrome.com/docs/extensions/reference/events/ for additional details.

// Copies the .ytp-time-current element text to user's clipboard
const copyTimestamp = (() => {
  
  // Get the timestamp element
  const copyText = document.querySelector(".ytp-time-current").textContent;
 
  // Create a textarea in the DOM and set its contents to the timestamp
  const textElement = document.createElement('textarea');
  textElement.value = copyText;
  document.body.appendChild(textElement);

  // Copy the textarea element to clipboard
  textElement.select();
  document.execCommand('copy');
  document.body.removeChild(textElement);

  //console.log(`Copied ${copyText} to clipboard!`);
});

// This callback WILL NOT be called for "_execute_action"
chrome.commands.onCommand.addListener((command, tab) => {
  //console.log(`Command "${command}" called`);

  chrome.scripting.executeScript({
    target: {tabId: tab.id},
    function: copyTimestamp
  });
});