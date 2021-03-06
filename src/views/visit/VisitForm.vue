<template>
  <v-content>
    <v-container fill-height class="full-screen pa-0 ma-0">
      <v-form id="form-new-password" ref="form" class="pa-4">
        <v-card color="#fafafa">
          <v-card-text>
            <v-row class="full-screen pa-0 ma-0" v-if="step == 0">
              <v-col cols="12">
                <p class="text-title text-sm-title pl-2">Registrar Nova Visita</p> 
              </v-col>
              <v-col cols="12" class="pa-0 pl-4 pr-4">
              <v-menu
                  ref="menuDatePicker"
                  v-model="menuDatePicker"
                  :close-on-content-click="false"
                  transition="scale-transition"
                  offset-y
                  max-width="290px"
                  min-width="290px" 
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      v-model="dateFormatted"
                      label="Dia da visita"
                      outlined
                      readonly
                      dense
                      v-bind="attrs"
                      @blur="date = parseDate(dateFormatted)"
                      v-on="on"
                    >
                    <v-icon>mdi-calendar</v-icon>
                    </v-text-field>
                  </template>
                  <v-date-picker
                    v-model="date"
                    no-title
                    @input="menuDatePicker = false"
                  ></v-date-picker>
                </v-menu>
              </v-col>
              <v-col class="pa-0 pl-4 pr-4" cols=12>
                <v-select
                  :items="listDetino"
                  item-text="name"
                  dense
                  v-model="unidade"
                  item-value="id"
                  :label="`${formLabels.unidade}`"
                  outlined
                ></v-select>
              </v-col>
              <v-col class="pa-0 pl-4 pr-4" cols=12>
                <v-text-field
                  v-model="setor"
                  name="setor"
                  dense
                  :rules="[setorRules.required]"
                  :label="`${formLabels.setor}`"
                  outlined
                ></v-text-field>
              </v-col>
              <v-col class="pa-0 pl-4 pr-4" cols=12>
                <v-text-field
                  v-model="processo"
                  name="processov"
                  dense
                  :rules="[setorRules.required]"
                  :label="`${formLabels.processo}`"
                  outlined
                ></v-text-field>
              </v-col>
              <v-col cols="12" class="d-flex justify-end">
                <v-btn
                    style="width: 100%"
                    type="submit"
                    form="form-visit"
                    color="primary"
                    class="px-4 py-2 ml-2 text-button"
                    :loading="buttonLoading"
                    @click.prevent="submitForm()"
                    >{{ button.textStep1 }}</v-btn
                  >
              </v-col>          
            </v-row>
          </v-card-text>
        </v-card>
      </v-form>
    </v-container>
  </v-content>
</template>

<script>
import { mask } from 'vue-the-mask';
import { mapGetters, mapActions } from 'vuex';
import { setorRules } from '@/validations';
import router from '@/router';

export default {
  name: 'VisitForm',
  components: {
  },
  directives: {
    mask,
  },
  data: vm => ({
    listDetino:[
      {
        name: "Arnoldo Peres",
        id: 1,
      },{
        name: "Anexo",
        id: 2
      }

    ],
    setorRules,
    date: new Date().toISOString().substr(0, 10),
    dateFormatted: vm.formatDate(new Date().toISOString().substr(0, 10)),
    menu1: false,
    menu2: false,
    setor: '',
    processo: '',
    unidade: null,
    isLoading: false,
    mensagemSucesso: '',
    menuDatePicker: false,
    buttonLoading: false,
    formLabels:{
      setor: 'Setor Destino',
      unidade: 'Escolha uma unidade',
      processo: 'Numero do Processo'
    },
    button:{
      back: 'Voltar',
      textStep1: 'Agendar'
    },
    step: 0 // 0 - Passo inicial, 1 - capturarFoto
  }),
  computed: {
    ...mapGetters('authentication', ['mode']),
    ...mapGetters('main', ['authenticated']),
    device: ()=> {
        return this.devices.find(n => n.deviceId === this.deviceId);
    }
  },
  created() {
  },
  watch: {
    date (val) {
      this.dateFormatted = this.formatDate(this.date)
    }
  },
  methods: {
    ...mapActions('authentication', ['fetchVisitaRegister']),
    async submitForm() {
      if (this.$refs.form.validate()) {
        try {
          this.buttonLoading = true;
          this.startButtonLoading();
          try {
            await this.fetchVisitaRegister({
              dt_visita: this.date,
              destino: this.setor,
              id_unidade: this.unidade,
              num_processo: this.processo
            });
            router.push({ name: 'visitList' }, {});
          } catch (error) {
          }
          this.stopButtonLoading();
        } catch (error) {
          this.showModal({
            title: this.modal.error.title,
            message: this.modal.error.message,
            button_text: this.modal.error.button_text,
          });
        } finally {
          this.buttonLoading = false;
        }
      }
    },
    startButtonLoading() {
      this.buttonLoading = true;
    },
    stopButtonLoading() {
      this.buttonLoading = false;
    },
    formatDate (date) {
      if (!date) return null

      const [year, month, day] = date.split('-')
      return `${day}/${month}/${year}`
    },
    nextStep(step){
      if(step == 0){
        location.reload();
      } else if(step ==1){
      }
      this.step = step;
    },
    parseDate (date) {
      if (!date) return null

      const [month, day, year] = date.split('/')
      return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`
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
