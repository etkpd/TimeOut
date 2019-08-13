// Copyright (c) 2011 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

// Show a list of all tabs in the same process as this one.

let website = '';

function init() {
  let banButton = document.getElementById("ban-button");
  banButton.addEventListener('click', handleBanButtonClick);
  chrome.windows.getCurrent({populate: true}, function(currentWindow) {
    chrome.tabs.query({currentWindow: true, active: true}, function(tabs) {
      var current = currentWindow.tabs.filter(function(tab) {
        return tab.active;
      })[0];
      website = 'https' + extractDomain(current.url);
      var outputDiv = document.getElementById("tab-list");
      displayWebInfo(website, current, outputDiv);
    });
  });
}

// Print a link to a given tab
function displayWebInfo(website, tab, outputDiv) {
  if (tab.favIconUrl != undefined) {
    outputDiv.innerHTML += "<img src='chrome://favicon/" + tab.url + "'>\n";
  }
  outputDiv.innerHTML += website;
}


function handleBanButtonClick () {
  if(localStorage["bannedSites"] === undefined){
    localStorage.setItem("bannedSites", JSON.stringify([])); 
  } 
  let listOfBannedSites = JSON.parse(localStorage.getItem("bannedSites"));
  listOfBannedSites.push(website + '*')  
  localStorage.setItem("bannedSites", JSON.stringify(listOfBannedSites));
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    chrome.tabs.update(tabs[0].id, {url: tabs[0].url});
  });

  let message = {
    arrayOfBannedSites: listOfBannedSites
  };
  chrome.runtime.sendMessage(message)
}


function extractDomain(url) {
  var re = /:\/\/(www\.)?(.+?)\//;
  return url.match(re)[0];
} 

// Kick things off.
document.addEventListener('DOMContentLoaded', init);