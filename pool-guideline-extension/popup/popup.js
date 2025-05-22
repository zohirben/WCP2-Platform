// Pool Game Assistant Popup Script

document.addEventListener('DOMContentLoaded', function() {
  const enabledToggle = document.getElementById('enabled');
  const statusText = document.getElementById('status-text');
  const guidelineColor = document.getElementById('guidelineColor');
  const guidelineOpacity = document.getElementById('guidelineOpacity');
  const opacityValue = document.getElementById('opacityValue');
  const guidelineWidth = document.getElementById('guidelineWidth');
  const widthValue = document.getElementById('widthValue');
  const activationKey = document.getElementById('activationKey');
  const activeSites = document.getElementById('activeSites');
  const saveButton = document.getElementById('saveSettings');
  const detectionStatus = document.getElementById('detectionStatus');
  
  // Load current settings
  chrome.storage.sync.get(null, function(settings) {
    if (settings) {
      enabledToggle.checked = settings.enabled;
      statusText.textContent = settings.enabled ? "Enabled" : "Disabled";
      
      if (settings.guidelineColor) 
        guidelineColor.value = settings.guidelineColor;
      
      if (settings.guidelineOpacity) {
        guidelineOpacity.value = settings.guidelineOpacity;
        opacityValue.textContent = settings.guidelineOpacity;
      }
      
      if (settings.guidelineWidth) {
        guidelineWidth.value = settings.guidelineWidth;
        widthValue.textContent = settings.guidelineWidth;
      }
      
      if (settings.activationKey)
        activationKey.value = settings.activationKey;
      
      if (settings.activeSites && Array.isArray(settings.activeSites))
        activeSites.value = settings.activeSites.join('\n');
    }
  });
  
  // Check if the extension has detected a pool game
  chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
    chrome.tabs.sendMessage(tabs[0].id, { action: 'getDetectionStatus' }, function(response) {
      if (response && response.poolGameDetected) {
        detectionStatus.textContent = 'Pool game detected!';
        detectionStatus.style.color = '#4CAF50';
      } else {
        detectionStatus.textContent = 'No pool game detected on current page.';
        detectionStatus.style.color = '#F44336';
      }
    });
  });
  
  // Update opacity value display when slider changes
  guidelineOpacity.addEventListener('input', function() {
    opacityValue.textContent = this.value;
  });
  
  // Update width value display when slider changes
  guidelineWidth.addEventListener('input', function() {
    widthValue.textContent = this.value;
  });
  
  // Toggle enabled status
  enabledToggle.addEventListener('change', function() {
    statusText.textContent = this.checked ? "Enabled" : "Disabled";
    
    chrome.storage.sync.set({ enabled: this.checked });
    
    // Notify active tabs of the change
    chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
      chrome.tabs.sendMessage(tabs[0].id, { 
        action: 'updateSettings',
        settings: { enabled: enabledToggle.checked }
      });
    });
  });
  
  // Save settings button
  saveButton.addEventListener('click', function() {
    // Parse the active sites text area into an array
    const sitesArray = activeSites.value
      .split('\n')
      .map(site => site.trim())
      .filter(site => site.length > 0);
    
    // Save all settings
    const settings = {
      enabled: enabledToggle.checked,
      guidelineColor: guidelineColor.value,
      guidelineOpacity: parseFloat(guidelineOpacity.value),
      guidelineWidth: parseInt(guidelineWidth.value),
      activationKey: activationKey.value,
      activeSites: sitesArray
    };
    
    chrome.storage.sync.set(settings, function() {
      // Provide visual feedback that settings were saved
      saveButton.textContent = 'Saved!';
      setTimeout(function() {
        saveButton.textContent = 'Save Settings';
      }, 1000);
      
      // Notify active tabs of the changes
      chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, { 
          action: 'updateSettings',
          settings: settings
        });
      });
    });
  });
});
