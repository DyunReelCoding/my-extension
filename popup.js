// popup.js
chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    const currentTab = tabs[0];
    chrome.runtime.sendMessage({ action: 'getUrlAnalysis', tab: currentTab }, function (response) {
      const urlAnalysis = document.getElementById('urlAnalysis');
      urlAnalysis.textContent = JSON.stringify(response, null, 2);
      
      const proceedButton = document.getElementById('proceedButton');
      const cancelButton = document.getElementById('cancelButton');
      
      proceedButton.addEventListener('click', function () {
        // Perform action to proceed to the site (e.g., open the current tab)
        chrome.tabs.update(currentTab.id, { active: true });
        window.close(); // Close the popup
      });
      
      cancelButton.addEventListener('click', function () {
        // Perform action to cancel (e.g., do nothing)
        window.close(); // Close the popup
      });
    });
  });
  