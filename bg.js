browser.webRequest.onBeforeSendHeaders.addListener(
  // rewrite host header
  async (e) => {
    let setHost = false;
    let hostHeader = null;
    let twitterCookies = await browser.cookies.getAll({
      domain: ".twitter.com",
    });
    for (const cookie of twitterCookies) {
      if (cookie.name == "auth_token") {
        setHost = true;
      }
    }

    if (!setHost) {
      let xCookies = await browser.cookies.getAll({ domain: ".x.com" });
      for (const c of xCookies) {
        if (c.name.toLowerCase() == "auth_token") {
          await browser.cookies.set({
            domain: ".twitter.com",
            expirationDate: c.expirationDate,
            url: "https://twitter.com",
            secure: true,
            name: "auth_token",
            value: c.value,
          });
          console.log("set auth token successfully");
          setHost = true;
        }
      }
    }

    for (const header of e.requestHeaders) {
      // trick it onto thinking we're asking from the new domain
      if (header.name.toLowerCase() == "host") {
        hostHeader = header;
      }
    }

    if (setHost) {
      hostHeader.value = "x.com";
    }

    return { requestHeaders: e.requestHeaders };
  },
  { urls: ["https://twitter.com/", "https://twitter.com/*"] },
  ["blocking", "requestHeaders"]
);
