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
  modalQRCode:{
    buttonText: 'Fechar',
    show: false,
  },
  modalConfirmVisit:{
    buttonText: 'Fechar',
    show: true,
  },
};

export const modal = {
  namespaced,
  state,
  getters,
  actions,
  mutations,
};
