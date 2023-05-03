<template>
  <pre>Lista de hotéis em {{ city }}</pre>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'BreadcrumbComponent',
  props: {
    city: {
      required: true,
      type: String,
    },
  },
});
</script>
<style lang="scss" scoped></style>
