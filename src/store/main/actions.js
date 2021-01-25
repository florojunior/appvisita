import router from '@/router';

export const actions = {
  setMensagemSucesso(state, mensagem, error) {
    state.commit('setMensagemSucesso', {
      mensagem,
      error,
    });
  },
  setAuthenticated(state, authenticated) {
    state.commit('setAuthenticated', authenticated);
  },
  handleLogOut(state) {
    localStorage.setItem('token_visitas', null);
    state.commit('setAuthenticated', false);
    router.push({ name: 'login' }, {});
  },
};
