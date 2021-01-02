<template>
  <v-content>
    <v-container fill-height class="full-screen pa-0 ma-0">
      <v-form id="form-new-password" ref="form">
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
          <v-col class="pa-0 pl-4 pr-4">
            <v-text-field
              v-model="setor"
              name="setor"
              :rules="[setorRules.required]"
              :label="`${formLabels.setor}`"
              outlined
            ></v-text-field>
          </v-col>
          <v-col cols="12" class="d-flex justify-end">
            <v-btn
                type="submit"
                form="form-visit"
                color="primary"
                class="px-4 py-2 ml-2 text-button"
                :loading="buttonLoading"
                @click.prevent="nextStep(1)"
                >{{ button.textStep1 }}</v-btn
              >
          </v-col>          
        </v-row>
        <v-row class="full-screen pa-0 ma-0" v-if="step == 1">
          <p class="pl-2 text-title text-sm-title">Precisamos de uma foto do rosto</p>      
          <v-col cols="12" >
            <vue-web-cam
                ref="webcam"
                height="200"
                :device-id="deviceId"
                width="100%"
                @started="onStarted"
                @stopped="onStopped"
                @error="onError"
                @cameras="onCameras"
                @camera-change="onCameraChange"
            />
          </v-col>
          <v-col cols=12 class="pr-2 pl-2 d-flex justify-space-between">
            <v-btn
                type="submit"
                form="form-visit"
                color="red"
                class="px-4 py-2 ml-2 text-button"
                :loading="buttonLoading"
                @click.prevent="nextStep(0)"
                ><v-icon dark color="white" class="pr-2">
                  mdi-keyboard-return
                </v-icon>
                <span class="text--white white--text">Voltar</span></v-btn>
            <v-btn
                type="submit"
                form="form-visit"
                color="primary"
                class="pr-2 mr-2 text-button"
                :loading="buttonLoading"
                @click.prevent="onCapture()"
                >Capturar
                <v-icon dark color="white" class="pl-1">
                  mdi-camera
                </v-icon></v-btn>
          </v-col>
        </v-row>
        <v-row class="full-screen pa-0 ma-0" v-if="step == 2">
          <p class="pl-2 text-center text-h6 text-sm-h6">Seu rosto está nitido?</p>      
          <v-col cols="12" class="d-flex justify-center">
            <v-img
              :src="img"
              width="150"
              max-height="300"
              class="grey darken-4"
            ></v-img>
          </v-col>
          <v-col cols=12 class="pr-2 pl-2 d-flex justify-space-between">
            <v-btn
                type="submit"
                form="form-visit"
                color="red"
                class="pl-1 ml-2"
                :loading="buttonLoading"
                @click.prevent="nextStep(1)"
                ><v-icon dark color="white" class="pr-2">
                  mdi-keyboard-return
                </v-icon>
                <span class="text--white white--text">Não</span></v-btn> 
            <v-btn
                type="submit"
                form="form-visit"
                color="primary"
                class=" pr-2 mr-2 text-button"
                :loading="buttonLoading"
                @click.prevent="submitForm()"
                >{{ button.textStep3 }}
                <v-icon dark color="white" class="pl-1">
                  mdi-check
                </v-icon></v-btn>
          </v-col>
        </v-row>
      </v-form>
    </v-container>
  </v-content>
</template>

<script>
import { mask } from 'vue-the-mask';
import { mapGetters, mapActions } from 'vuex';
import { WebCam } from "vue-web-cam";
import { setorRules } from '@/validations';

export default {
  name: 'VisitForm',
  components: {
    'vue-web-cam': WebCam
  },
  directives: {
    mask,
  },
  data: vm => ({
    setorRules,
    date: new Date().toISOString().substr(0, 10),
    dateFormatted: vm.formatDate(new Date().toISOString().substr(0, 10)),
    menu1: false,
    menu2: false,
    setor: '',
    isLoading: false,
    mensagemSucesso: '',
    menuDatePicker: false,
    buttonLoading: false,
    img: null,
    camera: null,
    deviceId: null,
    devices: [],
    formLabels:{
      setor: 'Setor'
    },
    button:{
      back: 'Voltar',
      textStep1: 'Próximo',
      textStep2: 'Capturar',
      textStep3: 'SIM'
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
    },
    camera: function(id) {
        this.deviceId = id;
    },
    devices: function() {
        const [first, ...tail] = this.devices;
        if (first) {
            this.camera = first.deviceId;
            this.deviceId = first.deviceId;
        }
    }
  },
  methods: {
    ...mapActions('main', ['setAuthenticated']),
    formatDate (date) {
      if (!date) return null

      const [year, month, day] = date.split('-')
      return `${month}/${day}/${year}`
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
    },
    onCapture() {
        this.img = this.$refs.webcam.capture();
        this.step = 2;
    },
    onStarted(stream) {
        console.log("On Started Event", stream);
    },
    onStopped(stream) {
        console.log("On Stopped Event", stream);
    },
    onStop() {
        this.$refs.webcam.stop();
    },
    onStart() {
        this.$refs.webcam.start();
    },
    onError(error) {
        console.log("On Error Event", error);
    },
    onCameras(cameras) {
        this.devices = cameras;
        console.log("On Cameras Event", cameras);
    },
    onCameraChange(deviceId) {
      this.deviceId = deviceId;
      this.camera = deviceId;
      console.log("On Camera Change Event", deviceId);
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
