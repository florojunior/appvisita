<template>
  <v-container class="fill-height" fluid>
    <v-row align="center" justify="center" no-gutters>
      <v-col cols="12" xs="10" sm="10" md="10" lg="8" xl="8">
        <v-row align="center" justify="center">
          <Logo />
        </v-row>
        <v-card flat class="mt-8">
          <v-card-title class="text-h5 text-sm-h4">{{
            card.title
          }}</v-card-title>
          <v-card-subtitle class="text-body-1">{{
            card.subtitle
          }}</v-card-subtitle>
          <v-spacer></v-spacer>
          <v-card-text class="pb-0">
            <v-form id="form-verify-user-register" ref="form">
              <v-row class="pa-0 ma-0">
                <v-col cols=12 class="pa-0 ma-0">
                  <v-text-field
                    v-model="name"
                    outlined
                    dense
                    name="nome"
                    :rules="[nameRules.required]"
                    :label="`${formLabels.name}`"
                  ></v-text-field>
                </v-col>
                <v-col class="pa-0 ma-0" cols=6>
                  <v-text-field
                    v-model="cpf"
                    v-mask="'###.###.###.##'"
                    outlined
                    dense
                    name="cpf"
                    :label="`${formLabels.cpf}`"
                    :rules="[cpfRules.required, cpfRules.validCpf]"
                  ></v-text-field>
                </v-col>
                <v-col class="pa-0 ma-0 pl-2" cols=6>
                  <v-text-field
                    v-model="oab"
                    outlined
                    dense
                    name="oab"
                    :label="`${formLabels.oab}`"
                  ></v-text-field>
                </v-col>
                <v-col cols=12 class="pa-0 ma-0">
                  <v-text-field
                    v-model="email"
                    name="email"
                    dense
                    :rules="[emailRules.required, emailRules.validEmail]"
                    :label="`${formLabels.email}`"
                    outlined
                  ></v-text-field>
                </v-col>
                <v-col cols=6 class="pa-0 ma-0">
                  <v-text-field
                    v-model="rg"
                    outlined
                    dense
                    name="rg"
                    :label="`${formLabels.rg}`"
                  ></v-text-field>
                </v-col>
                <v-col cols=6 class="pa-0 ma-0 pl-2">
                  <template>
                    <v-file-input
                      dense
                      append-icon="mdi-camera"
                      :prepend-icon="null"
                      v-model="foto"
                      outlined
                      accept="image/*"
                      :label="`${formLabels.foto}`"
                    ></v-file-input>
                  </template>
                </v-col>
                  <v-text-field
                    v-model="password"
                    name="password"
                    dense
                    password
                    type="password"
                    :rules="[passwordRules.required, passwordRules.validEmail]"
                    :label="`${formLabels.password}`"
                    outlined
                  ></v-text-field>
                </v-row>
            </v-form>
          </v-card-text>
          <v-card-actions class="d-flex justify-center pl-4 pr-4">
            <v-btn
              type="submit"
              style="width: 100%"
              form="form-verify-user-register"
              depressed
              color="primary"
              class="ml-2 text-button"
              :loading="buttonLoading"
              @click.prevent="submitForm()"
              >{{ button.text }}</v-btn
            >
          </v-card-actions>

          <v-card-text
            class="text-body-1 d-flex flex-column justify-center align-center flex-md-row align-md-center justify-md-start"
          >
            <span>{{ bottomQuestion.question }}&nbsp;</span>
            <v-btn
              depressed
              text
              class="primary--text font-weight-bold"
              @click="setMode(2)"
            >
              <span class="text-lowercase">{{ bottomQuestion.link }}</span>
            </v-btn>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapActions } from 'vuex';

import { 
  cpfRules,
  emailRules,
  nameRules,
  passwordRules
  } from '@/validations';
import recaptcha from '@/mixins/recaptcha.js';
import unmaskText from '@/utils/unmaskText';

import Logo from '@/components/template/Logo.vue';

export default {
  components: {
    Logo,
  },
  mixins: [recaptcha],
  data() {
    return {
      card: {
        title: 'Cadastro',
        subtitle: 'Vamos começar com seu cadastro.',
      },
      formLabels: {
        cpf: 'CPF',
        name: 'Nome',
        email: 'Email',
        password: 'Senha',
        foto: 'Escolha uma foto',
        rg: "RG",
        oab: "OAB"
      },
      button: {
        text: 'Continuar',
      },
      buttonLoading: false,
      bottomQuestion: {
        question: 'Não é isso que queria fazer?',
        link: 'Voltar para o login',
      },
      cpf: '',
      name:'',
      email:'',
      password: '',
      foto: null,
      cpfRules,
      emailRules,
      nameRules,
      passwordRules
    };
  },
  computed: {
    unmaskedCpf() {
      return unmaskText(this.cpf);
    },
    userJSON(){
      return {
        cpf: this.unmaskedCpf,
        rg: this.rg,
        oab: this.oab,
        nome: this.name, 
        email: this.email, 
        senha: this.password}
    }
  },
  methods: {
    ...mapActions('authentication', [
      'setMode',
      'fetchPersonRegister',
    ]),
    async submitForm() {
      if (this.$refs.form.validate()) {
        this.startButtonLoading();
        try {
          await this.fetchPersonRegister( {user :this.userJSON, foto: this.foto});
        } catch (error) {
        }
        this.stopButtonLoading();
      }
    },
    startButtonLoading() {
      this.buttonLoading = true;
    },
    stopButtonLoading() {
      this.buttonLoading = false;
    },
  },
};
</script>

<style scoped>
.text-lowercase::first-letter {
  text-transform: uppercase;
}
</style>
