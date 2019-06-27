<template>
  <div>
    <page-header :title="'Sub Fasilitas'" />
    <v-container fluid>
      <v-card>
        <v-toolbar card  color="#fff">
          <v-toolbar-title>Log</v-toolbar-title>
          <v-spacer></v-spacer>
        </v-toolbar>
        <v-divider></v-divider>
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
                <td><nuxt-link :to="'/users/'+props.item.user.id">{{ props.item.user.name }}</nuxt-link></td>
                <td><nuxt-link :to="'/equipments/'+props.item.equipment.id">{{ props.item.equipment.name }}</nuxt-link></td>
                <td>{{ props.item.date }}</td>
                <td>{{ props.item.shift }}</td>
                <td>{{ props.item.time }}</td>
                <td>{{ props.item.jobDesc }}</td>
                <td>{{ props.item.followUp }}</td>
                <td>{{ props.item.desc }}</td>
                <td class="justify-center layout px-0">
                  <v-btn 
                    icon
                    :to="'/logs/'+ props.item.id"
                  >
                    <v-icon small> search </v-icon>
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
  </div>
</template>

<script>
import {mapState} from 'vuex';

export default {
  async fetch({store}) {
    await store.dispatch('logs/get')
  },
  computed: {
    pagination: {
      get: function () {
        return this.$store.getters['logs/pagination'];
      },
      set: function (value) {
        this.$store.commit('logs/setPagination', value)
      }
    },
    params: {
      get: function () {
        return this.$store.getters['logs/params'];
      },
      set: function (value) {
        this.$store.commit('logs/setParams', {name: this.name})
      }
    },
    ...mapState({
      list: state => {
        return state.logs.list
      },
    }),
  },
  watch: {
    pagination: {
      handler () {
        this.loading = true
        this.$store.dispatch('logs/get')
          .then(result => {
            this.loading = false
          })
      },
      deep: true
    }
  },
  data() {
    return {
      loading: false,
      dialog: false,
      editedIndex: -1,
      id: 0,
      name:'',
      headers: [
        { text: 'Pencatat', value: 'user',sortable: false },
        { text: 'Alat', value: 'equipment',sortable: false },
        { text: 'Tanggal', value: 'date',sortable: false },
        { text: 'Shift', value: 'shift',sortable: false },
        { text: 'Waktu/Jam', value: 'time',sortable: false },
        { text: 'Uraian Pekerjaan ', value: 'jobDesc',sortable: false },
        { text: 'Tindak Lanjut ', value: 'followUp',sortable: false },
        { text: 'Keterangan', value: 'desc',sortable: false },
        { text: 'Actions', value: 'action', sortable: false }
      ],
    }
  },
  methods: {
    filter() {
      this.loading = true
      this.$store.dispatch('logs/get')
        .then(result => {
          this.loading = false
        })
    }
  }
}
</script>