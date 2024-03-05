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

function detectAdblock() {
  try {
    fetch(
      new Request(
        "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js",
        {
          method: "HEAD",
          mode: "no-cors",
        }
      )
    ).catch((error) => {
      showNotification();
    });
  } catch (e) {
    // Request failed, likely due to ad blocker
    showNotification();
  }
}

function showNotification() {
  var sponsor = document.querySelector("#my-content");
  var prompt = document.createElement("div");
  prompt.className = "content";
  prompt.style =
    "hborder: 1px solid #c6c6c6;border-radius: 4px;background-color: #f5f2f0;padding: 15px; font-size: 14px;";
  prompt.innerHTML =
    "<h1>您使用了广告拦截器，导致本站内容无法显示</h1><h2> You are using an ad blocker, which prevents the content of this site from being displayed</h2> <p>创作不易，小站依赖广告维持运转，还请将 mephisto.cc 加入白名单，解除广告屏蔽后，刷新页面。谢谢🙏</p> <p>Please add mephisto.cc to the whitelist, unblock the advertising, and refresh the page. Thank you 🙏</p>";
  sponsor.parentNode.replaceChild(prompt, sponsor);
}

setTimeout(detectAdblock, 1000);
