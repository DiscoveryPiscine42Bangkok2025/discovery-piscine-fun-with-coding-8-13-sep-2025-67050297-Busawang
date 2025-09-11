function setCookie(name, value, days) {
  const maxAge = days * 24 * 60 * 60;
  document.cookie = `${encodeURIComponent(name)}=${encodeURIComponent(value)}; max-age=${maxAge}; path=/; samesite=lax`;
}
function getCookie(name) {
  const key = encodeURIComponent(name) + "=";
  return document.cookie
    .split(";")
    .map(s => s.trim())
    .filter(s => s.startsWith(key))
    .map(s => decodeURIComponent(s.substring(key.length)))[0] || "";
}
const COOKIE_NAME = "todo_list_v1";
function loadTodos() {
  try { return JSON.parse(getCookie(COOKIE_NAME) || "[]"); }
  catch { return []; }
}
function saveTodos(items) {
  setCookie(COOKIE_NAME, JSON.stringify(items), 365);
}

const listEl = document.getElementById("ft_list");
const emptyMsg = document.getElementById("emptyMsg");
function updateEmptyMsg() {
  emptyMsg.hidden = listEl.children.length > 0;
}
function makeItem(text) {
  const div = document.createElement("div");
  div.className = "todo";
  div.textContent = text;
  div.addEventListener("click", () => {
    if (confirm("Remove this TO DO?")) {
      div.remove();
      persistFromDOM();
      updateEmptyMsg();
    }
  });
  return div;
}
function persistFromDOM() {
  const items = Array.from(listEl.children).map(el => el.textContent);
  saveTodos(items);
}

(function init() {
  const items = loadTodos();
  for (let i = items.length - 1; i >= 0; i--) {
    prependTodo(items[i]);
  }
  updateEmptyMsg();
})();

document.getElementById("newBtn").addEventListener("click", () => {
  const input = prompt("New TO DO:");
  if (input === null) return; 
  const text = String(input).trim();
  if (text === "") return;             
  prependTodo(text);
  persistFromDOM();
  updateEmptyMsg();
});

function prependTodo(text) {
  const el = makeItem(text);
  if (listEl.firstChild) listEl.insertBefore(el, listEl.firstChild);
  else listEl.appendChild(el);
}
