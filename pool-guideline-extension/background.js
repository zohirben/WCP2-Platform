// Service worker for Pool Game Assistant

// Listen for installation event
chrome.runtime.onInstalled.addListener(() => {
  // Set default settings
  chrome.storage.sync.set({
    enabled: true,
    guidelineColor: '#00FF00',
    guidelineOpacity: 0.6,
    guidelineWidth: 2,
    activationKey: 'Shift',
    activeSites: ['discord.com', '*pool*', '*billiard*'],
    allowAnyWebsite: false,
    manualMode: false
  });
  
  console.log('Pool Game Assistant installed with default settings');
});

// Listen for messages from content scripts
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'getSettings') {
    chrome.storage.sync.get(null, (settings) => {
      sendResponse({ settings });
    });
    return true; // Required for async response
  } else if (request.action === 'toggleEnabled') {
    chrome.storage.sync.get('enabled', (data) => {
      chrome.storage.sync.set({ enabled: !data.enabled });
      sendResponse({ enabled: !data.enabled });
    });
    return true; // Required for async response
  } else if (request.action === 'updateSettings') {
    if (request.settings) {
      chrome.storage.sync.set(request.settings, () => {
        // If this was called from the popup, notify all tabs about the changes
        if (sender.tab === undefined) {
          chrome.tabs.query({}, (tabs) => {
            tabs.forEach(tab => {
              chrome.tabs.sendMessage(tab.id, { 
                action: 'updateSettings',
                settings: request.settings 
              }).catch(err => {
                // Ignore errors from tabs that don't have our content script
              });
            });
          });
        }
        sendResponse({ success: true });
      });
      return true; // Required for async response
    }
  }
});
