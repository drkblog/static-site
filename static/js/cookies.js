const cookieContainer = document.querySelector(".cookie-container");
const cookieButton = document.querySelector(".cookie-btn");

cookieButton.addEventListener("click", () => {
  cookieContainer.classList.remove("active");
  localStorage.setItem("cookiesAccepted", "true");
});

setTimeout(() => {
  if (!localStorage.getItem("cookiesAccepted")) {
    cookieContainer.classList.add("active");
  }
}, 2000);