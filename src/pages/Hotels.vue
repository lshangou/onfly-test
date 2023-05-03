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
      <div class="col-12">
        <BreadcrumbComponent
          :pages="['Início']"
          actualPage="Hotéis"
          :isResultsPage="hasSearchResults"
          :selectedCity="selectedCityTreated"
        />
      </div>
      <div class="col-12" v-if="hasSearchResults">
        <HotelList :city="selectedCity" />
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

    return {
      hasSearchResults,
      selectedCityTreated,
      selectedCity,
      // Atualiza breadcrumb e botão de buscar
      updateSearchResults: function (city: ShortenedCity) {
        hasSearchResults.value = true;
        selectedCity.value = city.value.name;
        selectedCityTreated.value =
          city.value.name + ', ' + city.value.state.shortname;
      },
    };
  },
});
</script>
