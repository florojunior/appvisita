import Vue from 'vue';
import axios from 'axios';
import router from '../router';

const httpClient = axios.create({
  baseURL: process.env.VUE_APP_API_BASE_URL,
});

Vue.use({
  install(Vue) {
    Vue.prototype.$http = httpClient;
  },
});

httpClient.interceptors.request.use(
  function (config) {
    config.headers['Authorization'] = `Bearer ${localStorage.getItem('token_blood')}`;

    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

httpClient.interceptors.response.use(
  (config) => {
    //console.log('axios');
    //this.$toast('Sucesso');
    if (config.request.status === 200) {
      //alert('Sucesso');
    }
    return config;
  },
  (error) => {
    if (error.request.status === 401) {
      localStorage.setItem('token_blood', null);
      router.push({ name: 'login' }, {});
    }
    if (error.request.status === 500) {
      alert('Erro Geral');
    }

    if (error.request.status === 400) {
      localStorage.setItem('token_blood', null);
      router.push({ name: 'login' }, {});
    }
    return Promise.reject(error);
  }
);

Vue.use(require('vue-moment'));

export default httpClient;
