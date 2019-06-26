<template>
  <div>
    <page-header :title="'User'" />
    <v-container fluid>
      <v-card>
        <v-toolbar flat color="white">
          <v-toolbar-title>Manajemen User</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn flat color="blue darken-1" :to="'/users/new'" >Tambah Baru</v-btn>
        </v-toolbar>
        <v-divider></v-divider>
        <v-card-title>
          <v-text-field
            v-model="params.name"
            prepend-inner-icon="search"
            label="Search"
            single-line
            hide-details
            v-on:keyup.enter="filter"
          ></v-text-field>
          <!-- <v-spacer></v-spacer> -->
          <v-btn icon >
            <v-icon>filter_list</v-icon>
          </v-btn>
        </v-card-title>
        <v-card-text class="pa-0">
          <template>
            <v-data-table
              :headers="headers"
              :pagination.sync="pagination"
              :rows-per-page-items="pagination.rowsPerPageItems"
              :total-items="pagination.totalItems"
              :loading="loading"
              :items="list"
            >
              <template v-slot:items="props">
                <td>{{ props.item.name }}</td>
                <td>{{ props.item.email }}</td>
                <td>{{ props.item.phoneNumber }}</td>
                <td>{{ props.item.role }}</td>
                <td>{{ props.item.position }}</td>
                <td class="justify-center layout px-0">
                  <v-btn 
                    icon
                    :to="'/users/'+props.item.id"
                  >
                    <v-icon small> search </v-icon>
                  </v-btn>
                  <v-btn 
                    icon
                    :to="'/users/'+props.item.id+'/edit'"
                  >
                    <v-icon small> edit </v-icon>
                  </v-btn>
                  <v-btn 
                    icon
                    @click="id= props.item.id; dialog = true;"
                  >
                  <v-icon small > delete </v-icon>
                  </v-btn>
                </td>
              </template>
              <template v-slot:no-results>
                <v-alert :value="true" color="error" icon="warning">
                  no results.
                </v-alert>
              </template>
            </v-data-table>
          </template>
        </v-card-text>
      </v-card>
    </v-container>
    <v-dialog v-model="dialog" persistent max-width="500px">
      <v-card>
        <v-card-title>
          <span class="headline">Delete Item</span>
        </v-card-title>
        <v-card-text>
          <v-container grid-list-md>
            <v-layout wrap>
              Apakah Anda yakin akan menghapus user dengan id : {{id}} ?
            </v-layout>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" @click="dialog = false" flat >Batal</v-btn>
          <v-btn color="blue darken-1" @click="destroy" flat >OK</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import {mapState} from 'vuex';

export default {
  async fetch({store}) {
    await store.dispatch('users/get')
  },
  computed: {
    pagination: {
      get: function () {
        return this.$store.getters['users/pagination'];
      },
      set: function (value) {
        this.$store.commit('users/setPagination', value)
      }
    },
    params: {
      get: function () {
        return this.$store.getters['users/params'];
      },
      set: function (value) {
        this.$store.commit('users/setParams', {name: this.name})
      }
    },
    ...mapState({
      list: (state) => {
        return state.users.list
      },
    }),
  },
  watch: {
    pagination: {
      handler () {
        this.loading = true
        this.$store.dispatch('users/get')
          .then(result => {
            this.loading = false
          })
      },
      deep: true
    },
  },
  data() {
    return {
      loading: false,
      name: '',
      dialog: false,
      editedIndex: -1,
      id: 0,
      headers: [
        { text: 'Nama', value: 'name', sortable: false},
        { text: 'Email', value: 'email' },
        { text: 'No Telepon', value: 'phoneNumber' },
        { text: 'Role', value: 'role' },
        { text: 'Position', value: 'position' },
        { text: 'Actions', value: 'action', sortable: false }
      ],
    }
  },
  methods: {
    destroy() {
      this.$store.dispatch('users/delete', {id: this.id}).then(() => { 
        this.$store.dispatch('users/get');
        this.dialog = false;
        } );
    },
    filter() {
      this.loading = true
      this.$store.dispatch('users/get')
        .then(result => {
          this.loading = false
        })
    }
  }
}
</script>