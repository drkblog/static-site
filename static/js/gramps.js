// const DRK_COM_AR_GRAMPS_ENDPOINT = 'https://gramps.drkbugs.workers.dev'; 
const DRK_COM_AR_GRAMPS_ENDPOINT = 'https://drk-com-ar-session.drkbugs.workers.dev'; 

async function getGrampsSession() {
  try {
    const response = await fetch(DRK_COM_AR_GRAMPS_ENDPOINT + '/session', { credentials: 'include' });
    return returnSessionIfOk(response);
  } catch (error) {
    console.error('Unable to get session:', error);
    throw error;
  }
}