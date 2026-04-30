/* ===== SEARCH ===== */
function searchTopic() {
  const val = document.getElementById("searchInput")?.value.trim();

  if (!val) {
    alert("Enter something 🚀");
    return;
  }

  localStorage.setItem("searchQuery", val);
  window.location.href = "resources.html";
}

/* ===== PROFILE ===== */
const icon = document.getElementById("profileIcon");
const dropdown = document.getElementById("profileDropdown");

if (icon && dropdown) {
  icon.addEventListener("click", (e) => {
    e.stopPropagation();
    dropdown.style.display =
      dropdown.style.display === "block" ? "none" : "block";
  });

  document.addEventListener("click", () => {
    dropdown.style.display = "none";
  });
}

const userName = document.getElementById("userName");
if(userName){
  userName.textContent = localStorage.getItem("user") || "Guest User";
}

/* ===== BOOKMARK ===== */
document.querySelectorAll(".bookmarkBtn").forEach(btn => {
  const id = btn.parentElement.dataset.id;
  let saved = JSON.parse(localStorage.getItem("bookmarks") || "[]");

  if (saved.includes(id)) {
    btn.classList.add("saved");
    btn.textContent = "✅ Saved";
  }

  btn.addEventListener("click", () => {
    let saved = JSON.parse(localStorage.getItem("bookmarks") || "[]");

    if (saved.includes(id)) {
      saved = saved.filter(x => x !== id);
      btn.textContent = "🔖 Save";
    } else {
      saved.push(id);
      btn.textContent = "✅ Saved";
    }

    localStorage.setItem("bookmarks", JSON.stringify(saved));
  });
});
document.querySelectorAll(".bookmarkBtn").forEach(btn => {
  const id = btn.parentElement.dataset.id;
  let saved = JSON.parse(localStorage.getItem("bookmarks") || "[]");

  if (saved.includes(id)) {
    btn.classList.add("saved");
    btn.textContent = "✅ Saved";
  }

  btn.addEventListener("click", () => {
    let saved = JSON.parse(localStorage.getItem("bookmarks") || "[]");

    if (saved.includes(id)) {
      saved = saved.filter(x => x !== id);
      btn.textContent = "🔖 Save";

      // 👇 ADD THIS
      addActivity("Removed bookmark ❌");

    } else {
      saved.push(id);
      btn.textContent = "✅ Saved";

      // 👇 ADD THIS
      addActivity("Bookmarked a resource 📌");
    }

    localStorage.setItem("bookmarks", JSON.stringify(saved));
  });
});

/* ===== AI ===== */
function getAIAnswer(query){
  query = query.toLowerCase();

  if(query.includes("web")) return "Start HTML → CSS → JS → Projects 🚀";
  if(query.includes("html")) return "Learn HTML basics first.";
  if(query.includes("css")) return "Focus on Flexbox & Grid.";
  if(query.includes("js")) return "Learn JS + DOM.";
  if(query.includes("react")) return "Learn React after JS.";
  if(query.includes("freelance")) return "Skills → Portfolio → Clients 💰";

  return "Ask about web dev, HTML, CSS, freelance 🤖";
}

document.getElementById("aiAskBtn")?.addEventListener("click", () => {
  const input = document.getElementById("aiInput");
  const output = document.getElementById("aiText");

  if(!input || !output) return;

  const value = input.value.trim();
  if(!value){
    output.textContent = "Enter a question 🤖";
    return;
  }

  output.textContent = getAIAnswer(value);
});

/* ENTER SUPPORT */
document.getElementById("aiInput")?.addEventListener("keypress", (e) => {
  if(e.key === "Enter"){
    document.getElementById("aiAskBtn").click();
  }
});


/* ===== DASHBOARD SYSTEM ===== */
document.addEventListener("DOMContentLoaded", () => {

  const goal = localStorage.getItem("goal");
  const progress = JSON.parse(localStorage.getItem("progress") || "{}");

  const goalEl = document.getElementById("currentGoal");
  const progressEl = document.getElementById("progressPercent");

  if(goalEl){
    goalEl.textContent = goal || "Not Selected";
  }

  if(progressEl){
    const total = Object.keys(progress).length;
    const done = Object.values(progress).filter(v => v).length;
    const percent = total ? Math.round((done / total) * 100) : 0;
    progressEl.textContent = percent + "%";
  }

  /* ACTIVITY */
  const activity = document.getElementById("activityList");

  if(activity){
    const logs = JSON.parse(localStorage.getItem("activity") || "[]");

    if(logs.length === 0){
      activity.innerHTML = "<li>No activity yet</li>";
    } else {
      activity.innerHTML = logs.map(a => `<li>${a}</li>`).join("");
    }
  }

});


/* ===== ACTIVITY TRACK ===== */
function addActivity(text){
  let logs = JSON.parse(localStorage.getItem("activity") || "[]");

  logs.unshift(text);

  if(logs.length > 5) logs.pop();

  localStorage.setItem("activity", JSON.stringify(logs));
}


/* ===== QUICK NAV ===== */
function goToPath(){
  window.location.href = "path.html";
}

function goToResources(){
  window.location.href = "resources.html";
}

/* ===== PATH SYSTEM ===== */

const paths = {
  web: [
    { title: "HTML Basics", link: "https://youtu.be/kUMe1FH4CHE" },
    { title: "CSS Basics", link: "https://youtu.be/OXGznpKZ_sA" },
    { title: "JavaScript", link: "https://youtu.be/PkZNo7MFNFg" },
    { title: "Mini Project", link: "https://youtu.be/zt1j51V06IE" }
  ],
  freelance: [
    { title: "Web Basics", link: "https://youtu.be/PANUQGHgxCI" },
    { title: "Portfolio", link: "https://youtu.be/NWZQkwXtHJo" },
    { title: "Fiverr", link: "https://youtu.be/D_3j5DWzUrI" },
    { title: "First Client", link: "https://youtu.be/C-qVJNrWGAI" }
  ]
};

function renderPath(goal){
  const steps = document.getElementById("steps");
  if(!steps) return;

  steps.innerHTML = "";

  if(!paths[goal]){
    steps.innerHTML = "<div class='empty'>Select a goal 🚀</div>";
    return;
  }

  paths[goal].forEach((s) => {
    const div = document.createElement("div");
    div.className = "step";

    div.innerHTML = `
      <strong>${s.title}</strong><br>
      <a href="${s.link}" target="_blank">Open Resource</a>
    `;

    steps.appendChild(div);
  });
}

/* ===== BUTTON ===== */
document.getElementById("continueBtn")?.addEventListener("click", () => {
  const goal = document.getElementById("goalSelect").value;

  if(!goal){
    alert("Select goal 🚀");
    return;
  }

  localStorage.setItem("goal", goal);
  renderPath(goal);
});

/* ===== LOAD SAVED GOAL ===== */
document.addEventListener("DOMContentLoaded", () => {
  const savedGoal = localStorage.getItem("goal");

  if(savedGoal){
    const select = document.getElementById("goalSelect");
    if(select){
      select.value = savedGoal;
    }

    renderPath(savedGoal);
  }
});
