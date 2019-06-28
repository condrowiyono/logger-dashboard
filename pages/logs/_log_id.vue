<template>
  <v-layout>
    <v-flex id="printable" >
      <div style="padding:16px" class="text-xs-center">
        <div style="font-family: 'Oxygen Mono', monospace; font-size:14px">{{item.equipment.qrcode}}</div>
        <div style="width:100px;height:100px;margin:auto">
          <qr-code :size="100" v-if="item.equipment.qrcode" :text="item.equipment.qrcode"></qr-code>
        </div>
        <br/>
        <div class="title">{{item.equipment.name}} <v-btn icon @click="print" ><v-icon>print</v-icon></v-btn></div>
      </div>
      <div class="v-subheader theme--light">Informasi Waktu</div>
      <v-container fluid>
        <div style="margin-bottom:16px">
          <div class="body-1 grey--text text--darken-1 ">Shift</div>
          <div class="subheading">{{item.shift}}</div>
        </div>
        <div style="margin-bottom:16px">
          <div class="body-1 grey--text text--darken-1 ">Tanggal</div>
          <div class="subheading">{{$moment(item.date).format('dddd, Do MMMM  YYYY')}}</div>
        </div>
        <div style="margin-bottom:16px">
          <div class="body-1 grey--text text--darken-1 ">Jam</div>
          <div class="subheading">{{item.time}}</div>
        </div>
      </v-container>
      <div class="v-subheader theme--light">Informasi Pekerjaan</div>
      <v-container fluid>
        <div style="margin-bottom:16px">
          <div class="body-1 grey--text text--darken-1 ">Uraian Pekerjaan</div>
          <div class="subheading">{{item.jobDesc}}</div>
        </div>
        <div style="margin-bottom:16px">
          <div class="body-1 grey--text text--darken-1 ">Tindaki Lanjut</div>
          <div class="subheading">{{item.followUp}}</div>
        </div>
        <div style="margin-bottom:16px">
          <div class="body-1 grey--text text--darken-1 ">Keterangan</div>
          <div class="subheading">{{item.desc}}</div>
        </div>
      </v-container>
      <div class="v-subheader theme--light">Gambar</div>
      <v-container grid-list-md >
        <v-layout row wrap>
          <v-flex xs3 v-for="(image,idx) in item.images" :key="idx">
            <!-- <v-img
              :src="image.path"
              aspect-ratio="1"
              
              max-width="200"
              max-height="200"
              min-width="100"
              min-height="100"
              style="margin:5px"
            >
            </v-img> -->
            <img :src="image.path" 
              width="200"
              height="200" />
          </v-flex>
        </v-layout>
      </v-container>
    </v-flex>
  </v-layout>
</template>
<script>

import {mapState} from 'vuex';
import { Printd } from 'printd';
const d = new Printd();

export default {
  async fetch({store, params}) {
    await store.dispatch('logs/show', {log_id: params.log_id});
  },
  computed: {
    ...mapState({
      item: state => {
        return state.logs.item
      },
    }),
  },
  methods: {
    print() {
       d.print( document.getElementById('printable'), [`@media print{table ,td, th {border-collapse: collapse; padding:2px;border:1px solid black;} .no-print, .no-print *, button, .v-btn * {display: none !important;}}`] )
    },
  }
}
</script>