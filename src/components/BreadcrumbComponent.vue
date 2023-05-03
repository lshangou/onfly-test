<template>
  <q-breadcrumbs class="text-primary">
    <template v-slot:separator>
      <q-icon size="1.5em" name="chevron_right" color="primary" />
    </template>
    <q-breadcrumbs-el v-for="page in pages" :key="page" :label="page" />
    <template v-if="!isResultsPage">
      <q-breadcrumbs-el :label="actualPage" class="text-black" />
    </template>
    <template v-else>
      <q-breadcrumbs-el :label="actualPage" />
      <q-breadcrumbs-el
        :label="'Hospedagem em ' + selectedCity"
        class="text-black"
      />
    </template>
  </q-breadcrumbs>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'BreadcrumbComponent',
  props: {
    isResultsPage: {
      type: Boolean,
      default: false,
    },
    selectedCity: {
      type: String,
    },
    pages: {
      required: true,
      type: Array<string>,
    },
    actualPage: {
      required: true,
      type: String,
    },
  },
});
</script>
<style lang="scss" scoped>
.q-breadcrumbs {
  font-size: 12px;
}
</style>
