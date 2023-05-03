<template>
  <q-card flat class="q-my-md" v-if="hotel">
    <q-card-section v-for="propriety in Object.keys(hotel)" :key="propriety">
      <p>{{ propriety }}: {{ hotel[propriety] }}</p>
    </q-card-section>
  </q-card>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'BreadcrumbComponent',
  props: {
    hotel: {
      type: Object,
    },
  },
});
</script>
