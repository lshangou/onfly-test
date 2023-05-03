<template>
  <template v-if="hotelList().length == 0">
    <p>Nenhum hotel encontrado.</p>
  </template>
  <template v-else>
    <pre v-for="hotel in hotelList()" :key="hotel.id">
      <HotelItem :hotel="hotel"/>
    </pre>
  </template>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import hotelDataJson from '../data/hotel.json';
import HotelItem from './HotelItem.vue';

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
    const hotelList = function () {
      return hotelDataJson.filter((hotelList) => {
        return hotelList.placeId == props.cityId;
      })[0].hotels;
    };
    return {
      hotelList,
    };
  },
});
</script>
