import './assets/main.scss'
import { createApp } from 'vue'
import { createPinia } from 'pinia'

import router from './router'
import App from './App.vue'

import HeaderComponent from "@/components/HeaderComponent.vue";
import Navigation from "@/components/Navigation.vue";
import AudioPlayerComponent from "@/components/AudioPlayerComponent.vue";
import Songs from "@/views/Songs.vue";
import Login from '@/views/Login.vue'

const app = createApp(App)

app.component('Header', HeaderComponent);
app.component('Navigation', Navigation);
app.component('AudioPlayer', AudioPlayerComponent);
app.component('Songs', Songs);
app.component('Login', Login);

app.use(createPinia())
app.use(router)

app.mount('#app')
