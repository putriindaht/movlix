import { createApp, markRaw } from 'vue'
import { createPinia } from 'pinia'
import router from './router'
import vue3GoogleLogin from 'vue3-google-login'
import App from './App.vue'

const app = createApp(App)
const pinia = createPinia()

pinia.use(({ store }) => {
  store.router = markRaw(router)
})
app.use(vue3GoogleLogin, {
  clientId: '577460290760-mnaabeliaj82sol9ft3lbt1nir5ahjlj.apps.googleusercontent.com'
})

app.use(pinia)
app.use(router)

app.mount('#app')
