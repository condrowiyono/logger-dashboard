<template>
<div>
    <page-header :title="'Edit User'" :to="'/users'" />
    <v-container fluid>
      <v-card>
        <v-card-title class="headline">Edit User</v-card-title>
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
          </v-form>
        </v-card-text>
      </v-card>
    </v-container>
</div>
</template>
<script>
  export default {
    async fetch({store, params}) {
      await store.dispatch('users/show', {user_id: params.user_id});
    },
    data() {
      return {
        valid: false,
        id: this.$store.state.users.user.id,
        name: this.$store.state.users.user.name,
        username: this.$store.state.users.user.username,
        email: this.$store.state.users.user.email,
        phoneNumber: this.$store.state.users.user.phoneNumber,
        role: this.$store.state.users.user.role,
        position: this.$store.state.users.user.position,
        address: this.$store.state.users.user.address,
        roles: [
          'member',
          'admin',
        ],
      }
    },

    methods: {
      reset () {
        this.$refs.form.reset()
      },
      save() {
        if (this.$refs.form.validate()) {
          var params = {
            id : this.id,
            name : this.name,
            username : this.username,
            email : this.email,
            phone_number : this.phoneNumber,
            role : this.role,
            position : this.position,
            address : this.address,
          }
          this.$store.dispatch('users/update', params)
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
