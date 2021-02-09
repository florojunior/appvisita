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

  const deleteVisita = async (visitaId) => {
    try {
      await httpClient.delete('/visitaexterna/'+visitaId);
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
      await httpClient.put(`/visitaexterna/${visitaId}/${status}`);
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
      return await httpClient.get('/visitaexterna/'+visitaId);
    } catch (error) {
      if (error.response.status === 406) {
        return false;
      } else {
        throw new Error(error);
      }
    }
  }; 

export { getAllVisitas, createVisita, deleteVisita, getVisitaById, updateVisita};
