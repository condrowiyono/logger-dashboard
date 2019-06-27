<template>
  <v-app>
    <v-navigation-drawer
      v-model="drawer"
      :mini-variant="miniVariant"
      :clipped="clipped"
      fixed
      app
    >
      <v-list>
        <v-list-tile
          v-for="(item, i) in items"
          :key="i"
          :to="item.to"
          router
        >
          <v-list-tile-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title v-text="item.title" />
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar
      :clipped-left="clipped"
      fixed
      app
    >
      <v-toolbar-side-icon @click="drawer = !drawer" />
      <v-btn
        icon
        @click.stop="miniVariant = !miniVariant"
      >
        <v-icon>{{ `chevron_${miniVariant ? 'right' : 'left'}` }}</v-icon>
      </v-btn>
      <v-btn
        icon
        @click.stop="clipped = !clipped"
      >
        <v-icon>web</v-icon>
      </v-btn>
      <v-btn
        icon
        @click.stop="fixed = !fixed"
      >
        <v-icon>remove</v-icon>
      </v-btn>
      <v-toolbar-title v-text="title" />
      <v-spacer />
      <v-menu offset-y origin="center center" :nudge-right="140" :nudge-bottom="10" transition="scale-transition">
        <v-btn icon large flat slot="activator">
          <v-icon>person</v-icon>
        </v-btn>
        <v-list class="pa-0">
          <v-list-tile ripple="ripple" rel="noopener">
            <v-list-tile-content>
              <v-list-tile-title>{{$auth.user.name}}</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
          <v-divider></v-divider>
          <v-list-tile :to="'/help'" ripple="ripple" rel="noopener">
            <v-list-tile-content>
              <v-list-tile-title>Petunjuk Penggunaan</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
          <v-list-tile ripple="ripple" rel="noopener">
            <v-list-tile-content>
              <v-list-tile-title>Tentang Aplikasi</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
          <v-list-tile @click="logout" ripple="ripple" rel="noopener">
            <v-list-tile-content>
              <v-list-tile-title>Logout</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list>
      </v-menu>
    </v-toolbar>
    <v-content>
      <v-container>
        <nuxt />
      </v-container>
    </v-content>
    <v-footer
      :fixed="fixed"
      app
    >
      <v-spacer/>
      <span>&copy; 2019</span>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      clipped: true,
      drawer: true,
      fixed: false,
      items: [
        {
          icon: 'home',
          title: 'Beranda',
          to: '/'
        },
        {
          icon: 'person',
          title: 'User',
          to: '/users'
        },
        {
          icon: 'bookmarks',
          title: 'Fasilitas',
          to: '/facilities'
        },
        {
          icon: 'bookmark',
          title: 'Sub Fasilitas',
          to: '/subfacilities'
        },
        {
          icon: 'business',
          title: 'Peralatan',
          to: '/equipments'
        },
        {
          icon: 'business',
          title: 'Log',
          to: '/logs'
        },
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'Logger - Aplikasi Saiffan'
    }
  },
  methods: {
    async logout() {
      await this.$auth.logout();
    },
  },
}
</script>
