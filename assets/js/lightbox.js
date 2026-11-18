(function () {
    var images = document.querySelectorAll("figure img");
    if (!images.length || typeof HTMLDialogElement === "undefined") return;

    var OPEN_MS = 260;
    var CLOSE_MS = 200;
    var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

    var dialog = document.createElement("dialog");
    dialog.className = "lightbox";
    var large = document.createElement("img");
    dialog.appendChild(large);
    document.body.appendChild(dialog);

    var current = null;
    var closing = false;

    // maps the large image onto the thumbnail's box, for the zoom animation
    function transformTo(box, target) {
        var dx = box.left - target.left;
        var dy = box.top - target.top;
        return "translate(" + dx + "px, " + dy + "px) scale(" + box.width / target.width + ", " + box.height / target.height + ")";
    }

    function open(image) {
        current = image;
        large.src = image.currentSrc || image.src;
        large.alt = image.alt;

        // wait for the image to be decoded so we can measure it, but never block opening on a failure
        large.decode().catch(function () {}).then(function () {
            var from = image.getBoundingClientRect();

            // keep the page from shifting sideways when the scrollbar disappears
            document.documentElement.style.setProperty(
                "--scrollbar-width",
                (window.innerWidth - document.documentElement.clientWidth) + "px"
            );
            dialog.showModal();

            if (reduceMotion.matches) {
                image.style.visibility = "hidden";
                return;
            }

            var to = large.getBoundingClientRect();
            large.animate(
                [
                    { transform: transformTo(from, to), transformOrigin: "top left" },
                    { transform: "none", transformOrigin: "top left" }
                ],
                { duration: OPEN_MS, easing: "cubic-bezier(0.2, 0.8, 0.2, 1)" }
            );
            // hide the thumbnail so the large image looks like it lifts off the page
            image.style.visibility = "hidden";
        });
    }

    function finish() {
        dialog.close();
        dialog.classList.remove("closing");
        large.getAnimations().forEach(function (animation) { animation.cancel(); });
        if (current) current.style.visibility = "";
        closing = false;
    }

    function close() {
        if (closing || !dialog.open) return;
        closing = true;

        if (reduceMotion.matches) {
            finish();
            return;
        }

        dialog.classList.add("closing");

        var target = current.getBoundingClientRect();
        var from = large.getBoundingClientRect();
        var onScreen = target.bottom > 0 && target.top < window.innerHeight;

        var keyframes = onScreen
            ? [
                { transform: "none", transformOrigin: "top left" },
                { transform: transformTo(target, from), transformOrigin: "top left" }
            ]
            : [{ opacity: 1 }, { opacity: 0 }];

        large.animate(keyframes, {
            duration: CLOSE_MS,
            easing: "cubic-bezier(0.4, 0, 0.6, 1)",
            fill: "forwards"
        }).finished.then(finish, finish);
    }

    // clicking anywhere (image or backdrop) closes
    dialog.addEventListener("click", close);
    // Esc would close instantly; route it through the animated close instead
    dialog.addEventListener("cancel", function (event) {
        event.preventDefault();
        close();
    });

    images.forEach(function (image) {
        if (image.closest("a")) return;

        image.classList.add("zoomable");
        image.tabIndex = 0;
        image.setAttribute("role", "button");

        image.addEventListener("click", function () {
            open(image);
        });
        image.addEventListener("keydown", function (event) {
            if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                open(image);
            }
        });
    });
})();
