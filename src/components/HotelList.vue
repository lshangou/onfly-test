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
import { defineComponent, PropType, ref, Ref } from 'vue';
import HotelItem from './HotelItem.vue';
import { Hotel } from './models';

export default defineComponent({
  name: 'BreadcrumbComponent',
  components: { HotelItem },
  props: {
    orderMethod: {
      required: true,
      type: String,
    },
    hotelList: {
      required: true,
      type: Array as PropType<Hotel[]>,
    },
  },
  setup(props) {
    // Propriedades do infiniteScroll
    const pageLimit = ref(10);
    const pageLimitReached = ref(false);
    // Como todas as propriedades 'deal' estavam nulas, ajustei os recomendados de acordo com a propriedade 'favorite'
    const sortingType = ref('recommended');

    return {
      sortingType,
      pageLimit,
      pageLimitReached,
      onLoad(index: number, done: () => void) {
        setTimeout(() => {
          // Parar de carregar página ao atingir o limite de hotéis.
          if (pageLimit.value <= props.hotelList.length) {
            pageLimit.value += 10;
          }
          done();
        }, 500); //.5 sec
      },
    };
  },
});
</script>
