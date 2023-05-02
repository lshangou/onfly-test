<template>
  <q-page class="row justify-evenly q-pt-lg">
    <main class="col-9">
      <div class="col-12">
        <q-breadcrumbs class="text-primary">
          <template v-slot:separator>
            <q-icon size="1.5em" name="chevron_right" color="primary" />
          </template>
          <q-breadcrumbs-el label="Início" />
          <q-breadcrumbs-el label="Hotéis" class="text-black" />
        </q-breadcrumbs>
      </div>
      <div class="col-12">
        <SearchDestinationBox />
      </div>
    </main>
  </q-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import SearchDestinationBox from 'components/SearchDestinationBox.vue';

export default defineComponent({
  name: 'IndexPage',
  components: { SearchDestinationBox },
  setup() {
    return {};
  },
});
</script>
