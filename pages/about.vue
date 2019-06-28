<template>
  <div>
    <page-header :title="'Petunjuk Penggunaan'" />
    <v-container fluid>
      <v-card>
        <v-card-text>
          <p>
            Aplikasi dikembangkan untuk membantu mencatatan log peralatan dilingkungan Bandara Pattimura Ambon
          </p>
          <v-container grid-list-sm fluid>
            <v-layout>
              <v-flex>
                <img src="/icon.png" style="width:100%"/>
              </v-flex>
            </v-layout>
          </v-container>
          <p>
            Dikembangkan dengan menggunakan Nuxt JS, untuk kontak pengembang silakan kunjungi halaman <a href="https://github.com/condrowiyono">Github</a>
          </p>
        </v-card-text>
      </v-card>
    </v-container>
  </div>
</template>
