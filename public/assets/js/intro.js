var intro = introJs().setOptions({
  hidePrev: true,
  hideNext: true,
  exitOnOverlayClick: false,
  exitOnEsc: false,
  steps: [
     
    // {
    //   element: document.querySelector("#content"),
    //   intro: "This whole area does something."
    // },
    // {
    //   element: document.querySelectorAll("li")[0],
    //   intro: "This is the first item in the list. It also does something."
    // },
    // {
    //   element: document.querySelectorAll("li")[1],
    //   intro: "This second item probably does something as well"
    // },

    {
      element: document.querySelector("button"),
      intro:
        "<p>Swap Right to Send & Swap Left to Reject</p>" +
        '<video src="https://essaneinfotech.com/mhengleapp/storage/app/video/intro.mp4" autoplay loop />',
      tooltipClass: "wideo"
    }
  ]
}).oncomplete(() => document.cookie = "intro-complete=true");

var start = () => intro.start();

window.addEventListener("load", () => {
  const starterButton = document.querySelector("#starter");

  if (starterButton) {
    starterButton.addEventListener("click", e => {
      e.preventDefault();
      start();
    });
  } else {
    console.error("Element with id 'starter' not found.");
  }
});


if (document.cookie.split(";").indexOf("intro-complete=true") < 0)
  window.setTimeout(start, 1000);

   