"use strict";

const CONFIG_KEY = "NervMiNedFilterList";

browser.runtime.onMessage.addListener(function(message) {
  localStorage.setItem(CONFIG_KEY, JSON.stringify(message));
});

const configuration = JSON.parse(localStorage.getItem(CONFIG_KEY));
if (configuration != null) {
    removeContent(configuration);
}

function removeContent(configuration) {
  const url = new URL(window.location);
  if (url.hostname.search("orf.at") >= 0) {
    cleanUpContent(configuration, "keyORF");
  } else if (url.hostname.search("derstandard.at") >= 0) {
    cleanUpContent(configuration, "keyStandard");
  } else if (url.hostname.search("nachrichten.at") >= 0) {
    cleanUpContent(configuration, "keyOOE");
  }
}

function cleanUpContent(configuration, key) {
  console.log(key);
  for (let topic of configuration) {
    if (topic.filter && key in topic) {
      const elements = document.body.getElementsByClassName(topic[key]);
      for (let i = elements.length - 1; i >= 0; i--) {
		elements[i].parentElement.removeChild(elements[i]);
      }
    }
  }
}
