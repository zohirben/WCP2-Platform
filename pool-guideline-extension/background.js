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
    activeSites: ['discord.com', '*pool*', '*billiard*']
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
  }
});
