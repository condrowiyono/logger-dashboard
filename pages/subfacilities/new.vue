<template>
  <div>
    <page-header :title="'Tambah Sub Fasilitas'" :to="'/subfacilities'" />
    <v-container fluid>
      <v-card>
        <v-card-title class="headline">Buat Sub Fasilitas Baru</v-card-title>
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
              :items="items"
              :rules="[() => !!facility || 'This field is required']"
              label="Pilih Fasilitas"
            ></v-select>

            <v-text-field
              v-model="name"
              label="Name"
              :rules="[() => !!name || 'This field is required']"
            ></v-text-field>
            
            <v-textarea
              name="input-7-1"
              label="Deskripsi"
              v-model="desc"
              hint="Deskripsi"
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
      desc: '',
      facility: '',
      items: [],
    }),
    created() {
      this.loadFacility();
    },

    methods: {
      loadFacility() {
        this.$axios.get(`/facilities/get-all`)
        .then((res) => {
          if (res.status === 200) {
            this.items = res.data.data.map(el => {return {text: el.name, value: el.id}});
          }
        })
      },
      reset () {
        this.$refs.form.reset()
      },
      save() {
        if (this.$refs.form.validate()) {
          var params = {
            facility_id: this.facility,
            name : this.name,
            desc : this.desc,
          }
          this.$store.dispatch('subfacilities/create', params)
            .then((resp) => {
              this.$router.push('/subfacilities')
            })
            .catch((resp) => {
              console.log(resp);
            })
        }
      }
    }
  }
</script>
