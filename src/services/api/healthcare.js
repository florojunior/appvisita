import httpClient from '@/plugins/axios';

/**
 * Protocol: 0053 - Create a new healthcare
 */
const createHealthcare = async ({ description, status }) =>
  httpClient.post('/register-health-insurance', {
    descricao: description,
    ativo: status,
  });

/**
 * Protocol: 0054 - Associate a healthcare to a hospital
 */
const associateHealthcareToHospital = async () => {
  return [
    {
      id: '0',
      descricao: 'NOME CONVÊNIO 1',
      ativo: 'T',
    },
    {
      id: '1',
      descricao: 'NOME CONVÊNIO 2',
      ativo: 'T',
    },
  ];
};

/**
 * Protocol: 0055 - Update healthcare
 */
const updateHealthcare = async ({ id, description }) => {
  return [
    {
      id: '0',
      descricao: 'NOME CONVÊNIO 1',
      ativo: 'T',
    },
    {
      id: '1',
      descricao: 'NOME CONVÊNIO 2',
      ativo: 'T',
    },
  ];
};

/**
 * Protocol: 0056 - List all healthcare
 */
const getAllHealthcare = async () =>
  httpClient.get('/list-all-health-insurance');

/**
 * Protocol: 0059 - delete healthcare
 */
const deleteHealthcare = async (healthCare) =>
  httpClient.delete('/delete-health-insurance',{
    data:{
      idconvenio: healthCare.idconvenio
    }
  });

export {
  createHealthcare,
  associateHealthcareToHospital,
  updateHealthcare,
  getAllHealthcare,
  deleteHealthcare
};
