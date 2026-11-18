(function () {
    var COPY_ICON = '<svg class="icon-copy" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="9" y="9" width="13" height="13" rx="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>';
    var CHECK_ICON = '<svg class="icon-check" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="20 6 9 17 4 12"></polyline></svg>';

    function copyText(text) {
        if (navigator.clipboard && window.isSecureContext) {
            return navigator.clipboard.writeText(text);
        }
        return new Promise(function (resolve, reject) {
            var area = document.createElement("textarea");
            area.value = text;
            area.setAttribute("readonly", "");
            area.style.position = "fixed";
            area.style.opacity = "0";
            document.body.appendChild(area);
            area.select();
            try {
                document.execCommand("copy") ? resolve() : reject();
            } catch (e) {
                reject(e);
            } finally {
                document.body.removeChild(area);
            }
        });
    }

    document.querySelectorAll("div.highlighter-rouge").forEach(function (block) {
        var pre = block.querySelector("pre");
        if (!pre) return;

        var button = document.createElement("button");
        button.type = "button";
        button.className = "copy-code";
        button.setAttribute("aria-label", "Copy code");
        button.innerHTML = COPY_ICON + CHECK_ICON;

        var timer;
        button.addEventListener("click", function () {
            copyText(pre.textContent.replace(/\n$/, "")).then(function () {
                button.classList.add("copied");
                button.setAttribute("aria-label", "Copied");
                clearTimeout(timer);
                timer = setTimeout(function () {
                    button.classList.remove("copied");
                    button.setAttribute("aria-label", "Copy code");
                }, 1500);
            }, function () {});
        });

        block.appendChild(button);
    });
})();
