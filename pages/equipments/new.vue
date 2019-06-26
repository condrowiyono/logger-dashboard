<template>
  <div>
    <page-header :title="'Tambah Peralatan'" :to="'/equipment'" />
    <v-container fluid>
      <v-card>
        <v-card-title class="headline">Buat Peralatan Baru</v-card-title>
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

            <v-btn
              @click="reset"
            >
              Reset
            </v-btn>
          </v-form>
        </v-card-text>
      </v-card>
    </v-container>
  </div>
</template>
<script>
  export default {
    data: () => ({
      valid: false,
      name: '',
      location: '',
      attributes: '',
      brand: '',
      quantity: '',
      yearInstalled: '',
      desc: '',
      facility: '',
      facilities: [],
      subfacility: '',
      subfacilities: [],
    }),

    created() {
      this.loadFacility();
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
          this.$store.dispatch('equipments/create', params)
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
