<template>
  <div>
    <page-header :title="'Edit Peralatan'" :to="'/equipments'" />
    <v-container fluid>
      <v-card>
        <v-card-title class="headline">Edit Peralatan</v-card-title>
        <v-card-text>
          <v-form
            ref="form"
            method="post" 
            v-model="valid"
            lazy-validation
            @submit.prevent="save"
          >
            <v-select
              v-model="facility"
              :items="facilities"
              :rules="[() => !!facility || 'This field is required']"
              @change="loadSubFacility"
              label="Pilih Fasilitas"
            ></v-select>
            <v-select
              v-model="subfacility"
              :items="subfacilities"
              :rules="[() => !!subfacility || 'This field is required']"
              label="Pilih Sub Fasilitas"
            ></v-select>

            <v-text-field
              v-model="name"
              label="Nama Peralatan"
              :rules="[() => !!name || 'This field is required']"
            ></v-text-field>
            <v-text-field
              v-model="location"
              label="Lokasi"
              :rules="[() => !!location || 'This field is required']"
            ></v-text-field>
            <v-text-field
              v-model="attributes"
              label="Nomor Seri / Tipe"
            ></v-text-field>
            <v-text-field
              v-model="brand"
              label="Merek"
            ></v-text-field>
            <v-text-field
              v-model="quantity"
              label="Jumlah"
            ></v-text-field>
            <v-text-field
              v-model="yearInstalled"
              label="Tahun Instalasi"
            ></v-text-field>
            <v-textarea
              name="input-7-1"
              label="Keterangan"
              v-model="desc"
              hint="Keterangan"
            ></v-textarea>

            <v-btn
              type="submit"
            >
              Simpan
            </v-btn>
          </v-form>
        </v-card-text>
      </v-card>
    </v-container>
  </div>
</template>
<script>
  export default {
    async fetch({store, params}) {
      await store.dispatch('equipments/show', {equipment_id: params.equipment_id});
    },
    data() {
      return {
        valid: false,
        id: this.$store.state.equipments.item.id,
        name: this.$store.state.equipments.item.name,
        location: this.$store.state.equipments.item.location,
        attributes: this.$store.state.equipments.item.attributes,
        brand: this.$store.state.equipments.item.brand,
        quantity: this.$store.state.equipments.item.quantity,
        yearInstalled: this.$store.state.equipments.item.yearInstalled,
        desc: this.$store.state.equipments.item.desc,
        facility: this.$store.state.equipments.item.facility.id,
        facilities: [],
        subfacility: this.$store.state.equipments.item.subfacility.id,
        subfacilities: [],
      }
    },
    created() {
      this.loadFacility();
      this.loadSubFacility();
    },

    methods: {
      loadSubFacility() {
        this.$axios.get(`/facilities/${this.facility}`)
        .then((res) => {
          if (res.status === 200) {
            this.subfacilities = res.data.data.subfacilities.map(el => {return {text: el.name, value: el.id}});
          }
        })
      },
      loadFacility() {
        this.$axios.get(`/facilities/get-all`)
        .then((res) => {
          if (res.status === 200) {
            this.facilities = res.data.data.map(el => {return {text: el.name, value: el.id}});
          }
        })
      },
      reset () {
        this.$refs.form.reset()
      },
      save() {
        if (this.$refs.form.validate()) {
          var params = {
            id : this.id,
            name: this.name,
            location: this.location,
            attributes: this.attributes,
            brand: this.brand,
            quantity: this.quantity,
            year_installed: this.yearInstalled,
            desc: this.desc,
            facility_id: this.facility,
            subfacility_id: this.subfacility,
          }
          this.$store.dispatch('equipments/update', params)
            .then((resp) => {
              this.$router.push('/equipments')
            })
            .catch((resp) => {
              console.log(resp);
            })
        }
      }
    }
  }
</script>
