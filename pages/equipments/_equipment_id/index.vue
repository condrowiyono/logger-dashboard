<template>
  <div>
    <page-header :title="item.name" :to="'/equipments'" @on-print="print" />
    <v-container fluid id="printable">
      <v-card>
        <div style="padding:16px" text-xs-center>
          <qr-code v-if="item.qrcode" :text="item.qrcode"></qr-code>
          <div v-else>No Qr Code </div>
          <v-flex >
            <v-btn @click="regenerateQrcode" icon title="Regenerate qrcode">
              <v-icon>refresh</v-icon>
            </v-btn>
            <span style="font-family: 'Oxygen Mono', monospace; font-size:20px">{{item.qrcode}}</span>
          </v-flex>
        </div>
        <v-list two-line >
          <v-list-tile>
            <v-list-tile-content>
              <v-list-tile-sub-title>Fasilitas</v-list-tile-sub-title>
              <v-list-tile-title>{{item.facility.name}}</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
          <v-list-tile>
            <v-list-tile-content>
              <v-list-tile-sub-title>Sub Fasilitas</v-list-tile-sub-title>
              <v-list-tile-title>{{item.subfacility.name}}</v-list-tile-title>
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
              <v-list-tile-sub-title>Lokasi</v-list-tile-sub-title>
              <v-list-tile-title>{{item.location}}</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
          <v-list-tile>
            <v-list-tile-content>
              <v-list-tile-sub-title>Tipe / Nomor Seri</v-list-tile-sub-title>
              <v-list-tile-title>{{item.attributes}}</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
          <v-list-tile>
            <v-list-tile-content>
              <v-list-tile-sub-title>Merek</v-list-tile-sub-title>
              <v-list-tile-title>{{item.brand}}</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
          <v-list-tile>
            <v-list-tile-content>
              <v-list-tile-sub-title>Tahun Instalasi</v-list-tile-sub-title>
              <v-list-tile-title>{{item.yearInstalled}}</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
          <v-list-tile>
            <v-list-tile-content>
              <v-list-tile-sub-title>Jumlah</v-list-tile-sub-title>
              <v-list-tile-title>{{item.quantity}}</v-list-tile-title>
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
import { Printd } from 'printd';
const d = new Printd();

export default {
  async fetch({store, params}) {
    await store.dispatch('equipments/show', {equipment_id: params.equipment_id});
  },
  computed: {
    ...mapState({
      item: state => {
        return state.equipments.item
      },
    }),
  },
  methods: {
    print() {
      d.print( document.getElementById('printable'), [`@media print{table ,td, th {border-collapse: collapse; padding:2px;border:1px solid black;} .no-print, .no-print *, button, .v-btn * {display: none !important;}}`] )
    },
    regenerateQrcode() {
      this.$dialog.warning({
        persistent: true,
        title: 'Generate QR Ulang',
        text: `Apakah anda yakin untuk melakukan generate QRCODE ulang?`,
        actions: {
          false: 'Tidak',
          true: {
            text: 'Ya',
            handle: () => {
              this.$axios.put(`/equipments/generate-qrcode/${this.item.id}`,{}).then((res)=> {
                this.$dialog.message.success(res.data.message, { position: 'bottom'});
                this.$router.replace('/equipments')
              })
            }
          }
        }
      })
    }
  }
}
</script>