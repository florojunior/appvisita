import httpClient from '@/plugins/axios';

const createUser = async (user) => {
  return httpClient.post('/visitanteexterno/', user,{
    headers: {
    "Content-Type": `multipart/form-data; boundary=${user._boundary}`,
    }
  });
};

const sendRecoverPasswordEmail = async (email) => {
  return httpClient.get('/user-password/?', {
    params: {
      email,
      method: 'reset',
    },
  });
};

const listUsersByStatus = async () => {
  return httpClient.get(`/list-all-users-in-all-status`);
};

const updateUserStatus = async (user) => {
  console.log(user);
  return httpClient.post('/companies-users', {
    idUsuario: user.idUsuario,
    idPerfil: user.idPerfil,
    ativo: user.ativo,
  });
};

const rejectUserStatus = async (user) => {
  return httpClient.post('/reject-companies-users', {
    idUsuario: user.idUsuario,
    idPerfil: user.idPerfil,
  });
};

const blockUserStatus = async (user) => {
  console.log(user);
  return httpClient.put(`/companies-users/block?idUsuario=${user.idusuario}`);
};

const unblockUserStatus = async (user) => {
  console.log(user);
  return httpClient.put(`/companies-users/unblock?idUsuario=${user.idusuario}`);
};

const authenticateUser = async (user) => {
  console.log(user);
  return httpClient.post(`/visitanteexterno/login`, user);
};

export {
  authenticateUser,
  createUser,
  listUsersByStatus,
  updateUserStatus,
  rejectUserStatus,
  blockUserStatus,
  unblockUserStatus,
  sendRecoverPasswordEmail,
};
