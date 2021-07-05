"use strict";

const CONFIG_KEY = "filterList";
const VERSION_KEY = "version";
const VERSION = "2";

if (localStorage.getItem(CONFIG_KEY) == null || localStorage.getItem(VERSION_KEY) == null || localStorage.getItem(VERSION_KEY) != VERSION) {
    localStorage.setItem(CONFIG_KEY, JSON.stringify([{
        name: "Ausland",
        key: "ausland",
        keyStandard: "theme-international",
        keyORF: "ausland",
        filter: false
    }, {
        name: "Chronik",
        key: "chronik",
        keyORF: "chronik",
        filter: false
    }, {
        name: "Diskurs",
        key: "diskurs",
        keyStandard: "theme-diskurs",
        filter: false
    }, {
        name: "Inland",
        key: "inland",
        keyStandard: "theme-inland",
        keyORF: "inland",
        filter: false
    }, {
        name: "Kultur",
        key: "kultur",
        keyStandard: "theme-kultur",
        keyORF: "kultur",
        filter: false
    }, {
        name: "Leute",
        key: "leute",
        keyORF: "leute",
        filter: false
    }, {
        name: "Lifestyle",
        key: "lifestyle",
        keyStandard: "theme-lifestyle",
        filter: false
    }, {
        name: "Panorama",
        key: "panorama",
        keyStandard: "theme-panorama",
        filter: false
    }, {
        name: "Religion",
        key: "religion",
        keyORF: "religion",
        filter: false
    }, {
        name: "Sport",
        key: "sport",
        keyStandard: "theme-sport",
        keyORF: "sport",
        filter: false
    }, {
        name: "Web",
        key: "web",
        keyStandard: "theme-web",
        filter: false
    }, {
        name: "Wirtschaft",
        key: "wirtschaft",
        keyStandard: "theme-wirtschaft",
        keyORF: "wirtschaft",
        filter: false
    }]));
    localStorage.setItem(VERSION_KEY, VERSION);
    browser.tabs.query({currentWindow: true, active: true}).then(sendMessageToTabs).catch(onError);   
}

let configuration = JSON.parse(localStorage.getItem(CONFIG_KEY));
for (let topic of configuration) {
    let entry = document.createElement("div");
    entry.setAttribute("class", "topic");
    let input  = document.createElement("input");
    input.setAttribute("type", "checkbox");
    input.setAttribute("id", topic.key);
    input.setAttribute("name", topic.key);
    if (topic.filter == true) {
        input.setAttribute("checked", true);
    }
    input.addEventListener("input", (e) => {saveState(e)});
    entry.appendChild(input);
    let label = document.createElement("label");
    label.setAttribute("for", topic.key);
    label.textContent = topic.name;
    entry.appendChild(label);
    document.getElementById("topics").appendChild(entry);
}

function saveState(event) {
    configuration.filter(entry => entry.key == event.target.id).forEach(element => {
        element.filter = event.target.checked;
    });
    localStorage.setItem(CONFIG_KEY, JSON.stringify(configuration));
    
    browser.tabs.query({currentWindow: true, active: true}).then(sendMessageToTabs).catch(onError);   
}

function sendMessageToTabs(tabs) {
    for (let tab of tabs) {
        browser.tabs.sendMessage(tab.id, configuration)
    }
}
  
function onError(error) {
    console.error(`Error: ${error}`);
}