document.addEventListener("DOMContentLoaded", () => {
    const input = document.getElementById("msgInput");
    const kb = document.getElementById("keyboard");
  
    if (!input || !kb) return;
  
    let shift = false;
  
    const showKB = () => kb.classList.add("show");
    const hideKB = () => kb.classList.remove("show");
  
    input.addEventListener("focus", showKB);
  
    document.addEventListener("mousedown", (e) => {
      const clickedInside = kb.contains(e.target) || e.target === input;
      if (!clickedInside) hideKB();
    });
  
    kb.addEventListener("click", (e) => {
      const btn = e.target.closest("button");
      if (!btn) return;
  
      const action = btn.dataset.action;
      const key = btn.dataset.k;
  
      input.focus();
  
      if (action === "shift") {
        shift = !shift;
        return;
      }
  
      if (action === "backspace") {
        input.value = input.value.slice(0, -1);
        return;
      }
  
      if (action === "space") {
        input.value += " ";
        return;
      }
  
      if (action === "enter") {
        document.getElementById("button")?.click();
        return;
      }
  
      if (key) {
        input.value += shift ? key : key.toLowerCase();
        if (shift) shift = false;
      }
    });
  });