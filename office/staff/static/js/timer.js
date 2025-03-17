// This file is used to make the message disappear after 3 seconds
setTimeout(function () {
  // selecting the div with class 'message'
  var messageDiv = document.querySelector(".message");
  // removing the class 'show' from the div (which will make it disappear)
  messageDiv.classList.add("hide");
}, 3000); // 3000 milliseconds = 3 seconds
