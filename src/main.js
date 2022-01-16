import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'

import CoreuiVue from '@coreui/vue'
import CIcon from '@coreui/icons-vue'
import { iconsSet as icons } from '@/assets/icons'
import DocsCallout from '@/components/DocsCallout'
import DocsExample from '@/components/DocsExample'

import JsonExcel from 'vue-json-excel'

import './registerServiceWorker'

axios.defaults.baseURL = 'https://api.passoloran.com/api/'
// axios.defaults.baseURL = 'http://127.0.0.1:8000/api/'
axios.withCredentials = false
// axios.headers = {
//   'X-CSRF-TOKEN': productToken,
// }

const app = createApp(App)
app.use(store)
app.use(router)
app.use(CoreuiVue)
app.provide('icons', icons)
app.component('CIcon', CIcon)
app.component('DocsCallout', DocsCallout)
app.component('DocsExample', DocsExample)
app.component('JsonExcel', JsonExcel)

app.mount('#app')
