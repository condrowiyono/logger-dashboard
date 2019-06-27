import Vue from 'vue'
import PageHeader from '~/components/PageHeader.vue'
import VueQRCodeComponent from 'vue-qrcode-component'

Vue.component('qr-code', VueQRCodeComponent)
Vue.component('page-header', PageHeader)