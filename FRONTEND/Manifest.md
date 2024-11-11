Understanding manifest.json
1
2
3
manifest.json - Mozilla | MDN
https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/manifest.json
Manifest file format | Chrome for Developers
https://developer.chrome.com/docs/extensions/reference/manifest
Web app manifests | MDN
https://developer.mozilla.org/en-US/docs/Web/Manifest
The manifest.json file is a crucial component for web extensions and progressive web apps (PWAs). It provides essential metadata about the application, such as its name, version, and the resources it uses. This file is written in JSON format and can include comments using // style.

Key Elements in manifest.json

Basic Metadata

The manifest.json file includes basic metadata about the extension or web app. The mandatory keys are:

manifest_version: Specifies the version of the manifest file format.

name: The name of the extension or web app.

version: The version number of the extension or web app.

Optional Keys

There are several optional keys that can be included to define additional functionalities and settings:

description: A brief description of the extension or web app.

icons: Specifies the icons used for the extension or web app.

background: Defines background scripts or service workers.

content_scripts: Specifies scripts to be injected into web pages.

permissions: Lists the permissions required by the extension or web app.

browser_action: Defines the appearance and behavior of the extension's icon in the browser toolbar.

web_accessible_resources: Lists resources that can be accessed by web pages or other extensions.

Example

Here is an example of a manifest.json file for a web extension:

{
"manifest_version": 2,
"name": "Sample Extension",
"version": "1.0",
"description": "This is a sample extension.",
"icons": {
"48": "icon.png",
"96": "icon@2x.png"
},
"background": {
"scripts": ["background.js"]
},
"browser_action": {
"default_icon": {
"19": "icon-19.png",
"38": "icon-38.png"
},
"default_title": "Sample Extension",
"default_popup": "popup.html"
},
"permissions": ["storage", "activeTab"],
"content_scripts": [
{
"matches": ["*://*.example.com/*"],
"js": ["content.js"]
}
],
"web_accessible_resources": ["images/my-image.png"]
}
Accessing manifest.json at Runtime

You can access the manifest.json file from your extension's JavaScript using the runtime.getManifest() function. For example:

let manifest = browser.runtime.getManifest();
console.log(manifest.version);
Deployment

For web apps, the manifest.json file is linked in the HTML document using a <link> element:

<link rel="manifest" href="manifest.json">
Browser Compatibility

The manifest.json file is supported by most modern browsers, including Chrome, Firefox, Edge, and Opera. However, some keys may have different levels of support across browsers
1
2
.

By understanding and utilizing the manifest.json file, developers can create more robust and feature-rich web extensions and PWAs.