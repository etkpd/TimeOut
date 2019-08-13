let bannedUrls = JSON.parse(localStorage.getItem("bannedSites")); 

if(bannedUrls!==null){
  chrome.webRequest.onBeforeRequest.addListener(
    banSites,
    {urls: bannedUrls
    },
    ["blocking"]
  );
}
chrome.runtime.onMessage.addListener(receiver);

function receiver(request, sender, sendResponse){
  chrome.webRequest.onBeforeRequest.removeListener(
    banSites
  );
  chrome.webRequest.onBeforeRequest.addListener(
    banSites,
    {urls: request.arrayOfBannedSites
    },
    ["blocking"]
  );
}


function banSites(details){
  return {cancel: true};
}