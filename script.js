(function (global) {

  var dc = {};

  var homeHtml = "snippets/home-snippet.html";

  var insertHtml = function (selector, html) {
    var targetElem = document.querySelector(selector);
    targetElem.innerHTML = html;
  };

  var showLoading = function (selector) {
    var html = "<div class='text-center'>";
    html += "<img src='images/ajax-loader.gif'></div>";
    insertHtml(selector, html);
  };

  var insertProperty = function (string, propName, propValue) {
    var propToReplace = "{{" + propName + "}}";
    string = string.replace(new RegExp(propToReplace, "g"), propValue);
    return string;
  };

  var chooseRandomCategory = function (categories) {
    var randomIndex = Math.floor(Math.random() * categories.length);
    return categories[randomIndex].short_name;
  };

  document.addEventListener("DOMContentLoaded", function (event) {

    $ajaxUtils.sendGetRequest(
      "https://davids-restaurant.herokuapp.com/categories.json",
      function (categories) {

        var randomCategoryShortName = chooseRandomCategory(categories);

        $ajaxUtils.sendGetRequest(
          homeHtml,
          function (homeHtml) {
            var homeHtmlToInsertIntoMainPage = insertProperty(homeHtml, "randomCategoryShortName", "'" + randomCategoryShortName + "'");
            insertHtml("#main-content", homeHtmlToInsertIntoMainPage);
          },
          false);
      },
      true);
  });

  global.$dc = dc;

})(window);
