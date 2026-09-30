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

  function copyWithExecCommand(value) {
    var textarea = document.createElement("textarea");
    textarea.value = value;
    textarea.setAttribute("readonly", "");
    textarea.setAttribute("aria-hidden", "true");
    textarea.style.position = "fixed";
    textarea.style.top = "0";
    textarea.style.left = "0";
    textarea.style.width = "1px";
    textarea.style.height = "1px";
    textarea.style.padding = "0";
    textarea.style.border = "0";
    textarea.style.opacity = "0";
    document.body.appendChild(textarea);
    textarea.focus();
    textarea.select();
    textarea.setSelectionRange(0, value.length);

    var copied = false;

    try {
      copied = document.execCommand("copy");
    } catch (_) {
      copied = false;
    }

    document.body.removeChild(textarea);
    return copied;
  }

  function copyValue(value) {
    if (copyWithExecCommand(value)) {
      return Promise.resolve();
    }

    if (navigator.clipboard && navigator.clipboard.writeText) {
      return navigator.clipboard.writeText(value);
    }

    return Promise.reject(new Error("Copy is not supported"));
  }

  buttons.forEach(function (button) {
    var idleLabel = getIdleLabel(button);
    var resetTimer = 0;

    button.addEventListener("click", function () {
      var value = button.getAttribute("data-copy") || "";

      function succeed() {
        window.clearTimeout(resetTimer);
        button.dataset.copyState = "success";
        setLabel(button, button.getAttribute("data-copied-label") || "Copied");
        resetTimer = window.setTimeout(function () {
          button.dataset.copyState = "";
          setLabel(button, idleLabel);
        }, 2000);
      }

      function fail() {
        window.clearTimeout(resetTimer);
        button.dataset.copyState = "error";
        setLabel(button, button.getAttribute("data-copy-failed-label") || "Failed");
        resetTimer = window.setTimeout(function () {
          button.dataset.copyState = "";
          setLabel(button, idleLabel);
        }, 2000);
      }

      copyValue(value).then(succeed).catch(fail);
    });
  });
})();
