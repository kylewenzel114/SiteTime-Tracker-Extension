let activeTabId = null;
let activeStartTime = null;
let timeData = {};

chrome.tabs.onActivated.addListener(activeInfo => {
    updateTime();
    activeTabId = activeInfo.tabId;
    activeStartTime = Date.now();
});

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (tabId === activeTabId && changeInfo.url) {
        updateTime();
        activeStartTime = Date.now();
    }
});

chrome.tabs.onRemoved.addListener(tabId => {
    if (tabId === activeTabId) {
        updateTime();
        activeTabId = null;
        activeStartTime = null;
    }
});

function updateTime() {
    if (activeTabId !== null && activeStartTime !== null) {
        const timeSpent = Date.now() - activeStartTime;
        chrome.tabs.get(activeTabId, tab => {
            if (tab && tab.url && !tab.url.startsWith("chrome://newtab")) {
                const domain = new URL(tab.url).hostname;
                timeData[domain] = (timeData[domain] || 0) + timeSpent;
                chrome.storage.local.set({ timeData });
            }
        });
    }
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "getTimeData") {
        chrome.storage.local.get("timeData", data => {
            sendResponse(data.timeData || {});
        });
        return true;
    } else if (request.action === "clearTimeData") {
        chrome.storage.local.clear(() => {
            timeData = {};
            sendResponse({ success: true });
        });
        return true;
    }
});