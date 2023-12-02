// content.js
(function () {
  // Function to check if the URL uses HTTPS
  function isHttps(url) {
    return url.startsWith("https://");
  }

  // Function to check if the page is a local file
  function isLocalFile() {
    return window.location.protocol === "file:";
  }

  // Check if the current URL doesn't use HTTPS and is not a local file
  if (!isHttps(window.location.href) && !isLocalFile()) {
    // Create a container for the full-page overlay
    const overlay = document.createElement('div');
    overlay.style.position = 'fixed';
    overlay.style.top = '0';
    overlay.style.left = '0';
    overlay.style.width = '100%';
    overlay.style.height = '100%';
    overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.5)'; // Semi-transparent black background
    overlay.style.display = 'flex';
    overlay.style.justifyContent = 'center';
    overlay.style.alignItems = 'center';
    overlay.style.zIndex = '9999';

    // Create a container for the futuristic warning within the overlay
    const warningContainer = document.createElement('div');
    warningContainer.style.backgroundColor = '#333'; // Dark background color
    warningContainer.style.color = '#00ff00'; // Neon green text color
    warningContainer.style.padding = '20px';
    warningContainer.style.borderRadius = '5px';
    warningContainer.style.textAlign = 'center';
    warningContainer.style.fontFamily = 'Arial, sans-serif';
    warningContainer.style.fontSize = '18px';

    warningContainer.innerHTML = `
      <div>⚠️ Warning: This website does not use HTTPS ⚠️</div>
      <p>Your connection may not be secure.</p>
      <button id="proceedButton" class="alert-button">Proceed to the Site</button>
      <button id="cancelButton" class="alert-button">Cancel</button>
    `;

    // Append the warning container to the overlay
    overlay.appendChild(warningContainer);

    // Append the overlay to the page body
    document.body.appendChild(overlay);

    // Add event listeners to the buttons
    const proceedButton = document.getElementById('proceedButton');
    const cancelButton = document.getElementById('cancelButton');

    proceedButton.addEventListener('click', function () {
      // Remove the overlay and allow navigation to the site
      overlay.remove();
      window.allowedToNavigate = true;
      const clickEvent = new MouseEvent('click', {
        view: window,
        bubbles: true,
        cancelable: true
      });
      const targetElement = document.documentElement;
      targetElement.dispatchEvent(clickEvent);
    });

    cancelButton.addEventListener('click', function () {
      // Remove the overlay and close the current tab
      overlay.remove();
      chrome.runtime.sendMessage({ action: 'closeTab' });
    });

    // Intercept navigation attempts
    window.addEventListener('beforeunload', function (e) {
      if (!isHttps(window.location.href) && !window.allowedToNavigate) {
        // Display a confirmation prompt
        e.preventDefault();
        e.returnValue = 'Leaving this page will not be secure. Are you sure you want to continue?';
      }
    });
  }
})();
