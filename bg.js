browser.webRequest.onBeforeSendHeaders.addListener(
    // rewrite host header
    (e) => {
    for (const header of e.requestHeaders) {
      // trick it onto thinking we're asking from the new domain
      if (header.name.toLowerCase() == "host") {
        header.value = "x.com";
      }
    }
    return { requestHeaders: e.requestHeaders };
  },
  { urls: ["https://twitter.com/", "https://twitter.com/*"] },
  ["blocking", "requestHeaders"]
);
