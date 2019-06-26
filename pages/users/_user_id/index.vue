<template>
  <div>
    <page-header :title="item.name" :to="'/users'" />
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
              <v-list-tile-sub-title>Username</v-list-tile-sub-title>
              <v-list-tile-title>{{item.username}}</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
          <v-list-tile>
            <v-list-tile-content>
              <v-list-tile-sub-title>Email</v-list-tile-sub-title>
              <v-list-tile-title>{{item.email}}</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
          <v-list-tile>
            <v-list-tile-content>
              <v-list-tile-sub-title>Nomor Telepon</v-list-tile-sub-title>
              <v-list-tile-title>{{item.phoneNumber}}</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
          <v-list-tile>
            <v-list-tile-content>
              <v-list-tile-sub-title>Position</v-list-tile-sub-title>
              <v-list-tile-title>{{item.position}}</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
          <v-list-tile>
            <v-list-tile-content>
              <v-list-tile-sub-title>Role</v-list-tile-sub-title>
              <v-list-tile-title>{{item.role}}</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
          <v-list-tile>
            <v-list-tile-content>
              <v-list-tile-sub-title>Alamat</v-list-tile-sub-title>
              <v-list-tile-title>{{item.address}}</v-list-tile-title>
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
    await store.dispatch('users/show', {user_id: params.user_id});
  },
  computed: {
    ...mapState({
      item: state => {
        return state.users.user
      },
    }),
  },
}
</script>

<style scoped>
</style>