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
            <v-form id="form-authenticate" ref="form">
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
                v-model="password"
                name="password"
                :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                :rules="[passwordRules.required]"
                :type="showPassword ? 'text' : 'password'"
                :label="`${formLabels.password}`"
                outlined
                @click:append="showPassword = !showPassword"
              ></v-text-field>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-row>
              <v-col cols=12 xl=6 lg=6 md=12 sm=12 class="d-flex justify-space-between">
                <v-btn
                  form="form-authenticate"
                  depressed
                  color="primary"
                  class="px-4 py-2 ml-2 text-button"
                  :loading="buttonLoading"
                  @click="submitForm()"
                  ><span class="text-lowercase font-weight-regular">{{
                    button.text
                  }}</span></v-btn>
                <v-btn
                  form="form-authenticate"
                  text
                  color="primary"
                  class="px-4 py-2 ml-2"
                  :disabled="buttonLoading"
                  @click="setMode(1)"
                  ><span class="text-lowercase font-weight-regular">{{
                    button.textForgotPassword
                  }}</span></v-btn>
              </v-col>
            </v-row>
          </v-card-actions>

          <v-card-text
            class="text-body-1 d-flex flex-column justify-center align-center flex-md-row align-md-center justify-md-start"
          >
            <span>{{ bottomQuestion.question }}&nbsp;</span>
            <v-btn
              form="form-authenticate"
              depressed
              text
              color="primary"
              class="px-4 py-2 ml-2 text-button"
              :disabled="buttonLoading"
              @click="setMode(4)"
              ><span class="text-lowercase">{{ bottomQuestion.text }}</span>
            </v-btn>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

import { cpfRules, passwordRules } from '@/validations';
import unmaskText from '@/utils/unmaskText';

import Logo from '@/components/template/Logo.vue';

export default {
  components: {
    Logo,
  },
  data() {
    return {
      card: {
        title: 'Login',
        subtitle: 'Acesse sua conta com e-mail e senha.',
      },
      formLabels: {
        cpf: 'CPF',
        password: 'Senha',
      },
      button: {
        text: 'ENTRAR',
        textForgotPassword: 'Esqueci a Senha',
      },
      buttonLoading: false,
      bottomQuestion: {
        question: 'Quero me cadastrar no Visitas!',
        text: 'Criar uma conta',
      },
      email: '',
      cpf: '',
      passwordRules,
      cpfRules,
      showPassword: false,
    };
  },
  computed: {
    ...mapGetters('main', ['authenticated']),
    unmaskedCpf() {
      return unmaskText(this.cpf);
    },
  },
  methods: {
    ...mapActions('authentication', [
      'authenticate',
      'setIsForgotPassword',
      'setMode',
      'setSelectedHospital',
      'setHospitelUser',
    ]),
    ...mapActions('modal', ['showModal']),
    // "Mock" substituir pelo metodo para envio de email
    async submitForm() {
      if (this.$refs.form.validate()) {
        try {
          this.buttonLoading = true;
          await this.authenticate({
            cpf: this.unmaskedCpf,
            senha: this.password,
          });
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
  },
};
</script>

<style scoped>
.text-lowercase::first-letter {
  text-transform: uppercase;
}
</style>

