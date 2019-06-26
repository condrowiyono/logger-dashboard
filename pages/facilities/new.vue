<template>
  <div>
    <page-header :title="'Tambah Fasilitas'" :to="'/facilities'" />
    <v-container fluid>
      <v-card>
        <v-card-title class="headline">Buat Fasilitas Baru</v-card-title>
        <v-card-text>
          <v-form
            ref="form"
            method="post" 
            v-model="valid"
            lazy-validation
            @submit.prevent="save"
          >
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
    }),

    methods: {
      reset () {
        this.$refs.form.reset()
      },
      save() {
        if (this.$refs.form.validate()) {
          var params = {
            name : this.name,
            desc : this.desc,
          }
          this.$store.dispatch('facilities/create', params)
            .then((resp) => {
              this.$router.push('/facilities')
            })
            .catch((resp) => {
              console.log(resp);
            })
        }
      }
    }
  }
</script>
