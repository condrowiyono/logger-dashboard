<template>
  <div>
    <page-header :title="'Petunjuk Penggunaan'" />
    <v-container fluid>
      <v-card>
        <v-card-text>
          <p>Website ini adalah website untuk mengelola peralatan dan juga data log yang dimasukkan oleh petugas</p>
          <p>Halam Utama menampilkan kalendar bulan beserta dengan isian/catatan per hari nya. Klik hari untuk melihat catatan dalam hari tersebut</p>
          <p class="title"> User</p>
          <p class="subheading">Membuat User Baru</p>
          <ol>
            <li> Silakan klik menu  <v-icon>person</v-icon> <span class="body-2">User</span>  pada bilah menu disamping kiri</li>
            <li> Silakan tekan tombol <v-btn flat color="primary">TAMBAH BARU</v-btn> untuk menambahkan user baru  </li>
            <li> Isi semua data yang diperlukan </li>
            <li> Kemudian klik <v-btn> SIMPAN </v-btn></li>
          </ol>
          <p class="subheading">Mengelola User</p>
          <ol>
            <li> Silakan klik menu  <v-icon>person</v-icon> <span class="body-2">User</span>  pada bilah menu disamping kiri</li>
            <li> Data user akan muncul</li>
            <li> Ketikkan nama pengguna diikuti Enter untuk melakukan pencarian </li>
            <li> Klik ikon <v-icon>search</v-icon> untuk melihat detail</li>
            <li> Klik ikon <v-icon>edit</v-icon> untuk mengedit</li>
            <li> Klik ikon <v-icon>delete</v-icon> untuk menghapus</li>
          </ol>
          <br/>
          <p class="title"> Fasilitas dan Sub Fasilitas</p>
          <p>Fasilitas dan Sub Fasilitas adalah data yang menyatakan kelompok dari sebuah peralatan. Data ini diperlukan untuk membuat sebuah peralatan baru</p>
          <p class="subheading">Mebuat baru</p>
          <ol>
            <li> Silakan klik menu  <v-icon>bookmarks</v-icon><span class="body-2">Fasilitas</span>/<v-icon>bookmark</v-icon> <span class="body-2">Subfasilitas</span>  pada bilah menu disamping kiri</li>
            <li> Silakan tekan tombol <v-btn flat color="primary">TAMBAH BARU</v-btn> untuk menambahkan  baru  </li>
            <li> Isi semua data yang diperlukan </li>
            <li> Kemudian klik <v-btn> SIMPAN </v-btn></li>
          </ol>
          <p class="subheading">Mengelola</p>
          <ol>
            <li> Silakan klik menu  <v-icon>bookmarks</v-icon><span class="body-2">Fasilitas</span>/<v-icon>bookmark</v-icon><span class="body-2">Subfasilitas</span>  pada bilah menu disamping kiri</li>
            <li> Data akan muncul</li>
            <li> Ketikkan nama pengguna diikuti Enter untuk melakukan pencarian </li>
            <li> Klik ikon <v-icon>search</v-icon> untuk melihat detail</li>
            <li> Klik ikon <v-icon>edit</v-icon> untuk mengedit</li>
            <li> Klik ikon <v-icon>delete</v-icon> untuk menghapus</li>
          </ol>
          <br/>
          <p class="title"> Peralatan</p>
          <p>Peralatan adalah peralatan di Bandara yang akan diperiksa oleh petugas</p>
          <p class="subheading">Mebuat baru</p>
          <ol>
            <li> Silakan klik menu  <v-icon>business</v-icon><span class="body-2">Peralatan</span>  pada bilah menu disamping kiri</li>
            <li> Silakan tekan tombol <v-btn flat color="primary">TAMBAH BARU</v-btn> untuk menambahkan  baru  </li>
            <li> Isi semua data yang diperlukan </li>
            <li> Kemudian klik <v-btn> SIMPAN </v-btn></li>
          </ol>
          <p class="subheading">Mengelola</p>
          <ol>
            <li> Silakan klik menu  <v-icon>business</v-icon><span class="body-2">Peralatan</span>  pada bilah menu disamping kiri</li>
            <li> Data  akan muncul</li>
            <li> Ketikkan nama pengguna diikuti Enter untuk melakukan pencarian </li>
            <li> Data peralatan dapat didownload dalam format CSV/Excel melalui tombol <v-btn>DOWNLOAD</v-btn> </li>
            <li> Klik ikon <v-icon>search</v-icon> untuk melihat detail</li>
            <li> Klik ikon <v-icon>edit</v-icon> untuk mengedit</li>
            <li> Klik ikon <v-icon>delete</v-icon> untuk menghapus</li>
          </ol>
          <br/>
          <p class="title"> Logs</p>
          <p>Logs adalah catatan oleh petugas terhadap peralatan tertentu</p>
          <p class="subheading">Mengelola</p>
          <ol>
            <li> Silakan klik menu  <v-icon>history</v-icon><span class="body-2">Logs</span>  pada bilah menu disamping kiri</li>
            <li> Data user akan muncul</li>
            <li> Pilih tanggal (dari tanggal ke tanggal) untuk menampilkan data history dalam kurun waktu tertentu </li>
            <li> Data peralatan dapat didownload dalam format CSV/Excel melalui tombol <v-btn>DOWNLOAD</v-btn> </li>
            <li> Klik ikon <v-icon>search</v-icon> untuk melihat detail</li>
          </ol>
        </v-card-text>
      </v-card>
    </v-container>
  </div>
</template>
