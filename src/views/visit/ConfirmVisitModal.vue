<template>
  <v-dialog
      persistent
      max-width="500"
      max-height="500"
      v-model="getModalConfirmVisit.show"
    >
      <v-card>
        <v-card-title class="headline d-flex justify-center" style="background-color: #2E7D32">
          <p class="mb-0 text--center white--text text-h6">Confirmação de visita</p> 
        </v-card-title>
        <v-card-text class="d-flex flex-column mt-4">
            <div>
              <span class="font-weight-bold text-xl-subtitle-1 text-lg-subtitle-1 text-md-subtitle-1">Data da Visita: </span> <span class="text-xl-subtitle-1 text-lg-subtitle-1 text-md-subtitle-1">{{reformatDate(getVisitaSelected.dt_visita)}}</span>
            </div>
            <div>
              <span class="font-weight-bold text-xl-subtitle-1 text-lg-subtitle-1 text-md-subtitle-1">CPF: </span> <span class="text-xl-subtitle-1 text-lg-subtitle-1 text-md-subtitle-1">{{getVisitaSelected.cpf}}</span>
            </div>
            <div>
              <span class="font-weight-bold text-xl-subtitle-1 text-lg-subtitle-1 text-md-subtitle-1">Nome: </span> <span class="text-xl-subtitle-1 text-lg-subtitle-1 text-md-subtitle-1">{{getVisitaSelected.nome}}</span>
            </div>
            <v-img :src="url+getVisitaSelected.foto"></v-img>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="red darken-1"
            text
            @click="closeModalConfirmVisit()"
          >
            Cancelar
          </v-btn>
          <v-btn
            color="green darken-1"
            text
            @click="fetchVisitaUpdate({ id: getVisitaSelected.id_visita, status: 'DONE'});closeModalConfirmVisit();"
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
        ...mapGetters('authentication', ['getVisitaSelected']),
        url(){
          return process.env.VUE_APP_API_BASE_URL_FILES
        }
    },
    methods:{
        ...mapActions('modal', ['closeModalConfirmVisit']),
        ...mapActions('authentication', ['fetchVisitaRegister', 'fetchVisitaUpdate']),
        reformatDate(dateStr)
        {
            if(dateStr){
                var dArr = dateStr.split("-");  // ex input "2010-01-18"
                return dArr[2]+ "/" +dArr[1]+ "/" +dArr[0].substring(2); //ex out: "18/01/10"
            }
        }
    }
}
</script>

<style>

</style>