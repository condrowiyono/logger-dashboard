<template>
  <div>
    <page-header :title="item.name" :to="'/facilities'" />
    <v-container fluid>
      <v-card>
        <v-list two-line >
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
    await store.dispatch('facilities/show', {facility_id: params.facility_id});
  },
  computed: {
    ...mapState({
      item: state => {
        return state.facilities.item
      },
    }),
  },
}
</script>

<style scoped>
</style>