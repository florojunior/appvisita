import {
  createUser,
  sendRecoverPasswordEmail,
  authenticateUser
} from '@/services/api/user.js';
import {
  getAllVisitas, 
  createVisita
} from '@/services/api/visitas.js';

import router from '@/router';

export const actions = {
  setSelectedHospital(state, payload) {
    state.commit('setSelectedHospital', payload);
  },
  setHospitelUser(state, payload) {
    state.commit('setHospitelUser', payload);
  },
  setUser(state, payload) {
    state.commit('setUser', payload);
  },
  setMenu(state, payload) {
    state.commit('setMenu', payload);
  },
  setMode(state, payload) {
    state.commit('setMode', payload);
  },
  handleLogOut() {
    localStorage.setItem('token_visitas', null);
    localStorage.setItem('perfil', null);
    router.push({ name: 'login' }, {});
  },
  async requestPasswordRecovery(state, payload) {
    try {
      await sendRecoverPasswordEmail(payload.email);

      state.dispatch(
        'modal/showModal',
        {
          title: 'Verifique suas informações',
          message: 'Enviamos para você um e-mail para redefinir a sua senha.',
          buttonText: 'VOLTAR PARA LOGIN',
        },
        {
          root: true,
        }
      );
    } catch (error) {
      state.dispatch(
        'modal/showModal',
        {
          title: 'Erro ao processar a requisição!',
          message: 'Favor contatar o suporte',
          buttonText: 'VOLTAR PARA LOGIN',
        },
        {
          root: true,
        }
      );
    }
  },
  async fetchPersonRegister(state, data) {
    try {

      const formData = new FormData();
      
      formData.set("visitanteExternaDto", JSON.stringify(data.user));
      //formData.append("visitanteExternaDto", JSON.stringify(data.user));
      formData.append("file", data.foto);
      await createUser(formData);

      state.dispatch(
        'modal/showModal',
        {
          title: 'Cadastro realizado',
          message:
            'Seus dados foram submetidos e agora está pendente de aprovação pela gestão do hospital. \nAguarde e-mail de confirmação para ter acesso ao sistema.',
          buttonText: 'VOLTAR PARA O LOGIN',
        },
        {
          root: true,
        }
      );
    } catch (error) {
      state.dispatch(
        'modal/showModal',
        {
          title: 'Erro ao processar a requisição!',
          message: 'Se o problema persistir, favor contatar o suporte.',
          buttonText: 'VOLTAR PARA LOGIN',
        },
        {
          root: true,
        }
      );
    }
  },
  async fetchVisitaRegister(state, data) {
    try {

      await createVisita(data);

      state.dispatch(
        'modal/showModal',
        {
          title: 'Cadastro realizado',
          message:
            'Seus dados foram submetidos e agora está pendente de aprovação pela gestão do hospital. \nAguarde e-mail de confirmação para ter acesso ao sistema.',
          buttonText: 'VOLTAR PARA O LOGIN',
        },
        {
          root: true,
        }
      );
    } catch (error) {
      state.dispatch(
        'modal/showModal',
        {
          title: 'Erro ao processar a requisição!',
          message: 'Se o problema persistir, favor contatar o suporte.',
          buttonText: 'VOLTAR PARA LOGIN',
        },
        {
          root: true,
        }
      );
    }
  },
  async authenticate(state, user) {
    try {
      const result = await authenticateUser(user);
      localStorage.setItem('token_visitas', result.data.data.token);
      //router.push({ name: 'visitForm' }, {});
    } catch (error) {
      state.dispatch(
        'modal/showModal',
        {
          title: 'Erro ao autenticar!',
          message: 'Usuario ou senha inválidos!',
          buttonText: 'VOLTAR PARA LOGIN',
        },
        {
          root: true,
        }
      );
    }
  },
  async loadUserPreRegistrationForm(state) {
    await state.dispatch('fetchListFields');
    state.dispatch('authentication/setMode', 5, { root: true });
  },
  async fetchListFields(state) {
    try {
      const [hospitals, professionalCouncils, occupations] = await Promise.all([
        getAllHospitals(),
        getAllProfessionalCouncils(),
        getAllOccupations(),
      ]);

      state.commit('setHospitals', hospitals.data.result);
      state.commit('setProfessionalCouncils', professionalCouncils.data.result);
      state.commit('setOccupations', occupations.data.result);
    } catch (error) {
      state.dispatch(
        'modal/showModal',
        {
          title: 'Erro ao processar a requisição!',
          message: 'Se o problema persistir, favor contatar o suporte.',
          buttonText: 'VOLTAR PARA LOGIN',
        },
        {
          root: true,
        }
      );
    }
  },
  async preRegisterNewUser(state, user) {
    try {
      await createUserPreRegister(user);

      state.dispatch(
        'modal/showModal',
        {
          title: 'Cadastro realizado',
          message:
            'Seus dados foram submetidos e agora está pendente de aprovação pela gestão do hospital. \nAguarde e-mail de confirmação para ter acesso ao sistema.',
          buttonText: 'VOLTAR PARA O LOGIN',
        },
        {
          root: true,
        }
      );
    } catch (error) {
      state.dispatch(
        'modal/showModal',
        {
          title: 'Erro ao processar a requisição!',
          message: 'Se o problema persistir, favor contatar o suporte.',
          buttonText: 'VOLTAR PARA O LOGIN',
        },
        {
          root: true,
        }
      );
    } finally {
      state.dispatch('resetPreRegistration');
    }
  },
  resetPreRegistration(state) {
    state.commit('resetPreRegistration');
  },
};
