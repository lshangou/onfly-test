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
        <q-select
          outlined
          dense
          placeholder="Escolha uma cidade..."
          use-input
          hide-selected
          fill-input
          input-debounce="0"
          @filter="filterFn"
          @input-value="setModel"
          id="destination"
          :options="options"
          v-model="destination"
        />
      </q-card-section>
      <q-card-section align="right">
        <q-btn
          :disabled="!destination.value || destination.value == ''"
          type="submit"
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
import destinationDataJson from '../data/place.json';
import { Destination, ShortenedCity } from './models';

// Importação do JSON em um array e definindo label e valor de acordo com modelo de referência;
const shortCities = function (
  destinationData: Array<Destination>
): Array<ShortenedCity> {
  let cityNamesWithState: Array<ShortenedCity> = [];
  destinationData.forEach((destination: Destination) => {
    cityNamesWithState.push({
      label: destination.name + ', ' + destination.state.name,
      value: destination.name + ', ' + destination.state.shortname,
    });
  });
  return cityNamesWithState;
};

const stringOptions = shortCities(destinationDataJson);

export default defineComponent({
  name: 'SearchDestinationBox',
  props: {
    isResultsPage: {
      type: Boolean,
      default: false,
    },
  },
  setup() {
    const destination = ref({
      label: ref(''),
      value: ref(''),
    });
    const options = ref(stringOptions);

    return {
      destination,
      options,
      // Função para filtar cidades disponíveis no autocomplete.
      filterFn(val: string, update: (fn: () => void) => void) {
        update(() => {
          const needle = val.toLocaleLowerCase();
          options.value = stringOptions.filter(
            (v) => v.label.toLocaleLowerCase().indexOf(needle) > -1
          );
        });
      },
      // Atualiza o modelo para ser o objeto completo de cidade resumida.
      setModel(val: string) {
        stringOptions.forEach((city) => {
          if (city.label == val) {
            destination.value = city;
          }
        });
      },
    };
  },
  methods: {
    onSubmit() {
      this.$emit('search', this.destination);
    },
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
