(function () {
  var buttons = document.querySelectorAll("[data-copy]");

  if (!buttons.length) {
    return;
  }

  function setLabel(button, label) {
    var text = button.querySelector("[data-copy-text]");

    if (text) {
      text.textContent = label;
    } else {
      button.textContent = label;
    }
  }

  function getIdleLabel(button) {
    return button.getAttribute("data-copy-label") || "Copy";
  }

  buttons.forEach(function (button) {
    var idleLabel = getIdleLabel(button);

    button.addEventListener("click", function () {
      var value = button.getAttribute("data-copy") || "";

      function succeed() {
        button.dataset.copyState = "success";
        setLabel(button, button.getAttribute("data-copied-label") || "Copied");
        window.setTimeout(function () {
          button.dataset.copyState = "";
          setLabel(button, idleLabel);
        }, 1600);
      }

      function fail() {
        button.dataset.copyState = "error";
        setLabel(button, button.getAttribute("data-copy-failed-label") || "Failed");
        window.setTimeout(function () {
          button.dataset.copyState = "";
          setLabel(button, idleLabel);
        }, 1600);
      }

      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(value).then(succeed).catch(fail);
        return;
      }

      fail();
    });
  });
})();
