<template>
  <template v-if="hotelList.length == 0">
    <p>Nenhum hotel encontrado.</p>
  </template>
  <template v-else>
    <q-infinite-scroll @load="onLoad" :offset="250">
      <pre v-for="hotel in hotelList.slice(0, pageLimit)" :key="hotel.id">
        <HotelItem :hotel="hotel"/>
      </pre>
      <template v-slot:loading v-if="pageLimit <= hotelList.length">
        <div class="row justify-center q-my-md">
          <q-spinner-dots color="primary" size="40px" />
        </div>
      </template>
      <template v-if="pageLimit > hotelList.length">
        <p class="text-center text-grey">Fim da lista de Hotéis</p>
      </template>
    </q-infinite-scroll>
  </template>
</template>

<script lang="ts">
import { defineComponent, onUpdated, ref, Ref } from 'vue';
import hotelDataJson from '../data/hotel.json';
import HotelItem from './HotelItem.vue';
import { Hotel } from './models';

export default defineComponent({
  name: 'BreadcrumbComponent',
  components: { HotelItem },
  props: {
    cityId: {
      required: true,
      type: Number,
    },
  },
  setup(props) {
    const hotelList: Ref<Hotel[]> = ref([]);

    const getHotels = function () {
      let data = hotelDataJson.filter((hotelList) => {
        return hotelList.placeId == props.cityId;
      })[0].hotels;
      switch (sortingType.value) {
        case 'recommended':
          hotelList.value = orderHotelsByFavorite(data);
          break;
        case 'rating':
          hotelList.value = orderHotelsByStarRating(data);
          break;
        case 'name':
          hotelList.value = orderHotelsByName(data);
          break;

        default:
          // Sem ordenação, porém inalcançável com a UI.
          hotelList.value = data;
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

    // Atualiza a lista ao clicar no botão Atualizar.
    onUpdated(() => {
      getHotels();
    });

    // Propriedades do infiniteScroll
    const pageLimit = ref(10);
    const pageLimitReached = ref(false);
    // Como todas as propriedades 'deal' estavam nulas, ajustei os recomendados de acordo com a propriedade 'favorite'
    const sortingType = ref('recommended');

    return {
      hotelList,
      sortingType,
      getHotels,
      pageLimit,
      pageLimitReached,
      onLoad(index: number, done: () => void) {
        setTimeout(() => {
          // Parar de carregar página ao atingir o limite de hotéis.
          if (pageLimit.value <= hotelList.value.length) {
            pageLimit.value += 10;
          }
          done();
        }, 500); //.5 sec
      },
    };
  },
  mounted() {
    this.getHotels();
  },
});
</script>
