<template>
  <q-page class="row justify-evenly q-pt-lg">
    <main class="col-9">
      <pre>{{ selectedCity }}</pre>
      <div class="col-12">
        <SearchDestinationBox
          :isResultsPage="hasSearchResults"
          @search="(city) => updateSearchResults(city)"
        />
      </div>
      <div class="col-12 row justify-between items-baseline">
        <BreadcrumbComponent
          :pages="['Início']"
          actualPage="Hotéis"
          :isResultsPage="hasSearchResults"
          :selectedCity="selectedCityTreated"
        />
        <div class="order-wrapper">
          Ordenar por
          <q-select
            dense
            options-dense
            borderless
            v-model="orderMethod"
            :options="orderMethodList"
          />
        </div>
      </div>
      <div class="col-12" v-if="hasSearchResults">
        <HotelList :cityId="selectedCityId" />
      </div>
    </main>
  </q-page>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import SearchDestinationBox from 'components/SearchDestinationBox.vue';
import BreadcrumbComponent from 'components/BreadcrumbComponent.vue';
import HotelList from 'components/HotelList.vue';
import { ShortenedCity } from '../components/models';

export default defineComponent({
  name: 'IndexPage',
  components: { SearchDestinationBox, BreadcrumbComponent, HotelList },
  setup() {
    const hasSearchResults = ref(false);
    const selectedCityTreated = ref('');
    const selectedCity = ref('');
    const selectedCityId = ref(0);
    const orderMethod = ref({
      value: 'recommended',
      label: 'Recomendados',
    });

    return {
      hasSearchResults,
      selectedCityTreated,
      selectedCity,
      selectedCityId,
      // Atualiza breadcrumb e botão de buscar
      updateSearchResults: function (city: ShortenedCity) {
        hasSearchResults.value = true;
        selectedCity.value = city.value.name;
        selectedCityId.value = city.value.placeId;
        selectedCityTreated.value =
          city.value.name + ', ' + city.value.state.shortname;
      },
      //
      orderMethod,
      orderMethodList: [
        {
          label: 'Recomendados',
          value: 'recommended',
        },
        {
          label: 'Nome',
          value: 'name',
        },
        {
          label: 'Avalição',
          value: 'rating',
        },
      ],
    };
  },
});
</script>
<style lang="scss">
.order-wrapper {
  display: flex;
  align-items: baseline;
  font-size: 12px;
  font-weight: 500;
  font-style: italic;
  color: $grey;
  .q-field__native,
  .q-field__prefix,
  .q-field__suffix,
  .q-field__input {
    margin-left: 4px;
    color: $primary !important;
    display: inline;
    font-size: 12px;
    font-weight: 500;
    font-style: italic;
  }
  .q-field--dense .q-field__after,
  .q-field--dense .q-field__append {
    color: $primary;
    padding-left: 0px;
    padding-bottom: 10px;
  }
}
</style>
