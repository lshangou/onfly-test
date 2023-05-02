<template>
  <q-layout view="lHh Lpr lFf">
    <q-header class="bg-white">
      <q-toolbar>
        <q-toolbar-title class="q-ml-lg">
          <q-img class="logo" src="~assets/OnflyLogo.png" />
        </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'MainLayout',

  setup() {
    return {};
  },
});
</script>
<style lang="scss" scoped>
.q-header {
  box-shadow: 0 5px 6px #00000010;
}
.logo {
  max-width: 150px;
  max-height: auto;
}
</style>
