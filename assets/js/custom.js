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
