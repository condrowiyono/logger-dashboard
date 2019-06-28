<template>
  <div>
    <page-header :title="'Peralatan'" @on-print="print" />
    <v-container fluid>
      <v-card>
        <v-toolbar card  color="#fff">
          <v-toolbar-title>Manajemen Peralatan</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn flat color="blue darken-1" @click="download" >Download</v-btn>
          <v-btn flat color="blue darken-1" :to="'/equipments/new'" >Tambah Baru</v-btn>
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
        <v-card-text class="pa-0" id="printable">
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
                
                <td> {{ props.item.name }}
                  <v-tooltip bottom >
                    <template v-slot:activator="{ on }">
                      <v-icon class="no-print" v-on="on">more_horiz</v-icon>
                    </template>
                    <span>{{props.item.facility.name}} > {{props.item.subfacility.name}} </span>
                  </v-tooltip>
                </td>
                <td class="text-xs-center">{{ props.item.location }}</td>
                <td class="text-xs-center">{{ props.item.attributes }}</td>
                <td class="text-xs-center">{{ props.item.brand }}</td>
                <td class="text-xs-center">{{ props.item.quantity }}</td>
                <td class="text-xs-center">{{ props.item.yearInstalled }}</td>
                <td class="text-xs-center">{{ props.item.desc }}</td>
                <td class="justify-center layout px-0">
                  <v-btn 
                    icon
                    class="no-print" 
                    :to="'/equipments/'+props.item.id"
                  >
                    <v-icon small> search </v-icon>
                  </v-btn>
                  <v-btn 
                    icon
                    class="no-print" 
                    :to="'/equipments/'+props.item.id+'/edit'"
                  >
                    <v-icon small> edit </v-icon>
                  </v-btn>
                  <v-btn 
                    icon
                    class="no-print" 
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
              Apakah Anda yakin akan menghapus fasilitas dengan id : {{id}} ?
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
import { Printd } from 'printd';
const d = new Printd();

export default {
  async fetch({store}) {
    await store.dispatch('equipments/get')
  },
  computed: {
    pagination: {
      get: function () {
        return this.$store.getters['equipments/pagination'];
      },
      set: function (value) {
        this.$store.commit('equipments/setPagination', value)
      }
    },
    params: {
      get: function () {
        return this.$store.getters['equipments/params'];
      },
      set: function (value) {
        this.$store.commit('equipments/setParams', {name: this.name})
      }
    },
    ...mapState({
      list: state => {
        return state.equipments.list
      },
    }),
  },
  watch: {
    pagination: {
      handler () {
        this.loading = true
        this.$store.dispatch('equipments/get')
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
        { text: 'Nama Peralatan', value: 'name',sortable: false },
        { text: 'Lokasi', value: 'locations',sortable: false },
        { text: 'Tipe/Nomor Seri', value: 'attributes', sortable: false },
        { text: 'Merk', value: 'brand', sortable: false },
        { text: 'Jumlah', value: 'quantity', sortable: false },
        { text: 'Tahun Instalasi', value: 'yearInstalled', sortable: false },
        { text: 'Keterangan', value: 'desc', sortable: false },
        { text: 'Aksi', value: 'action', sortable: false },
      ],
    }
  },
  methods: {
    print() {
       d.print( document.getElementById('printable'), [`@media print{table ,td, th {border-collapse: collapse; padding:2px;border:1px solid black;} .no-print, .no-print *, button, .v-btn * {display: none !important;}}`] )
    },
    destroy() {
      this.$store.dispatch('equipments/delete', {id: this.id}).then(() => { 
        this.$store.dispatch('equipments/get');
        this.dialog = false;
        } );
    },
    filter() {
      this.loading = true
      this.$store.dispatch('equipments/get')
        .then(result => {
          this.loading = false
        })
    },
    download() {
      this.$axios.get('/equipments/download-csv', { responseType: 'blob'
      }).then((response) => {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'peralatan.csv');
        document.body.appendChild(link);
        link.click();
      });
    }
  }
}
</script>