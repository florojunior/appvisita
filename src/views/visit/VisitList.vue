<template>
  <v-content>
    <v-container fill-height class="full-screen pa-0 ma-0">
      <v-row class="full-screen pa-0 ma-0">
        <v-col cols="12" xs="12" sm="12" md="8">
          
        </v-col>
      </v-row>
    </v-container>
  </v-content>
</template>

<script>

import { mask } from 'vue-the-mask';
import { mapGetters, mapActions } from 'vuex';
import ForgotPassword from '@/views/authentication/ForgotPassword';

export default {
  name: 'Login',
  components: {
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
          this.isLoading = false;
          localStorage.setItem('token_visitas', res.data.data.token);
          localStorage.setItem(
            'usuario_blood',
            JSON.stringify(res.data.data.payload)
          );
          this.$router.push({ name: 'listarUnidade' }, {});
          this.setAutenticado(true);
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
