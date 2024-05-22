function addInfoText() {
  let d = document.createElement("div");
  let p = document.createElement("p");
  d.style =
    "position: absolute; width: 100vw; height: 40px; top: 0; display: flex; align-items: center; justify-content: center; background-color: red; font-family: sans-serif";
  p.innerText =
    "TwtIsTwt: Please login using x.com first! After that, you can head to Twitter per usual. This message will disappear after 30 seconds.";
  d.appendChild(p);
  document.body.appendChild(d);
  setTimeout(() => {
    d.remove();
  }, 30 * 1000);
}

let path = document.location.pathname;
if (path == "/" || path == "/i/flow/login") {
  if (document.readyState == "loading") {
    document.addEventListener("DOMContentLoaded", (e) => {
      addInfoText();
    });
  } else {
    addInfoText();
  }
}
