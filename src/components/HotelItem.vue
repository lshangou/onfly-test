<template>
  <q-card class="q-mb-md q-mx-auto rounded-borders">
    <div class="row">
      <div class="col-12 col-md-4">
        <q-carousel
          ref="carousel"
          v-model="slide"
          infinite
          arrows
          control-color="white"
          control-text-color="black"
          control-type="regular"
          height="100%"
        >
          <q-carousel-slide name="thumb" class="q-pa-none">
            <q-img fit="cover" :ratio="3 / 2" :src="hotel.thumb" />
          </q-carousel-slide>
          <template v-for="(image, index) in hotel.images" :key="index">
            <!-- Removendo o index 0 pois é a thumb. -->
            <q-carousel-slide
              v-if="index != 0"
              :name="'img-' + index"
              class="q-pa-none"
            >
              <q-img fit="cover" :ratio="3 / 2" :src="image" />
            </q-carousel-slide>
          </template>
        </q-carousel>
      </div>
      <div class="col-12 col-md-5 q-pa-md">
        <p class="text-h6 q-mb-none">{{ hotel.name }}</p>
        <p class="text-grey">
          {{ hotel.address.fullAddress }}
        </p>
        <p class="text-grey flex align-baseline">
          <span class="q-pr-sm">{{ starRating.toFixed(1) }}</span>
          <q-rating v-model="starRating" size="16px" color="amber-4" readonly />
          <template v-if="hotel.amenities">
            <span v-if="hotel.amenities" class="q-px-sm">|</span>
            <div class="flex flex-center amenities">
              <q-icon
                class="q-mr-sm"
                v-for="amenity in hotel.amenities"
                :key="amenity.key"
                :name="
                  amenity.key == 'WI_FI'
                    ? 'wifi'
                    : amenity.key == 'PUB'
                    ? 'liquor'
                    : amenity.key == 'POOL'
                    ? 'pool'
                    : amenity.key == 'ROOM_SERVICE'
                    ? 'room_service'
                    : amenity.key == 'RESTAURANT'
                    ? 'restaurant'
                    : amenity.key == 'AIR_CONDITIONING'
                    ? 'air'
                    : amenity.key == 'LAUNDRY'
                    ? 'local_laundry_service'
                    : amenity.key == 'SAFE'
                    ? 'lock'
                    : amenity.key == 'BREAKFAST'
                    ? 'restaurant_menu'
                    : amenity.key == 'PARKING'
                    ? 'directions_car'
                    : amenity.key == 'FITNESS_CENTER'
                    ? 'fitness_center'
                    : amenity.key == 'MEETING_ROOM'
                    ? 'meeting_room'
                    : amenity.key == 'STEAM_ROOM'
                    ? 'iron'
                    : amenity.key == 'PETS'
                    ? 'pets'
                    : amenity.key
                "
              >
                <q-tooltip>
                  {{ amenity.label }}
                </q-tooltip>
              </q-icon>
            </div>
          </template>
        </p>
        <template v-if="!hotel.nonRefundable">
          <q-chip square color="grey" text-color="white">Reembolsável</q-chip>
        </template>
      </div>
      <div class="col-12 col-md-2 q-pa-md select-area">
        <p class="text-grey q-mb-none">A partir de:</p>
        <!-- Preço do Hotel não incluso no arquivo JSON, utilizei os id's para ficar legal mesmo assim. -->
        <p class="text-h5 q-mb-none">
          <span class="text-caption text-bold">R$ </span
          >{{ hotel.id.toFixed(2) }}
        </p>
        <span class="text-caption text-grey"
          >R${{ (hotel.id / 3).toFixed(2) }}/noite</span
        >
        <p class="text-caption text-grey text-bold">Impostos inclusos</p>
        <q-btn
          class="q-mt-md"
          color="primary"
          rounded
          no-caps
          @click="$emit('selectHotel', hotel)"
          >Selecionar</q-btn
        >
      </div>
    </div>
  </q-card>
  <!-- aq -->
</template>

<script lang="ts">
import { PropType, defineComponent, ref } from 'vue';
import { Hotel } from './models';

export default defineComponent({
  name: 'HotelItem',
  props: {
    hotel: {
      required: true,
      type: Object as PropType<Hotel>,
    },
  },
  setup(props) {
    const slide = ref('thumb');
    return {
      slide,
      starRating: ref(Number(props.hotel.stars)),
    };
  },
});
</script>
<style lang="scss" scoped>
.q-card {
  width: 100%;
  @media (max-width: 960px) {
    max-width: 280px;
  }
}
.amenities {
  margin-top: 2px;
}
.select-area {
  @media (min-width: 1024px) {
    border-left: 3px solid rgb(230, 230, 230);
  }
  @media (max-width: 1024px) {
    text-align: center;
  }
}
.q-carousel {
  border-top-left-radius: 2px;
  border-bottom-left-radius: 2px;
}
.q-img {
  height: 100%;
}
</style>
