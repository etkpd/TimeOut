chrome.browserAction.setBadgeText({ 'text': '00:00'});
chrome.browserAction.setBadgeBackgroundColor({ 'color': "#777" });

let activeTabId = null;
let timeStart = null;

function HandleUpdate(tabId, changeInfo, tab){
  initialUpdate(new Date(), tabId)
}

function HandleUpdateActiveTab(activeInfo){
  initialUpdate(new Date(), activeInfo.tabId)
}

function WindowHasChanged(windowId){
  chrome.windows.getCurrent({populate: true}, function(currentWindow) {
    chrome.tabs.query({currentWindow: true, active: true}, function(tabs) {
      var current = currentWindow.tabs.filter(function(tab) {
        return tab.active;
      })[0];
      HandleUpdateWindowChange(current.id)
    });
  });
}

function HandleUpdateWindowChange(tabId){
  initialUpdate(new Date(), tabId)
}

function initialUpdate(t, tabId){
  activeTabId = tabId;
  timeStart = t;
}

 function update(){
   let now = new Date();
   let description = FormatDuration(now - timeStart)
   chrome.browserAction.setBadgeText({ 'tabId': activeTabId, 'text': description});
}

setInterval(update, 1000);

chrome.tabs.onUpdated.addListener(HandleUpdate);
chrome.tabs.onRemoved.addListener(HandleUpdate);
chrome.tabs.onReplaced.addListener(HandleUpdate);
chrome.tabs.onActivated.addListener(HandleUpdateActiveTab);
chrome.windows.onFocusChanged.addListener(WindowHasChanged)