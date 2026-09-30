(function () {
  var buttons = document.querySelectorAll("[data-copy]");

  document.documentElement.dataset.copyReady = String(buttons.length);

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

  function selectNearbyCode(button) {
    var field = button.closest(".repo-field");
    var code = field ? field.querySelector("code") : null;

    if (!code) {
      return;
    }

    var selection = window.getSelection();

    if (!selection) {
      return;
    }

    var range = document.createRange();
    range.selectNodeContents(code);
    selection.removeAllRanges();
    selection.addRange(range);
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
    textarea.focus({ preventScroll: true });
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

    if (!navigator.clipboard || !navigator.clipboard.writeText) {
      return Promise.reject(new Error("Copy is not supported"));
    }

    return new Promise(function (resolve, reject) {
      var settled = false;
      var timer = window.setTimeout(function () {
        if (settled) {
          return;
        }

        settled = true;
        reject(new Error("Copy timed out"));
      }, 400);

      navigator.clipboard.writeText(value).then(
        function () {
          if (settled) {
            return;
          }

          settled = true;
          window.clearTimeout(timer);
          resolve();
        },
        function (error) {
          if (settled) {
            return;
          }

          settled = true;
          window.clearTimeout(timer);
          reject(error);
        }
      );
    });
  }

  buttons.forEach(function (button) {
    var idleLabel = getIdleLabel(button);
    var resetTimer = 0;

    button.addEventListener("click", function (event) {
      event.preventDefault();

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

      selectNearbyCode(button);
      copyValue(value).then(succeed).catch(fail);
    });
  });
})();
