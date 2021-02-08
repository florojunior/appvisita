<template>
  <v-dialog
      persistent
      max-width="290"
      v-model="getModalConfirmVisit.show"
    >
      <v-card>
        <v-card-title class="headline">
          Portal de confirmação de visita
        </v-card-title>
        <v-card-text>
            <p>Data da Visita: {{}}</p>
            <v-img></v-img>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="red darken-1"
            text
            @click="dialog = false"
          >
            Cancelar
          </v-btn>
          <v-btn
            color="green darken-1"
            text
            @click="dialog = false"
          >
            Confirmar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
</template>

<script>

import { mapGetters, mapActions } from 'vuex';

export default {
    data: function () {
        return {
            show: true
        };
    },
    computed:{
        ...mapGetters('modal', ['getModalConfirmVisit']),
    },
    methods:{
        ...mapActions('modal', ['closeModalConfirmVisit']),
    }
}
</script>

<style>

</style>