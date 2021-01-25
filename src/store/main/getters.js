export const getters = {
  mensagemSucesso: (state) => state.mensagemSucesso,
  authenticated: (state) => {
    if(!state.authenticated){
      return localStorage.getItem('token_visitas') != null && localStorage.getItem('token_visitas') != "null";
    }else{
      return state.authenticated;
    }
  },
};
