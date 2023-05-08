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
            @update:model-value="(val) => getHotelsAfterSearch(val)"
            v-model="orderMethod"
            :options="orderMethodList"
          />
        </div>
      </div>
      <div class="col-12" v-if="hasSearchResults">
        <HotelList
          :hotelList="hotelsList"
          :orderMethod="orderMethod.value"
          @selectHotel="(val) => openDrawer(val)"
        />
      </div>
      <HotelModal
        v-if="modalHotel"
        :showModal="showModal"
        :hotel="modalHotel"
        @closeModal="showModal = false"
      />
    </main>
  </q-page>
</template>

<script lang="ts">
import { defineComponent, ref, Ref } from 'vue';
import SearchDestinationBox from 'components/SearchDestinationBox.vue';
import BreadcrumbComponent from 'components/BreadcrumbComponent.vue';
import HotelList from 'components/HotelList.vue';
import HotelModal from 'components/HotelModal.vue';
import { ShortenedCity, Hotel } from '../components/models';
import hotelDataJson from '../data/hotel.json';

export default defineComponent({
  name: 'IndexPage',
  components: {
    SearchDestinationBox,
    BreadcrumbComponent,
    HotelList,
    HotelModal,
  },
  setup() {
    const hasSearchResults = ref(false);
    const selectedCityTreated = ref('');
    const selectedCity = ref('');
    const selectedCityId = ref(0);
    const hotelsList: Ref<Array<Hotel>> = ref([]);
    const searchedCity: Ref<ShortenedCity | null> = ref(null);
    const orderMethod = ref({
      value: 'recommended',
      label: 'Recomendados',
    });

    const getHotelsAfterSearch = function (method: {
      label: string;
      value: string;
    }) {
      orderMethod.value = method;
      getHotels();
    };

    const getHotels = function () {
      let data = hotelDataJson.filter((hotelsList) => {
        return hotelsList.placeId == selectedCityId.value;
      })[0].hotels;
      switch (orderMethod.value.value) {
        case 'recommended':
          hotelsList.value = orderHotelsByFavorite(data);
          break;
        case 'rating':
          hotelsList.value = orderHotelsByStarRating(data);
          break;
        case 'name':
          hotelsList.value = orderHotelsByName(data);
          break;

        default:
          // Sem ordenação, porém inalcançável com a UI.
          hotelsList.value = data;
          break;
      }
    };

    // Ordenação por Estrelas
    function orderHotelsByStarRating(hotels: Hotel[]) {
      return hotels.sort((hotelA: Hotel, hotelB: Hotel) => {
        if (hotelA.stars > hotelB.stars) {
          return -1;
        }
        if (hotelA.stars < hotelB.stars) {
          return 1;
        }
        return 0;
      });
    }
    // Ordenação por Favorito
    function orderHotelsByFavorite(hotels: Hotel[]) {
      return hotels.sort((hotelA: Hotel, hotelB: Hotel) => {
        if (hotelA.favorite && !hotelB.favorite) {
          return -1;
        }
        if (hotelB.favorite && !hotelA.favorite) {
          return 1;
        }
        return 0;
      });
    }
    // Ordenação por Nome
    function orderHotelsByName(hotels: Hotel[]) {
      return hotels.sort((hotelA: Hotel, hotelB: Hotel) => {
        let nameA = hotelA.name.toLowerCase();
        let nameB = hotelB.name.toLowerCase();
        if (nameA < nameB) {
          return -1;
        }
        if (nameA > nameB) {
          return 1;
        }
        return 0;
      });
    }

    const showModal = ref(false);
    const modalHotel: Ref<Hotel | null> = ref(null);
    const openDrawer = function (hotel: Hotel) {
      console.log(hotel);
      showModal.value = true;
      modalHotel.value = hotel;
    };

    return {
      hasSearchResults,
      selectedCityTreated,
      searchedCity,
      selectedCity,
      selectedCityId,
      // Atualiza breadcrumb e botão de buscar
      updateSearchResults: function (city: ShortenedCity) {
        hasSearchResults.value = true;
        searchedCity.value = city;
        selectedCity.value = city.value.name;
        selectedCityId.value = city.value.placeId;
        selectedCityTreated.value =
          city.value.name + ', ' + city.value.state.shortname;
        getHotels();
      },
      getHotelsAfterSearch,
      hotelsList,
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
      openDrawer,
      showModal,
      modalHotel,
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
