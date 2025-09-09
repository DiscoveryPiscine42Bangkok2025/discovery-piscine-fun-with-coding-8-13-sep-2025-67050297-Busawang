// cookie utils
function setCookie(n,v) { document.cookie = n + "=" + encodeURIComponent(v) + ";path=/"; }
function getCookie(n) {
  const m = document.cookie.match(new RegExp("(^| )" + n + "=([^;]+)"));
  return m ? decodeURIComponent(m[2]) : null;
}

const list = document.getElementById("ft_list");
const btn = document.getElementById("new");

function save() {
  const items = Array.from(list.children).map(el => el.textContent);
  setCookie("todo", JSON.stringify(items));
}

function load() {
  const raw = getCookie("todo");
  if (raw) JSON.parse(raw).forEach(t => add(t, false));
}

function add(text, promptAdd = true) {
  if (promptAdd) {
    const t = prompt("Enter a new TO DO");
    if (!t) return;
    text = t.trim();
  }
  if (!text) return;
  const div = document.createElement("div");
  div.textContent = text;
  div.onclick = () => {
    if (confirm("Do you really want to remove this TO DO?")) {
      div.remove(); save();
    }
  };
  list.insertBefore(div, list.firstChild);
  save();
}

btn.onclick = () => add(null, true);
load();
