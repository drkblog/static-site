// Load the Google Identity Services library
function loadGoogleIdentityServices() {
  return new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = 'https://accounts.google.com/gsi/client';
    script.async = true;
    script.defer = true;
    script.onload = resolve;
    script.onerror = reject;
    document.head.appendChild(script);
  });
}

// Initialize Google Sign-In
async function initializeGoogleSignIn() {
  await loadGoogleIdentityServices();

  const client = google.accounts.oauth2.initTokenClient({
    client_id: '347311838940-flgbfemmepd53i0vpgvri360ca8ifvl9.apps.googleusercontent.com',
    scope: 'https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email',
    callback: handleCredentialResponse,
  });

  return client;
}

// Handle the credential response
function handleCredentialResponse(response) {
  if (response.access_token) {
    // Use the access token to fetch user information
    fetchUserInfo(response.access_token);
  } else {
    console.error('Error during Google Sign-In:', response.error);
  }
}

// Fetch user information using the access token
function fetchUserInfo(accessToken) {
  fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
    headers: {
      'Authorization': `Bearer ${accessToken}`
    }
  })
    .then(response => response.json())
    .then(data => {
      console.log(data);
      const usernameWidget = document.getElementById('username-widget');
      usernameWidget.textContent = data.name;
    }
    )
    .catch(error => {
      console.error('Error fetching user info:', error);
    });
}

// Sign in function
function signIn() {
  if (window.tokenClient) {
    window.tokenClient.requestAccessToken();
  } else {
    console.error('Google Sign-In not initialized');
  }
}

// Sign out function
function signOut() {
  google.accounts.oauth2.revoke(accessToken, () => {
    console.log('User signed out.');
    // Here you can handle sign-out, e.g., update UI, clear local data, etc.
  });
}

// Initialize Google Sign-In when the page loads
window.onload = async () => {
  try {
    window.tokenClient = await initializeGoogleSignIn();
    console.log('Google Sign-In initialized');
  } catch (error) {
    console.error('Error initializing Google Sign-In:', error);
  }
};
