const DRK_COM_AR_SESSION_ENDPOINT = 'https://drk-com-ar-session.drkbugs.workers.dev'; 

async function getCurrentSession() {
  try {
    const response = await fetch(DRK_COM_AR_SESSION_ENDPOINT + '/session', { credentials: 'include' });
    const session = returnSessionIfOk(response);
    return session;
  } catch (error) {
    console.error('Unable to get session:', error);
    throw error;
  }
}

function returnSessionIfOk(response) {
  if (!response.ok) {
    console.error(`Unable to get session: ${response.status} ${response.statusText}`);
    return null;
  }
  return response.json();
}

function signIn() {
  window.location.href = `${DRK_COM_AR_SESSION_ENDPOINT}/login/google`;
}

function signOut() {
  window.location.href = `${DRK_COM_AR_SESSION_ENDPOINT}/logout/google`;
}

window.onload = async () => {
  try {
    window.drkbugsSession = await getCurrentSession();
    setupWidgets(window.drkbugsSession != null);
  } catch (error) {
    setupWidgets(false);
    console.error('Unable to get session:', error);
  }
};

function setupWidgets(loggedIn) {
  if (loggedIn) {
    displaySessionInformation();
    document.getElementById('session-section').style.display = 'block';
  } else {
    document.getElementById('login-section').style.display = 'block';
  }
}

function displaySessionInformation() {
  document.getElementById('session-username').textContent = window.drkbugsSession.displayName;
  document.getElementById('session-avatar').src = window.drkbugsSession.avatarUrl;
  document.getElementById('session-avatar').alt = window.drkbugsSession.username;
}

