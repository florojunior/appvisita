<template>
  <v-content>
    <v-container fill-height class="full-screen pa-0 ma-0 d-flex justify-start align-start">
    <v-tabs
        v-model="tab"
        background-color="primary"
        centered
        dark
        icons-and-text
        dense
      >
      <v-tab href="#tab-1">
          Atual
          <v-icon>task_alt</v-icon>
        </v-tab>

        <v-tab href="#tab-2">
          Histórico
          <v-icon>history_toggle_off</v-icon>
        </v-tab>
      </v-tabs>

      <v-tabs-items v-model="tab" style="width: 100%; height: 100%">
        <v-tab-item
          :value="'tab-' + 1"
          style="width: 100%; height: 100%">
          <v-container>

            <v-card flat>
              <v-card-text>
                <v-card
                  elevation="2"
                  v-for="visita in getPendingList" :key="visita.id"
                  class="pa-1 mb-2"
                  :color="(visita.dt_hora_entrada != null ? 'red': '')"
                  @click="openQRCODE(visita)"
                >
                  <v-card-title class="pb-1 d-flex justify-space-between">
                    <p class="text-subtitle-1 ma-0 font-weight-bold">Destino - {{visita.destino}}</p>
                    <v-icon color="black">
                        open_with
                    </v-icon>
                  </v-card-title>
                  <v-card-text>
                    <span class="text-subtitle-2 ma-0">
                      Data de Visita - {{reformatDate(visita.dt_visita)}}
                    </span>
                  </v-card-text>
                </v-card>
              </v-card-text>
            </v-card>
          </v-container>
        </v-tab-item>
        <v-tab-item
          :value="'tab-' + 2">
         <v-container>
            <v-card flat>
              <v-card-text>
                <v-card
                  elevation="2"
                  v-for="visita in getHistoricList" :key="visita.id"
                  class="pa-1 mb-2"
                  @click="openQRCODE(visita)"
                  
                >
                  <v-card-title class="pb-1">
                    <p class="text-subtitle-1 ma-0 font-weight-bold">Destino - {{visita.destino}}</p>
                  </v-card-title>
                  <v-card-text class="d-flex flex-column">
                    <span class="text-subtitle-2 ma-0">
                      Data de Entrada - {{reformatDate(visita.dt_visita)}}
                    </span>
                    <span class="text-subtitle-2 ma-0">
                      Data de Saida - {{reformatDate(visita.dt_visita)}}
                    </span>
                  </v-card-text>
                </v-card>
              </v-card-text>
            </v-card>
          </v-container>
        </v-tab-item>
      </v-tabs-items>
    
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
      tab: null,
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
    getPendingList(){
      return this.getVisitList.filter((element)=>{
        return element.dt_hora_saida == null;
      })
    },
    getHistoricList(){
      return this.getVisitList.filter((element)=>{
        return element.dt_hora_saida != null;
      })
    }
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
