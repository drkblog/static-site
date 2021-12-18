const greetingsSection = document.querySelector(".widget-session .greetings");
const loginSection = document.querySelector(".widget-session .login");
const sessionName = document.querySelector("#session-name");


fetch('https://tiktok-login.drkbugs.workers.dev/', {
  credentials: 'include'
})
.then(response => {
  return response.json();
})
.then(json => { 
    console.debug(json);
    showGreetings();
    sessionName.innerHTML = json.displayName;
})
.catch(err => { 
    console.debug(err);
    showLogin();
});

function showGreetings() {
  greetingsSection.style.display = "block";
  loginSection.style.display = "none";
}

function showLogin() {
  greetingsSection.style.display = "none";
  loginSection.style.display = "block";
}