<template>
  <v-container class="fill-height" fluid>
    <v-row align="center" justify="center" no-gutters>
      <v-col cols="12" xs="10" sm="10" md="10" lg="8" xl="8">
        <v-row align="center" justify="center">
          <Logo />
        </v-row>
        <v-card flat class="mt-16">
          <v-card-title class="text-h5 text-sm-h4">{{
            card.title
          }}</v-card-title>
          <v-card-subtitle class="text-body-1">{{
            card.subtitle
          }}</v-card-subtitle>
          <v-spacer></v-spacer>
          <v-card-text class="pb-0">
            <v-form id="form-verify-user-register" ref="form">
              <v-text-field
                v-model="cpf"
                v-mask="'###.###.###.##'"
                outlined
                dense
                name="cpf"
                :label="`${formLabels.cpf}`"
                :rules="[cpfRules.required, cpfRules.validCpf]"
              ></v-text-field>
              <v-text-field
                v-model="name"
                outlined
                dense
                name="nome"
                :rules="[nameRules.required]"
                :label="`${formLabels.name}`"
              ></v-text-field>
              <v-text-field
                  v-model="email"
                  name="email"
                  dense
                  :rules="[emailRules.required, emailRules.validEmail]"
                  :label="`${formLabels.email}`"
                  outlined
                ></v-text-field>
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
        email: 'Email'
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
      cpfRules,
      emailRules,
      nameRules
    };
  },
  computed: {
    unmaskedCpf() {
      return unmaskText(this.cpf);
    },
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
          await this.fetchPersonRegister(this.unmaskedCpf);
        } catch (error) {
          this.resetRecaptcha();
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