import httpClient from '@/plugins/axios';

const getAllVisitas = async () => httpClient.get('/visitanteunidade/visitaById/');
const createVisita = async (visita) => {
    try {
      await httpClient.post('/visitanteunidade/', visita);
  
      return true;
    } catch (error) {
      console.log('Problemaa');
      if (error.response.status === 406) {
        return false;
      } else {
        console.log('Deu erro');
        throw new Error(error);
      }
    }
  };

  const deleteVisita = async (visitaId) => {
    try {
      await httpClient.delete('/visitante/'+visitaId);
      return true;
    } catch (error) {
      if (error.response.status === 406) {
        return false;
      } else {
        throw new Error(error);
      }
    }
  }; 
  
  const updateVisita = async (visitaId, status) => {
    try {
      await httpClient.put(`/visitante/${visitaId}/${status}`);
      return true;
    } catch (error) {
      if (error.response.status === 406) {
        return false;
      } else {
        throw new Error(error);
      }
    }
  }; 

  const getVisitaById =  async (visitaId) => {
    try {
      return await httpClient.get('/visitante/'+visitaId);
    } catch (error) {
      if (error.response.status === 406) {
        return false;
      } else {
        throw new Error(error);
      }
    }
  }; 

export { getAllVisitas, createVisita, deleteVisita, getVisitaById, updateVisita};
