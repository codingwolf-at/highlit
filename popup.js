const listEl = document.getElementById("list");
const clearAllBtn = document.getElementById("clear-all");

const readHighlights = () => {
    chrome.storage.local.get(["highlights"], (result) => {
        const highlights = result.highlights || [];

        renderList(highlights);
    });
};

const renderList = (highlights) => {
    if (!highlights.length) {
        listEl.innerHTML = `<div class="empty">No highlights yet</div>`;
        clearAllBtn.style.display = "none";
        return;
    }

    clearAllBtn.style.display = "block";

    listEl.innerHTML = highlights
        .map(
            (h, index) => `
      <div class="item">
        <div class="text">${h.text}</div>
        <div class="actions">
          <button class="copy" data-index="${index}">Copy</button>
          <button class="delete" data-index="${index}">Delete</button>
        </div>
      </div>
    `
        )
        .join("");

    attachEvents(highlights);
};

const attachEvents = (highlights) => {
    // copy
    document.querySelectorAll(".copy").forEach((btn) => {
        btn.onclick = async () => {
            const index = btn.dataset.index;

            await navigator.clipboard.writeText(highlights[index].text);

            const original = btn.textContent;
            btn.textContent = "Copied";

            setTimeout(() => {
                btn.textContent = original;
            }, 2000);
        };
    });

    // delete
    document.querySelectorAll(".delete").forEach((btn) => {
        btn.onclick = () => {
            const index = btn.dataset.index;
            highlights.splice(index, 1);

            chrome.storage.local.set({ highlights }, () => {
                readHighlights();
            });
        };
    });
};

// clear all
clearAllBtn.onclick = () => {
    chrome.storage.local.set({ highlights: [] }, () => {
        readHighlights();
    });
};

readHighlights();