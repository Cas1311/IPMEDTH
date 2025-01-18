import './assets/main.css'


import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';
import router from './router';
import PrimeVue from 'primevue/config';
import { definePreset } from '@primevue/themes';
import Aura from '@primevue/themes/aura';
import axios from 'axios'
import ConfirmationService from 'primevue/confirmationservice';
import ToastService from 'primevue/toastservice';

const MyPreset = definePreset(Aura, {
    semantic: {
      primary: {
    
        50: '#eef8ff',
        100: '#dcf1ff',
        200: '#b2e4ff',
        300: '#6dcfff',
        400: '#20b6ff',
        500: '#009dff',
        600: '#007cdf',
        700: '#0062b4',
        800: '#005495',
        900: '#00447a',
        950: '#002c53',
  
      },
      colorScheme: {
        light: {
          primary: {
            color: "{primary.500}",
            contrastColor: "#ffffff",
            hoverColor: "{primary.600}",
            activeColor: "{primary.700}",
          },
          highlight: {
            background: "{primary.50}",
            focusBackground: "{primary.100}",
            color: "{primary.700}",
            focusColor: "{primary.800}",
          },
          surface: {
            50: '#eef8ff',
            100: '#dcf1ff',
            200: '#b2e4ff',
            300: '#6dcfff',
            400: '#20b6ff',
            500: '#009dff',
            600: '#007cdf',
            700: '#0062b4',
            800: '#005495',
            900: '#00447a',
            950: '#002c53',
      
          }
        },
  
        dark: {
          primary: {
            color: "{primary.400}",
            contrastColor: "{surface.900}",
            hoverColor: "{primary.300}",
            activeColor: "{primary.200}",
          },
          highlight: {
            background: "color-mix(in srgb, {primary.400}, transparent 84%)",
            focusBackground:
              "color-mix(in srgb, {primary.400}, transparent 76%)",
            color: "rgba(255,255,255,.87)",
            focusColor: "rgba(255,255,255,.87)",
          },
          surface: {
            0: '#ffffff',
            50: '{slate.50}',
            100: '{slate.100}',
            200: '{slate.200}',
            300: '{slate.300}',
            400: '{slate.400}',
            500: '{slate.500}',
            600: '{slate.600}',
            700: '{slate.700}',
            800: '{slate.800}',
            900: '{slate.900}',
            950: '{slate.950}'
          }
        }
      }
    }
  });

const pinia = createPinia()
const app = createApp(App)
app.use(pinia)
app.use(PrimeVue, {theme: {preset: MyPreset}});
app.use(router)
app.use(ConfirmationService);
app.use(ToastService);

app.mount('#app')



app.config.globalProperties.$axios = axios
axios.defaults.baseURL = import.meta.env.VITE_API_URL
