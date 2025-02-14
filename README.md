# SiteTime Tracker

## Overview

SiteTime Tracker is a lightweight Chrome extension that tracks the time you spend on different websites and displays it in a simple popup.

## Features

- Tracks time spent on each website.
- Displays time logs in an easy-to-read format.
- Provides a "Clear Data" button to reset time logs.
- Works seamlessly in the background without interfering with browsing.

## Installation

1. Clone or download this repository.
2. Open Chrome and navigate to `chrome://extensions/`.
3. Enable "Developer mode" (toggle in the top right corner).
4. Click "Load unpacked" and select the downloaded folder.
5. The extension will now be added to your browser.

## Usage

1. Click the extension icon to open the popup.
2. View the time spent on different websites.
3. Click the "Clear Data" button to reset the logs.

## File Structure

```
├── manifest.json   # Chrome extension manifest file
├── background.js   # Tracks active tabs and logs time spent on websites
├── popup.html      # Popup UI
├── popup.js        # Handles popup interactions
├── styles.css      # Popup styling
├── icon.png        # Extension icon
```

## Permissions

- `tabs`: Required to track active tab changes.
- `storage`: Used to store and retrieve time tracking data.

## License

This project is licensed under the MIT License.

