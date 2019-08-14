function save_options() {
  // Save blacklist domains
  var blackListEl = document.getElementById("blacklist");
  var blacklist_domains = blackListEl.value.split(/\r?\n/);
  var blacklist = [];
  // Get rid of empty lines
  for (var i = 0; i < blacklist_domains.length; i++) {
    var domain = blacklist_domains[i];
    if (domain) {
      blacklist.push(domain);
    }
  }
  blackListEl.value = blacklist.join('\n');
  localStorage.setItem("bannedSites", JSON.stringify(blacklist));
  let message = {
    arrayOfBannedSites: blacklist
  };
  chrome.runtime.sendMessage(message)

  // Update status to let user know options were saved.
  var status = document.getElementById("status");
  status.innerHTML = "Options Saved.";
  status.className = "success";
  setTimeout(function() {
    status.innerHTML = "";
    status.className = "";
  }, 750);
}


function restore_options() {
  var blacklist = JSON.parse(localStorage["bannedSites"]);
  var blackListEl = document.getElementById("blacklist");
  
  blackListEl.value = blacklist.join('\n');
}


document.addEventListener('DOMContentLoaded', function () {
  // Restore options
  restore_options();
  
  document.querySelector('#save-button').addEventListener('click', save_options);
});
