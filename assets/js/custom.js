// add custom js in this file

window.onscroll = function () {
  var pageOffset =
    document.documentElement.scrollTop || document.body.scrollTop;
  if (pageOffset > 1000) {
    document.getElementById("toTop").style.visibility = "visible";
  } else {
    document.getElementById("toTop").style.visibility = "hidden";
  }
};

function checker() {
  var isAdblocker = typeof adblock !== "undefined";
  if (isAdblocker) {
    var sponsor = document.querySelector("#my-content");
    var prompt = document.createElement("div");
    prompt.className = "content";
    prompt.style =
      "hborder: 1px solid #c6c6c6;border-radius: 4px;background-color: #f5f2f0;padding: 15px; font-size: 14px;";
    prompt.innerHTML =
      "<h1>您使用了广告拦截器，导致本站内容无法显示。</h1> <p>小站依赖广告维持运转，还请将 mephisto.cc 加入白名单，解除广告屏蔽后，刷新页面。谢谢!</p>";
    sponsor.parentNode.replaceChild(prompt, sponsor);
  }
}

setTimeout(checker, 1000);
