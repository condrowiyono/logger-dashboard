<template>
  <div>
    <page-header :title="item.name" :to="'/subfacilities'" />
    <v-container fluid>
      <v-card>
        <v-list two-line >
          <v-list-tile :to="'/facilities/'+item.facility.id">
            <v-list-tile-content>
              <v-list-tile-sub-title>Dari Fasilitas</v-list-tile-sub-title>
              <v-list-tile-title class="font-weight-bold">{{item.facility.name}}</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
          <v-list-tile>
            <v-list-tile-content>
              <v-list-tile-sub-title>Nama</v-list-tile-sub-title>
              <v-list-tile-title>{{item.name}}</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
          <v-list-tile>
            <v-list-tile-content>
              <v-list-tile-sub-title>Deskripsi</v-list-tile-sub-title>
              <v-list-tile-title>{{item.desc}}</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list>
      </v-card>
    </v-container>
  </div>
</template>

<script>
import {mapState} from 'vuex';

export default {
  async fetch({store, params}) {
    await store.dispatch('subfacilities/show', {subfacility_id: params.subfacility_id});
  },
  computed: {
    ...mapState({
      item: state => {
        return state.subfacilities.item
      },
    }),
  },
}
</script>

<style scoped>
</style>