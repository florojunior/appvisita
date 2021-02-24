export const getters = {
  mensagemSucesso: (state) => state.mensagemSucesso,
  authenticated: (state) => {
    if(!state.authenticated){
      console.log('entrou1')
      return localStorage.getItem('token_visitas') != null && localStorage.getItem('token_visitas') != "null";
    }else{
      console.log('entrou2')
      return state.authenticated;
    }
  },
};
