import Vue from 'vue';
import Vuex from 'vuex';

import { main } from './main/main';
import { authentication } from './authentication/authentication';
import { snackbar } from './snackbar/snackbar';
import { modal } from './modal/modal';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    main,
    authentication,
    snackbar,
    modal,
  },
});
