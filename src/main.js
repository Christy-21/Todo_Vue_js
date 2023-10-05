import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import 'bootstrap/dist/css/bootstrap.min.css'
import store from './store/store';
import VueKonva from 'vue-konva';
const app = createApp(App);

app.use(router);
app.use(store);
app.use(VueKonva);
app.mount("#app");
