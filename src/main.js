import {
    createApp
} from "vue";
import router from "./router";
import store from "./store";
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'


import App from "./App.vue";
const app = createApp(App)
createApp(App).use(store).use(router).use(ElementPlus).mount("#app");