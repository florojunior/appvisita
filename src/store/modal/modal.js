import { actions } from './actions';
import { getters } from './getters';
import { mutations } from './mutations';

const namespaced = true;

const state = {
  modal: {
    title: '',
    message: '',
    buttonText: '',
    show: false,
  },
  modalAcceptUsers: {
    title: '',
    message: '',
    buttonText: '',
    show: false,
  },
  modalDeclineUsers: {
    title: '',
    message: '',
    buttonText: '',
    show: false,
  },
  modalBlockUser: {
    show: true,
  },
  modalUnblockUser: {
    show: true,
  }
};

export const modal = {
  namespaced,
  state,
  getters,
  actions,
  mutations,
};
