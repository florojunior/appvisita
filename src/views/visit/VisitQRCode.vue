<template>
  <v-dialog v-model="getModalQRCode.show" persistent max-width="360px">
    <v-card>
      <v-card-title class="d-flex justify-end pa-0" style="background-color: var(--v-primary-lighten1) !important;">
        <v-btn icon color="primary" text @click="handleClose()">
          <v-icon
            large
            small
            color="white darken-2"
          >
            mdi-close
          </v-icon>
        </v-btn>
        </v-card-title>

      <v-card-text class="text-body-2 d-flex flex-column align-center justify-center mt-4 pb-0">
        <div class="pb-4"><span class="text-subtitle-1 font-weight-medium pb-4">{{userValue.nome}}</span></div>
        <div><v-img max-height="150" max-width="150" :src="url+userValue.photoPath"></v-img> </div>
        <VueQrcode :value="qrcodeValue" :width="widthQRCode"/>
      </v-card-text>

      <v-card-actions class="d-flex justify-center pb-4">
        <v-btn color="primary" @click="deleteVisita()">Cancelar Visita</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>

import { mapGetters, mapActions } from 'vuex';
import VueQrcode from 'vue-qrcode'

export default {
  props:{
    visitaSelected: Object
  },
  data: () => ({
    widthQRCode: 200
  }),
  components: {
    VueQrcode,
  },
  created(){
    var visitaId =  this.visitaSelected.id;
    this.qrcode = visitaId.toString();
  },
  computed: {
    ...mapGetters('modal', ['getModalQRCode']),
    qrcodeValue(){
      return new String(this.visitaSelected.id).toString()
    },
    userValue(){
      return JSON.parse(localStorage.getItem("user_visitas"))
    },
    url(){
      return process.env.VUE_APP_API_BASE_URL_FILES
    }
  },
  methods: {
    ...mapActions('authentication', ['fetchVisitaDelete']),
    ...mapActions('modal', ['closeModalQrcode']),
    handleClose() {
      this.closeModalQrcode();
    },
    deleteVisita(){
      this.fetchVisitaDelete(this.visitaSelected.id);
    }
  },
};
</script>

<style>
</style>
