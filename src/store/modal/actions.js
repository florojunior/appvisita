export const actions = {
  showModal(state, payload) {
    state.commit('SHOW_MODAL', payload);
  },
  closeModal(state) {
    state.commit('CLOSE_MODAL');
  },
  setModalAcceptUsers(state, payload) {
    state.commit('setModalAcceptUsers', payload);
  },
  setModalDeclineUsers(state, payload) {
    state.commit('setModalDeclineUsers', payload);
  },
  setModalBlockUserModal(state, payload) {
    state.commit('setBlockUserModal', payload);
  },
  setModalUnblockUserModal(state, payload) {
    state.commit('setUnblockUserModal', payload);
  },
  addHealthcare(state) {
    return;
  },
  editHealthcare(state, payload) {
    state.commit('setHealthcare', payload);
  },
  deleteHealthcare(state, payload) {},
};
