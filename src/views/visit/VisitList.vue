<template>
  <v-content>
    <v-container fill-height class="full-screen pa-0 ma-0 d-flex justify-center">
      <p v-if="getVisitList.length > 0" class="text-title text-sm-title font-weight-medium pa-4 text-center">Agendamentos Pendentes</p> 
      <v-row class="full-screen pa-2 ma-0">
        
        <v-col cols="12" xs="12" sm="12" md="8" class="pt-0 pb-0" v-if="getVisitList.length > 0" >
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
                Data de Visita - {{reformatDate(visita.dt_visita)}}
              </span>
              
            </v-card-text>
          </v-card>
        </v-col>
        <v-col cols="12" xs="12" sm="12" md="8"  style="margin-top: 50%" class="pt-0 pb-0" v-if="getVisitList.length == 0" >
          <p class="text-subtitle-2 ma-0 text-center">
            Não existem visitas agendadas
          </p>
           <v-card
            elevation="2"
            class="pa-1 mb-2 mt-10"
            @click="newVisitaOpen()"
          >
            <v-card-text>
              <p class="text-subtitle-2 ma-0 text-center">
                Agendar nova visita 
              </p>  
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
import router from '@/router';

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
    },
    newVisitaOpen(){
      router.push({ name: 'visitForm' }, {});
    },
    reformatDate(dateStr)
        {
            if(dateStr){
                var dArr = dateStr.split("-");  // ex input "2010-01-18"
                return dArr[2]+ "/" +dArr[1]+ "/" +dArr[0].substring(2); //ex out: "18/01/10"
            }
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
