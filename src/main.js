import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-icons/font/bootstrap-icons.css'
import router from './router/index'
import store from './store/index'


const app =createApp(App)
app.use(router)
app.use(store)
app.mount('#app')
