<template>
  <div
    class="d-flex flex-grow-1 justify-center align-content-center"
    style="height: calc(100vh)"
  >
    <!-- :class="{ hideMenu: authenticated }" -->
    <Menu v-if="authenticated"></Menu>
    <!--<Menu/>-->
    <!--<div class="default-header-detail primary-background-color" style="height: 64px; width: 100%; position: absolute">
              <p class="white--text text-left pt-4 ml-16">Usuários</p>
          </div>-->
    <router-view></router-view>
    <Modal />
    <SnackbarNotification />
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

import Modal from '@/components/utils/Modal.vue';
import Menu from '@/components/template/Menu.vue';
import SnackbarNotification from '@/components/utils/SnackbarNotification.vue';

export default {
  components: {
    Modal,
    Menu,
    SnackbarNotification,
  },
  data: () => ({}),
  computed: {
    ...mapGetters('main', ['authenticated']),
    hide() {
      return (
        this.$route.path == '/login' ||
        this.$route.path == '/' ||
        this.$route.path == '/chooseUnidade'
      );
    },
  },
  created() {},
};
</script>

<style>
.hideMenu {
  margin-top: 60px;
}
</style>
