<template>
  <v-content>
    <v-container fill-height class="full-screen pa-0 ma-0">
      <v-row class="full-screen pa-0 ma-0">
        <v-col cols="12">
          <p class="text-title text-sm-title pl-2 text-center font-weight-medium">Minhas Próximas Visitas</p> 
        </v-col>
        <v-col cols="12" xs="12" sm="12" md="8" class="pt-0 pb-0" >
          <v-card
            elevation="2"
            v-for="visita in getVisitList" :key="visita.id"
            class="pa-1 mb-2"
            @click="openQRCODE(visita)"
          >
            <v-card-title class="pb-1">
              <p class="text-subtitle-1 ma-0 font-weight-bold">Destino - {{visita.destino}}</p>
            </v-card-title>
            <v-card-text>
              <span class="text-subtitle-2 ma-0">
                Destino - {{visita.dt_visita}}
              </span>
              
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
    <VisitQRCode :visitaSelected="visitaSelected"/>
  </v-content>
</template>

<script>

import { mask } from 'vue-the-mask';
import { mapGetters, mapActions } from 'vuex';
import VisitQRCode from '../visit/VisitQRCode';

export default {
  name: 'Login',
  components: {
    VisitQRCode
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
      visitaSelected: {}
    };
  },
  computed: {
    ...mapGetters('authentication', ['mode','getVisitList']),
    ...mapGetters('main', ['authenticated']),
  },
  created() {
    this.fetchVisitaList();
  },
  methods: {
    ...mapActions('authentication', ['fetchVisitaRegister', 'fetchVisitaList']),
    ...mapActions('modal', ['openModalQrcode']),
    
    openQRCODE(visita){
      this.visitaSelected = visita;
      this.openModalQrcode();
    }
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
