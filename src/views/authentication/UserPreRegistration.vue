<template>
  <v-container class="fill-height" fluid>
    <v-row align="center" justify="center" no-gutters>
      <v-col cols="12" xs="10" sm="10" md="10" lg="8" xl="8">
        <v-row align="center" justify="center">
          <Logo />
        </v-row>
        <v-card flat class="mt-16">
          <v-card-title class="text-h4 mb-2">{{ card.title }}</v-card-title>
          <v-card-subtitle class="text-body-1">{{
            card.subtitle
          }}</v-card-subtitle>
          <v-card-text>
            <v-stepper v-model="currentStep" class="elevation-0">
              <v-stepper-header class="elevation-0">
                <v-stepper-step step="1" :complete="currentStep > 1">
                  Dados pessoais
                </v-stepper-step>

                <v-divider></v-divider>

                <v-stepper-step step="2" :complete="currentStep > 2">
                  Profissional
                </v-stepper-step>

                <v-divider></v-divider>

                <v-stepper-step step="3"> Login </v-stepper-step>
              </v-stepper-header>

              <v-stepper-items>
                <v-stepper-content step="1" class="pt-0">
                  <v-card flat>
                    <v-card-text class="pb-0">
                      <v-form id="formStep1" ref="formStep1">
                        <v-text-field
                          v-model="user.name"
                          outlined
                          name="name"
                          :label="`${formLabels.name}`"
                          :rules="[nameRules.required]"
                        ></v-text-field>

                        <label for="radioGender" class="v-label">
                          {{ radioGroupGender.title }}
                          <v-radio-group
                            id="radioGender"
                            v-model="user.gender"
                            :rules="[radioGroupRules.required]"
                            class="mb-2 mt-0"
                            row
                          >
                            <v-radio
                              v-for="gender in radioGroupGender.genders"
                              :key="gender.type"
                              class="mt-2"
                              :label="gender.type"
                              :value="gender.value"
                            ></v-radio>
                          </v-radio-group>
                        </label>

                        <v-text-field
                          v-model="user.telephone"
                          v-mask="'(##)#####-####'"
                          outlined
                          name="telephone"
                          :label="`${formLabels.telephone}`"
                          :rules="[telephoneRules.required]"
                        ></v-text-field>

                        <v-text-field
                          v-model="user.cpf"
                          v-mask="'###.###.###.##'"
                          outlined
                          disabled
                          name="cpf"
                          :label="`${formLabels.cpf}`"
                          :rules="[cpfRules.required, cpfRules.validCpf]"
                        ></v-text-field>

                        <v-text-field
                          v-model="user.birthdate"
                          v-mask="'##/##/####'"
                          outlined
                          name="birthdate"
                          :label="`${formLabels.birthdate}`"
                          :rules="[birthdateRules.required]"
                        ></v-text-field>
                      </v-form>
                    </v-card-text>
                    <v-card-actions>
                      <v-btn
                        type="submit"
                        form="formStep1"
                        depressed
                        color="primary"
                        class="px-10 py-2 ml-2 text-button"
                        @click.prevent="validateFormStep1ThenGoNext()"
                      >
                        Prosseguir
                      </v-btn>
                    </v-card-actions>
                  </v-card>
                </v-stepper-content>

                <v-stepper-content step="2" class="pt-0">
                  <v-card flat>
                    <v-card-text class="pb-0">
                      <v-form id="formStep2" ref="formStep2">
                        <v-autocomplete
                          v-model="user.professionalOccupationId"
                          :items="professionalOccupations"
                          :item-text="'descricao'"
                          :item-value="'idocupacao'"
                          outlined
                          :label="`${formLabels.professionalOccupationId}`"
                          :rules="[professionalOccupationIdRules.required]"
                          name="professionalOccupationId"
                        ></v-autocomplete>

                        <v-autocomplete
                          v-model="user.professionalCouncil"
                          :items="professionalCouncils"
                          :item-text="'descricao'"
                          :item-value="'idconselho_profissional'"
                          return-object
                          outlined
                          :label="`${formLabels.professionalCouncil}`"
                          :rules="[professionalCouncilRules.required]"
                          name="professionalCouncil"
                        ></v-autocomplete>

                        <v-text-field
                          v-model="user.professionalCouncilNumber"
                          outlined
                          name="professionalCouncilNumber"
                          :label="`${formLabels.professionalCouncilNumber}`"
                          :rules="[professionalCouncilNumberRules.required]"
                        ></v-text-field>

                        <v-text-field
                          v-model="user.hospitalRegistration"
                          outlined
                          name="hospitalRegistration"
                          :label="`${formLabels.hospitalRegistration}`"
                          :rules="[hospitalRegistrationRules.required]"
                        ></v-text-field>

                        <v-select
                          v-model="user.hospitalId"
                          :items="hospitals"
                          :item-text="'nome'"
                          :item-value="'idempresa'"
                          outlined
                          :label="`${formLabels.hospitalId}`"
                          :rules="[hospitalRules.required]"
                          name="hospitalId"
                        ></v-select>
                      </v-form>
                    </v-card-text>
                    <v-card-actions>
                      <v-btn
                        type="submit"
                        form="formStep2"
                        depressed
                        color="primary"
                        class="px-10 py-2 ml-2 text-button"
                        @click.prevent="validateFormStep2ThenGoNext()"
                      >
                        Prosseguir
                      </v-btn>
                    </v-card-actions>
                  </v-card>
                </v-stepper-content>

                <v-stepper-content step="3" class="pt-0">
                  <v-card flat>
                    <v-card-text class="pb-0">
                      <v-form id="formStep3" ref="formStep3">
                        <v-text-field
                          v-model="user.email"
                          name="email"
                          :rules="[emailRules.required, emailRules.validEmail]"
                          :label="`${formLabels.email}`"
                          outlined
                        ></v-text-field>

                        <v-text-field
                          v-model="user.password"
                          :append-icon="
                            showPassword ? 'mdi-eye' : 'mdi-eye-off'
                          "
                          :rules="[passwordRules.required, passwordRules.min]"
                          :type="showPassword ? 'text' : 'password'"
                          name="password"
                          :label="`${formLabels.password}`"
                          outlined
                          @click:append="showPassword = !showPassword"
                        ></v-text-field>

                        <v-text-field
                          v-model="user.passwordConfirm"
                          :append-icon="
                            showPasswordConfirm ? 'mdi-eye' : 'mdi-eye-off'
                          "
                          :rules="[
                            passwordConfirmRules.required,
                            passwordRules.min,
                            passwordConfirmRules.matchPassword(user.password),
                          ]"
                          :type="showPasswordConfirm ? 'text' : 'password'"
                          name="passwordConfirm"
                          :label="`${formLabels.passwordConfirm}`"
                          outlined
                          @click:append="
                            showPasswordConfirm = !showPasswordConfirm
                          "
                        ></v-text-field>

                        <Recaptcha
                          ref="recaptcha"
                          @onRecaptchaVerified="onRecaptchaVerified"
                        />
                      </v-form>
                    </v-card-text>
                    <v-card-actions>
                      <v-btn
                        type="submit"
                        form="formStep3"
                        depressed
                        color="primary"
                        class="px-10 py-2 ml-2 text-button"
                        :loading="button.loading"
                        @click.prevent="validateFormStep3AndSubmit()"
                      >
                        {{ button.text }}
                      </v-btn>
                    </v-card-actions>
                  </v-card>
                </v-stepper-content>
              </v-stepper-items>
            </v-stepper>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>


