const DRK_COM_AR_SERVICE_ENDPOINT = 'https://service.drk.com.ar'; 

async function getGrampsSession() {
  try {
    const response = await fetch(DRK_COM_AR_SERVICE_ENDPOINT + '/gramps/person', { credentials: 'include' });
    return returnSessionIfOk(response);
  } catch (error) {
    console.error('Unable to get session:', error);
    throw error;
  }
}