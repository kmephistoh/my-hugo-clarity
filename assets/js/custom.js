// add custom js in this file

window.onscroll = function () {
  var pageOffset = document.documentElement.scrollTop || document.body.scrollTop;
  var toTopBtn = document.getElementById("toTop"); // 提前获取元素，避免重复查询
  
  if (pageOffset > 1000) {
    // 显示：添加show类，触发过渡动画
    toTopBtn.classList.add("show");
  } else {
    // 隐藏：移除show类，触发过渡动画
    toTopBtn.classList.remove("show");
  }
};

// 可选：添加点击回到顶部的平滑滚动（提升体验）
document.getElementById("toTop").addEventListener('click', function() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
});

// 去除广告拦截检测，没什么意义
// function detectAdblock() {
//   try {
//     fetch(
//       new Request(
//         "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js",
//         {
//           method: "HEAD",
//           mode: "no-cors",
//         }
//       )
//     ).catch((error) => {
//       showNotification();
//     });
//   } catch (e) {
//     // Request failed, likely due to ad blocker
//     showNotification();
//   }
// }

// function showNotification() {
//   var sponsor = document.querySelector("#my-content");
//   var prompt = document.createElement("div");
//   prompt.className = "content";
//   prompt.style =
//     "hborder: 1px solid #c6c6c6;border-radius: 4px;background-color: #f5f2f0;padding: 15px; font-size: 14px;";
//   prompt.innerHTML =
//     "<h1>您使用了广告拦截器，导致本站内容无法显示</h1><h2> You are using an ad blocker, which prevents the content of this site from being displayed</h2> <p>创作不易，小站依赖广告维持运转，还请将 <font color='green'><strong>mephisto.cc</strong></font> 加入白名单，解除广告屏蔽后，刷新页面。谢谢🙏</p> <p>Please add <font color='green'><strong>mephisto.cc</strong></font> to the whitelist, unblock the advertising, and refresh the page. Thank you 🙏</p> <img src='/images/unblock-ads.webp'/> <img src='/images/whitelist.webp'/>";
//   sponsor.parentNode.replaceChild(prompt, sponsor);
// }

// setTimeout(detectAdblock, 1000);
