import httpClient from '@/plugins/axios';

const getAllVisitas = async () => httpClient.get('/visitaexterna/');
const createVisita = async (visita) => {
    try {
      await httpClient.post('/visitaexterna/', visita);
  
      return true;
    } catch (error) {
      if (error.response.status === 406) {
        return false;
      } else {
        throw new Error(error);
      }
    }
  };

export { getAllVisitas, createVisita };
