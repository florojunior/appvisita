<template>
  <v-dialog v-model="getModalQRCode.show" persistent max-width="360px">
    <v-card>
      <v-card-title class="d-flex justify-end">
        <v-btn icon color="primary" text @click="handleClose()">
          <v-icon
            large
            color="red darken-2"
          >
            mdi-close
          </v-icon>
        </v-btn>
        </v-card-title>

      <v-card-text class="text-body-2 d-flex justify-center">
        <VueQrcode :value="qrcode" :width="widthQRCode"/>
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
    qrcode: "1",
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
