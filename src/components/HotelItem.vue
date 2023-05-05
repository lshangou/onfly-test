<template>
  <q-card flat class="q-my-md" v-if="hotel">
    <q-card-section>
      <p v-for="propriety in Object.keys(hotel)" :key="propriety">
        <span
          v-if="
            propriety != 'description' &&
            propriety != 'amenities' &&
            propriety != 'address' &&
            propriety != 'images'
          "
          >{{ propriety }}: {{ hotel[propriety] }}</span
        >
      </p>
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
