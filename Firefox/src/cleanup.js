"use strict";

const CONFIG_KEY = "filterList";

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
    removeContentFromORF(configuration);
  } else if (url.hostname.search("derstandard.at") >= 0) {
    removeContentFromStandard(configuration);
  }
}

function removeContentFromORF(configuration) {
  for (let topic of configuration) {
    if (topic.filter && "keyORF" in topic) {
      const elements = document.body.getElementsByClassName(topic.keyORF);
      for (let i = 0; i < elements.length; i++) {
        elements[i].parentElement.removeChild(elements[i]);
      }
    }
  }
}

function removeContentFromStandard(configuration) {
  for (let topic of configuration) {
    if (topic.filter && "keyStandard" in topic) {
      const elements = document.body.getElementsByClassName(topic.keyStandard);
      console.log(elements);
      console.log(elements.length);
      for (let i = 0; i < elements.length; i++) {
        elements[i].style.visibility = "hidden"; 
      }
    }
  }
}

//document.body.style.border = "5px solid red";