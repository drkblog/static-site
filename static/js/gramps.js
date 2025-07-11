const DRK_COM_AR_GRAMPS_ENDPOINT = 'https://gramps.drk.com.ar'; 

async function getGrampsSession() {
  try {
    const response = await fetch(DRK_COM_AR_GRAMPS_ENDPOINT + '/summary', { credentials: 'include' });
    return returnSessionIfOk(response);
  } catch (error) {
    console.error('Unable to get session:', error);
    throw error;
  }
}