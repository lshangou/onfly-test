<template>
  <q-page class="row justify-evenly q-pt-lg">
    <main class="col-9">
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
          :selectedCity="selectedCity"
        />
      </div>
      <div class="col-12">[Lista de Hotéis]</div>
    </main>
  </q-page>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import SearchDestinationBox from 'components/SearchDestinationBox.vue';
import BreadcrumbComponent from 'components/BreadcrumbComponent.vue';
import { ShortenedCity } from '../components/models';

export default defineComponent({
  name: 'IndexPage',
  components: { SearchDestinationBox, BreadcrumbComponent },
  setup() {
    const hasSearchResults = ref(false);
    const selectedCity = ref('');

    return {
      hasSearchResults,
      selectedCity,
      // Atualiza breadcrumb e botão de buscar
      updateSearchResults: function (city: ShortenedCity) {
        hasSearchResults.value = true;
        selectedCity.value =
          city.label.split(',')[0] + ', ' + city.value.split(',')[1];
      },
    };
  },
});
</script>
