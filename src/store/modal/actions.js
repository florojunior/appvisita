export const actions = {
  showModal(state, payload) {
    state.commit('SHOW_MODAL', payload);
  },
  closeModal(state) {
    state.commit('CLOSE_MODAL');
  },
  closeModalQrcode(state) {
    state.commit('setModalQRCode', {
      show: false
    });
  },
  openModalQrcode(state) {
    state.commit('setModalQRCode', {
      show: true,
      modalQRCode: 'Fechar'
    });
  },
  closeModalConfirmVisit(state) {
    state.commit('setModalConfirmVisit', {
      show: false
    });
  },
  openModalQrcode(state) {
    state.commit('setModalConfirmVisit', {
      show: true,
      buttonText: 'Fechar'
    });
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
  editHealthcare(state, payload) {
    state.commit('setHealthcare', payload);
  },
  setModalQrcode(state, payload) {
    state.commit('setModalQRCode', payload);
  },
};
