let popup = null;

document.addEventListener("mouseup", (e) => {
    setTimeout(() => {
        const selection = window.getSelection();
        const text = selection.toString().trim();

        if (!text) {
            removePopup();
            return;
        }

        showPopup(text, e.pageX, e.pageY);
    }, 10);
});

function showPopup(text, x, y) {
    removePopup();

    popup = document.createElement("div");

    Object.assign(popup.style, {
        position: "absolute",
        top: `${y + 10}px`,
        left: `${x + 10}px`,
        background: "#111",
        color: "#fff",
        padding: "6px",
        borderRadius: "8px",
        zIndex: "999999",
        boxShadow: "0 4px 12px rgba(0,0,0,0.2)"
    });

    popup.innerHTML = `
    <button id="save-highlight-btn" style="
      background: #fff;
      color: #111;
      border: none;
      padding: 6px 10px;
      border-radius: 6px;
      cursor: pointer;
      font-size: 12px;
    ">
      💾 Save Highlight
    </button>
  `;

    // prevent selection loss when clicking popup
    popup.addEventListener("mousedown", (e) => {
        e.preventDefault();
        e.stopPropagation();
    });

    popup.querySelector("#save-highlight-btn").onclick = () => {
        console.log("Saved:", text);
        window.getSelection().removeAllRanges();
        removePopup();
    };

    document.body.appendChild(popup);
}

function removePopup() {
    if (popup) {
        popup.remove();
        popup = null;
    }
}