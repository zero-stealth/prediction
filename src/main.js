import { createApp } from 'vue'
import { createPinia } from 'pinia'

// /--- app ---/ //
import App from './App.vue'
// /--- app ---/ //

import router from './router'
import './style/global.css'

import i18n from './i18n'


const app = createApp(App)


app.use(createPinia())
app.use(i18n)
app.use(router)
app.mount('#app')
