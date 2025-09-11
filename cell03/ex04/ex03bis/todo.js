function setCookie(name, value, days) {
  var maxAge = days * 24 * 60 * 60;
  document.cookie = encodeURIComponent(name) + "=" + encodeURIComponent(value)
    + "; max-age=" + maxAge + "; path=/; samesite=lax";
}
function getCookie(name) {
  var key = encodeURIComponent(name) + "=";
  var parts = document.cookie.split(";").map(function (s) { return s.trim(); });
  for (var i = 0; i < parts.length; i++) {
    if (parts[i].indexOf(key) === 0) {
      return decodeURIComponent(parts[i].substring(key.length));
    }
  }
  return "";
}

var COOKIE_NAME = "todo_list_v1";

function loadTodos() {
  try { return JSON.parse(getCookie(COOKIE_NAME) || "[]"); }
  catch (e) { return []; }
}
function saveTodos(items) {
  setCookie(COOKIE_NAME, JSON.stringify(items), 365);
}
function persistFromDOM() {
  var items = [];
  $("#ft_list").children().each(function () {
    items.push($(this).text());
  });
  saveTodos(items);
}
function updateEmptyMsg() {
  $("#emptyMsg").prop("hidden", $("#ft_list").children().length > 0);
}

function makeItem(text) {
  var $div = $("<div>").addClass("todo").text(text);
  $div.on("click", function () {
    if (confirm("Remove this TO DO?")) {
      $div.remove();
      persistFromDOM();
      updateEmptyMsg();
    }
  });
  return $div;
}

function prependTodo(text) {
  var $el = makeItem(text);
  var $list = $("#ft_list");
  if ($list.children().length) $el.prependTo($list);
  else $list.append($el);
}

$(function () {
  var items = loadTodos();
  for (var i = items.length - 1; i >= 0; i--) {
    prependTodo(items[i]);
  }
  updateEmptyMsg();
  $("#newBtn").on("click", function () {
    var input = prompt("New TO DO:");
    if (input === null) return; 
    var text = String(input).trim();
    if (!text) return; 
    prependTodo(text);
    persistFromDOM();
    updateEmptyMsg();
  });
});
