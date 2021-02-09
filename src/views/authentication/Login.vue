<template>
  <v-content>
    <v-container fill-height class="full-screen pa-0 ma-0">
      <v-row class="full-screen pa-0 ma-0">
        <v-col class="pa-0 ma-0"><AuthSidebar cols="4" /></v-col>
        <v-col cols="12" xs="12" sm="12" md="8">
          <ForgotPassword v-if="mode == 1" />
          <Authenticate v-if="mode == 2" />
          <NewPassword v-if="mode == 3" />
          <VerifyUserRegistration v-if="mode == 4" />
          <UserPreRegistration v-if="mode == 5" />
        </v-col>
      </v-row>
    </v-container>
  </v-content>
</template>

<script>
import { mask } from 'vue-the-mask';
import { mapGetters, mapActions } from 'vuex';

import ForgotPassword from '@/views/authentication/ForgotPassword';
import Authenticate from '@/views/authentication/Authenticate';
import NewPassword from '@/views/authentication/NewPassword';
import AuthSidebar from '@/components/template/AuthSidebar.vue';
import VerifyUserRegistration from '@/views/authentication/VerifyUserRegistration.vue';
import UserPreRegistration from '@/views/authentication/UserPreRegistration.vue';

export default {
  name: 'Login',
  components: {
    AuthSidebar,
    Authenticate,
    ForgotPassword,
    NewPassword,
    VerifyUserRegistration,
    UserPreRegistration,
  },
  directives: {
    mask,
  },
  data: function () {
    return {
      shoSignup: false,
      usuario: {},
      lembrar: true,
      cpfEsqueciMinhaSenha: '',
      dialogEsqueciMinhaSenha: false,
      cpfCadastrarMinhaSenha: '',
      dialogCadastrarMinhaSenha: false,
      maskCpf: '###.###.###-##',
      showAlert: false,
      isLoading: false,
      mensagemSucesso: '',
    };
  },
  computed: {
    ...mapGetters('authentication', ['mode']),
    ...mapGetters('main', ['authenticated']),
  },
  created() {
    localStorage.setItem('token_visitas', null);
    this.setAuthenticated(false);
    this.loadModeNewPassword();
  },
  methods: {
    ...mapActions('main', ['setAuthenticated']),
    ...mapActions('authentication', ['setMode']),
    loadModeNewPassword() {
      if (this.$route.query.token) {
        this.setMode(3);
      }
    },
    singin(user) {
      this.isLoading = true;
      this.$http.post('/authenticate/operador', user).then(
        (res) => {
          console.log(res);
          this.isLoading = false;
          localStorage.setItem('token_visitas', res.data.data.token);
          this.$router.push({ name: 'visitForm' }, {});
          this.setAuthenticated(true);
        },
        () => {
          this.isLoading = false;
          alert('Usuário ou senha inválidos!');
        }
      );
    },
  },
};
</script>

<style scoped>
.full-screen {
  width: 100%;
  height: 100%;
  max-width: 100% !important;
}

.button_login {
  width: 100%;
  color: #232323 !important;
}

.theme--light.v-input input,
.theme--light.v-input textarea {
  color: white;
}
</style>
