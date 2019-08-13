/* let array = ['aq', 'cd']

function init(){
  localStorage.setItem("bannedSites", JSON.stringify(array));
}
 */
function Update(t, tabId, url){
  //console.log(t, tabId, url)
}

function HandleUpdate(tabId, changeInfo, tab){
  Update(new Date(), tabId, changeInfo.url)
}



chrome.tabs.onUpdated.addListener(HandleUpdate);
chrome.tabs.onRemoved.addListener(HandleUpdate);
chrome.tabs.onReplaced.addListener(HandleUpdate);
//document.addEventListener('DOMContentLoaded', init);