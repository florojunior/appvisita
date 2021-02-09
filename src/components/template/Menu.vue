<template>
  <nav>
    <v-navigation-drawer v-model="drawer" disable-resize-watcher app>
      <v-row>
        <v-col cols=12 class="d-flex justify-center mt-4">
          <v-img src="@/assets/images/tjam_logo.svg" max-width="100" max-height="100"></v-img>
        </v-col>
      </v-row>
      
      <v-list dense>
        <v-list-group v-for="itemMenu in menu" :key="itemMenu.descricao">
          <template v-slot:activator>
            <v-list-item-action>
              <v-icon>dynamic_feed</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title
                v-text="itemMenu.descricao"
              ></v-list-item-title>
            </v-list-item-content>
          </template>
          <v-list-item
            v-for="itemSubMenu in itemMenu.menu"
            :key="itemSubMenu.descricao"
            :to="itemSubMenu.path"
          >
            <v-list-item-action>
              <v-icon>how_to_reg</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>{{ itemSubMenu.descricao }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-group>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar
      app
      flat
      color="primary lighten-1"
    >
        <v-app-bar-nav-icon
          class="onPrimaryHighEmphasis--text"
          @click.stop="drawer = !drawer"
        ></v-app-bar-nav-icon>
        <v-img
          v-if="desktopBreakpoint"
          src="@/assets/images/tjam_logo.svg"
          max-width="90px"
          alt="Blood logo"
        ></v-img>
        <v-toolbar-title v-else class="ml-0 pl-0">
          <span class="ml-0 pl-0 surface--text text-subtitle-1 text-uppercase font-weight-bold">
            {{userData.nome}}
          </span>
        </v-toolbar-title>

        <v-spacer></v-spacer>

        <v-tooltip>
          <template v-slot:activator="{ on }">
            <v-btn
              text
              color="onPrimaryHighEmphasis"
              @click="handleLogOut()"
              v-on="on"
              class="mr-0 pr-0"
            >
               <span class="ml-0 pl-0 surface--text text-subtitle-2 text-uppercase mt-1 font-weight-bold">
                  Sair
                </span>
            </v-btn>
          </template>
          <span>Log out</span>
        </v-tooltip>
    </v-app-bar>
  </nav>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  data: () => ({
    drawer: null,
    isAdministrador: true,
    user: 'Foo', //pegar do vuex
  }),
  computed: {
    ...mapGetters('authentication', ['menu']),
    pageName() {
      return this.$route.name;
    },
    desktopBreakpoint() {
      return this.$vuetify.breakpoint.smAndUp;
    },
    userData(){
      return JSON.parse(localStorage.getItem("user_visitas"));
    }
  },
  created: function () {
    /*var usrAdm = true;
        if(usrAdm){
            this.menu.push({
                descricao: 'Sangue Nativo',
                menu:[
                    {
                        descricao:'Transfusões realizadas',
                        path:'/transfusoes'
                    },
                    {
                        descricao:'Produtos em estoque',
                        path:'/estoque'
                    },
                    {
                        descricao:'Produtos Distribuidos',
                        path:'/distribuidos'
                    },
                    {
                        descricao:'Descartados',
                        path:'/descartados'
                    }
                ]
            },
            {
                descricao: 'Hemoam',
                menu:[
                    {
                        descricao:'Doadores',
                        path:'/doadorouro'
                    },
                    {
                        descricao:'Faturamento',
                        path:'/faturamento'
                    }
                ]
            });
        }*/
  },
  methods: {
    ...mapActions('main', ['handleLogOut']),
  },
};
</script>

<style scoped>
</style>
