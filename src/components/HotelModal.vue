<template>
  <q-dialog v-model="modal" persistent v-if="showModal">
    <q-card>
      <q-card-section class="row items-center q-pb-none">
        <div class="text-h6">{{ hotel.name }}</div>
        <q-space />
        <q-btn icon="close" flat round dense @click="$emit('closeModal')" />
      </q-card-section>

      <q-card-section style="max-height: 80vh" class="scroll">
        <div class="row">
          <div class="col-12">
            <span class="q-pr-sm">{{ starRating.toFixed(1) }}</span>
            <q-rating
              v-model="starRating"
              size="16px"
              color="amber-4"
              readonly
            />
          </div>
          <div class="col-12">
            <p class="text-h6 q-mb-none">{{ hotel.name }}</p>
            <p class="text-grey">
              {{ hotel.address.fullAddress }}
            </p>
          </div>
          <div class="col-12">
            <template v-if="!hotel.nonRefundable">
              <q-chip square color="grey" text-color="white" class="q-ml-none"
                >Reembolsável</q-chip
              >
            </template>
          </div>
        </div>
        <div class="row">
          <div class="col-md-8 col-12 q-mb-md">
            <q-carousel
              class="rounded-borders"
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
          <div class="col-md-4 col-12">
            <div class="col-12">
              <p class="text-h6 q-mb-none">Facilidades do Hotel</p>
              <hr />
              <div class="text-grey row wrap items-center justify-between">
                <template v-if="hotel.amenities">
                  <p
                    class="col-md-12 col-sm-6 col-12"
                    v-for="amenity in hotel.amenities.slice(0, amenityLimit)"
                    :key="amenity.key"
                  >
                    <q-icon
                      class="q-mr-sm"
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
                    <span>{{ amenity.label }}</span>
                  </p>
                </template>
              </div>
              <template v-if="hotel.amenities">
                <div
                  class="text-center"
                  v-if="amenityLimit == 3 && hotel.amenities.length > 3"
                >
                  <q-btn
                    label="Mostrar todas as facilidades"
                    no-caps
                    outline
                    color="primary"
                    rounded
                    dense
                    class="q-mx-auto"
                    @click="amenityLimit = Infinity"
                  ></q-btn>
                </div>
                <hr />
              </template>
            </div>
          </div>
          <div class="col-12">
            <div class="col-md-4 col-12">
              <p class="text-h6">Conheça um pouco mais</p>
              <p class="text-grey">{{ hotel.description }}</p>
            </div>
          </div>
        </div>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script lang="ts">
import { defineComponent, PropType, ref } from 'vue';
import { Hotel } from './models';

export default defineComponent({
  name: 'HotelDrawer',
  props: {
    showModal: {
      type: Boolean,
      default: false,
    },
    hotel: {
      required: true,
      type: Object as PropType<Hotel>,
    },
  },
  setup(props) {
    const modal = ref(true);
    const slide = ref('thumb');
    const amenityLimit = ref(3);

    return {
      modal,
      slide,
      starRating: ref(Number(props.hotel.stars)),
      amenityLimit,
    };
  },
});
</script>
<style lang="scss" scoped>
.q-dialog__inner--minimized > div {
  width: 100%;
  max-height: 90vh;
  @media (min-width: 600px) {
    max-width: 80%;
  }
}
.q-carousel {
  @media (min-width: 600px) {
    margin-right: 1em;
  }
}
</style>
