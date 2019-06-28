<template>
  <div>
    <page-header :title="'Sub Fasilitas'" />
    <v-container fluid>
      <v-card>
        <v-toolbar card  color="#fff">
          <v-toolbar-title>Log</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn flat color="blue darken-1" @click="download" >Download</v-btn>
        </v-toolbar>
        <v-divider></v-divider>
        <v-divider></v-divider>
        <v-card-title>
        <v-layout row wrap>
          <v-flex xs4 sm4 md4>
            <v-menu
              ref="menuFrom"
              v-model="menuFrom"
              :close-on-content-click="false"
              :nudge-right="40"
              :return-value.sync="date.from"
              lazy
              transition="scale-transition"
              offset-y
              full-width
              min-width="290px"
            >
              <template v-slot:activator="{ on }">
                <v-text-field
                  v-model="date.from"
                  label="Dari Tanggal"
                  prepend-icon="event"
                  readonly
                  v-on="on"
                ></v-text-field>
              </template>
              <v-date-picker v-model="date.from" no-title scrollable>
                <v-spacer></v-spacer>
                <v-btn flat color="primary" @click="menuFrom = false">Cancel</v-btn>
                <v-btn flat color="primary" @click="$refs.menuFrom.save(date.from)">OK</v-btn>
              </v-date-picker>
            </v-menu>
          </v-flex>
          <v-flex xs4 sm4 md4>
            <v-menu
              ref="menuTo"
              v-model="menuTo"
              :close-on-content-click="false"
              :nudge-right="40"
              :return-value.sync="date.to"
              lazy
              transition="scale-transition"
              offset-y
              full-width
              min-width="290px"
            >
              <template v-slot:activator="{ on }">
                <v-text-field
                  v-model="date.to"
                  label="Dari Tanggal"
                  prepend-icon="event"
                  readonly
                  v-on="on"
                ></v-text-field>
              </template>
              <v-date-picker v-model="date.to" no-title scrollable>
                <v-spacer></v-spacer>
                <v-btn flat color="primary" @click="menuTo = false">Cancel</v-btn>
                <v-btn flat color="primary" @click="$refs.menuTo.save(date.to)">OK</v-btn>
              </v-date-picker>
            </v-menu>
          </v-flex>
          <v-flex xs4 sm4 md4>
            <v-btn color="primary" @click="filter"> Aktifkan Filter </v-btn>
            <v-btn color="warning" @click="resetFilter"> Reset Filter </v-btn>
          </v-flex>
        </v-layout>
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
  created() {
    const {date_from, date_to} = this.$route.query;
    this.$store.commit('logs/setParams', {dateFrom: date_from, dateTo: date_to})
    this.dateFrom = date_from;
    this.dateTo = date_to;
    this.$store.dispatch('logs/get')
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
        this.$store.commit('logs/setParams', {dateFrom: this.date.from, dateTo: this.date.to})
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
    },
  },
  data() {
    return {
      loading: false,
      dialog: false,
      editedIndex: -1,
      id: 0,
      name:'',
      menuFrom: false,
      menuTo: false,
      date: {
        from: new Date().toISOString().substr(0, 10),
        to : new Date().toISOString().substr(0, 10),
      },
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
      this.$store.commit('logs/setParams', {dateFrom: this.date.from, dateTo: this.date.to});
      this.loading = true
      this.$store.dispatch('logs/get')
        .then(result => {
          this.loading = false
          this.$router.push({path:'/logs', query: {date_from:this.date.from, date_to: this.date.to}})
        })
    },
    resetFilter() {
      this.date.from = new Date().toISOString().substr(0, 10);
      this.date.to = new Date().toISOString().substr(0, 10);
      this.$store.commit('logs/setParams', {dateFrom: null, dateTo: null})
      this.loading = true
      this.$store.dispatch('logs/get')
        .then(result => {
          this.loading = false
        })
    },
    download() {
      this.$axios.get('/logs/download-csv', { params: {date_from:this.params.dateFrom, date_to:this.params.dateTo}, responseType: 'blob'
      }).then((response) => {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'logs.csv');
        document.body.appendChild(link);
        link.click();
      });
    }
  }
}
</script>