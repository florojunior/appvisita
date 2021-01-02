<template>
    <v-container fill-height class="black-background pa-0 ma-0">
            <v-row class="full-screen pa-0 ma-0">
                <v-col v-for="hospital in hospitalsUser" :key="hospital.id" class="d-flex justify-center">
                    <v-card
                        elevation="2"
                    >
                        <v-card-text>
                            {{hospital.nome}}
                        </v-card-text>
                        <v-card-actions>
                            <v-row>
                                <v-col class="d-flex justify-center">
                                    <v-btn
                                        text
                                        color="primary"
                                         @click="loadMenuByUser(hospital)"
                                    >
                                        Selecionar
                                    </v-btn>
                                </v-col>
                            </v-row>
                        </v-card-actions>
                    </v-card>
                
                </v-col>
            </v-row>
    </v-container>
</template>

<script>

import { mapGetters, mapActions } from 'vuex';

export default {
    created(){

    },
    computed: {
        ...mapGetters('authentication', ['hospitalsUser','menu']),
    },
    methods:{
        ...mapActions('authentication', ['setMenu']),
        ...mapActions('main', ['setAuthenticated']),
        async loadMenuByUser(hospital){
            const result = await this.$http.get(`/profile-user/?idEmpresa=${hospital.idempresa}`);
            const menu  = result.data.result.menuPrimario;
            const newToken = result.data.token;
            localStorage.setItem('token_blood', newToken);
            this.setAuthenticated(true);
            this.setMenu(menu);
            this.$router.push({ name: 'pendingUsers' }, {});
        }
    }
}
</script>

<style>
    .black-background{
        background-color: black;
        max-width: 100%;
    }
</style>