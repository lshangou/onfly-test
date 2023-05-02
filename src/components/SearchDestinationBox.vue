<template>
  <q-card flat class="q-my-md">
    <q-form @submit="onSubmit">
      <q-card-section class="q-py-sm">
        <div class="text-h6 q-py-none">Reservar Hotel</div>
      </q-card-section>
      <q-separator />
      <q-card-section class="q-pb-none">
        <label class="text-weight-medium" for="destination">
          Destino<span class="text-negative">*</span>
        </label>
        <q-input
          outlined
          dense
          placeholder="Digite uma cidade..."
          id="destination"
          v-model="destination"
          lazy-rules
          :rules="[(val) => (val && val.length > 0) || 'Campo vazio.']"
        />
      </q-card-section>
      <q-card-section class="q-pt-none" align="right">
        <q-btn
          rounded
          no-caps
          color="primary"
          :label="isResultsPage ? 'Alterar Busca' : 'Buscar'"
        />
      </q-card-section>
    </q-form>
  </q-card>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
  name: 'SearchDestinationBox',
  props: {
    isResultsPage: {
      type: Boolean,
      default: false,
    },
  },
  setup() {
    return {
      destination: ref(''),
      onSubmit: function () {
        console.log('teste');
      },
    };
  },
});
</script>
<style lang="scss" scoped>
label {
  color: $text-color;
}
.q-input {
  margin-top: 5px;
}
</style>