<script>
import { mapActions, mapGetters } from 'vuex';
import { format, parse } from 'date-fns';

import Logo from '@/components/template/Logo.vue';

import unmaskText from '@/utils/unmaskText';
import recaptcha from '@/mixins/recaptcha.js';
import {
  emailRules,
  nameRules,
  cpfRules,
  birthdateRules,
  professionalOccupationIdRules,
  professionalCouncilRules,
  professionalCouncilNumberRules,
  hospitalRegistrationRules,
  hospitalRules,
  radioGroupRules,
  passwordRules,
  passwordConfirmRules,
  telephoneRules,
} from '@/validations';

export default {
  components: {
    Logo,
  },
  mixins: [recaptcha],
  data() {
    return {
      card: {
        title: 'Registro',
        subtitle: 'Vamos começar com seu cadastro.',
      },
      currentStep: 1,
      totalSteps: 3,
      user: {
        cpf: null,

        name: null,
        gender: null,
        telephone: null,
        birthdate: null,

        professionalOccupationId: null,
        professionalCouncil: null,
        professionalCouncilNumber: null,
        hospitalRegistration: null,
        hospitalId: null,

        email: null,
        password: null,
        passwordConfirm: null,
      },
      radioGroupGender: {
        title: 'Gênero',
        genders: [
          { type: 'Masculino', value: 'M' },
          { type: 'Feminino', value: 'F' },
        ],
      },
      hospitals: [],
      professionalOccupations: [],
      professionalCouncils: [],
      formLabels: {
        cpf: 'CPF',
        name: 'Nome',
        telephone: 'Telefone',
        birthdate: 'Data de nascimento',
        professionalOccupationId: 'Ocupação profissional',
        hospitalRegistration: 'Matrícula',
        professionalCouncil: 'Conselho profissional',
        professionalCouncilNumber: 'Registro no conselho profissional',
        hospitalId: 'Hospital',
        email: 'E-mail',
        password: 'Senha',
        passwordConfirm: 'Repetir senha',
      },
      button: {
        loading: false,
        text: 'Fazer cadastro',
      },
      showPassword: false,
      showPasswordConfirm: false,
      passwordRules,
      passwordConfirmRules,
      nameRules,
      cpfRules,
      birthdateRules,
      professionalOccupationIdRules,
      professionalCouncilRules,
      professionalCouncilNumberRules,
      hospitalRegistrationRules,
      hospitalRules,
      radioGroupRules,
      emailRules,
      telephoneRules,
    };
  },
  computed: {
    ...mapGetters('authentication', [
      'getCpfPreRegistration',
      'getHospitals',
      'getProfessionalCouncils',
      'getOccupations',
    ]),
    unmaskedCpf() {
      return unmaskText(this.user.cpf);
    },
    unmaskedTelephone() {
      return unmaskText(this.user.telephone);
    },
    formattedBirthdate() {
      return format(
        parse(this.user.birthdate, 'dd/MM/yyyy', new Date()),
        'yyyy/MM/dd'
      );
    },
  },
  created() {
    this.user.cpf = this.getCpfPreRegistration;
    this.hospitals = this.getHospitals;
    this.professionalCouncils = this.getProfessionalCouncils;
    this.professionalOccupations = this.getOccupations;
  },
  methods: {
    ...mapActions('authentication', [
      'preRegisterNewUser',
    ]),
    nextStep() {
      if (this.currentStep < this.totalSteps) {
        this.currentStep += 1;
      }
    },
    validateFormStep1ThenGoNext() {
      if (this.$refs.formStep1.validate()) {
        this.nextStep();
      }
    },
    validateFormStep2ThenGoNext() {
      if (this.$refs.formStep2.validate()) {
        this.nextStep();
      }
    },
    async validateFormStep3AndSubmit() {
      if (this.$refs.formStep3.validate()) {
        this.startButtonLoading();

        try {

          await this.preRegisterNewUser({
            ...this.user,
            cpf: this.unmaskedCpf,
            telephone: this.unmaskedTelephone,
            birthdate: this.formattedBirthdate,
          });
        } catch (error) {
          this.resetRecaptcha();
        }

        this.stopButtonLoading();
      }
    },
    startButtonLoading() {
      this.button.loading = true;
    },
    stopButtonLoading() {
      this.button.loading = false;
    },
  },
};
</script>

