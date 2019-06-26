<template>
  <div>
    <page-header :title="'Tambah User'" :to="'/users'" />
    <v-container fluid>
      <v-card>
        <v-card-title class="headline">Create New User</v-card-title>
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
            
            <v-text-field
              v-model="username"
              label="Username"
              :rules="[() => !!username || 'This field is required']"
            ></v-text-field>
            <v-text-field
              v-model="phoneNumber"
              label="Nomor Telepon"
              :rules="[() => !!phoneNumber || 'This field is required']"
            ></v-text-field>

            <v-text-field
              type="email"
              v-model="email"
              label="E-mail"
              :rules="[() => !!email || 'This field is required']"
            ></v-text-field>

            <v-text-field
              v-model="password"
              label="Password"
              type="password"
              :rules="[() => !!password || 'This field is required']"
            ></v-text-field>

            <v-select
              v-model="role"
              :items="roles"
              label="Role"
              required
            ></v-select>

            <v-text-field
              v-model="position"
              label="Posisi"
              required
            ></v-text-field>

            <v-text-field
              v-model="address"
              label="Alamat"
              required
            ></v-text-field>

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
      username: '',
      email: '',
      phoneNumber: '',
      password: '',
      role: null,
      position: '',
      address: '',
      roles: [
        'Member',
        'Admin',
      ],
    }),

    methods: {
      reset () {
        this.$refs.form.reset()
      },
      save() {
        if (this.$refs.form.validate()) {
          console.log('Validate');
          var params = {
            name : this.name,
            username : this.username,
            email : this.email,
            phone_number : this.phoneNumber,
            password : this.password,
            role : this.role,
            position : this.position,
            address : this.address,
          }
          this.$store.dispatch('users/create', params)
            .then((resp) => {
              this.$router.push('/users')
            })
            .catch((resp) => {
              console.log(resp);
            })
        }
      }
    }
  }
</script>
