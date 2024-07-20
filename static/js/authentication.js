const DRK_COM_AR_SESSION_ENDPOINT = 'https://drk-com-ar-session.drkbugs.workers.dev'; 

function getCurrentSession() {
  return fetch(DRK_COM_AR_SESSION_ENDPOINT + '/session')
    .then(response => response.json())
    .then(session => session)
    .catch(error => {
      console.error('Unable to get session:', error);
      throw error;
    });
}

function signIn() {
}

function signOut() {
}

window.onload = async () => {
  try {
    window.drkbugsSession = await getCurrentSession();
    console.log(window.drkbugsSession);
  } catch (error) {
    console.error('Unable to get session:', error);
  }
};
