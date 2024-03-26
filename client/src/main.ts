import { createApp } from "vue";
import App from "./App.vue";
import PrimeVue from "primevue/config";
import Lara from "./presets/lara";

import "./assets/tailwind.css";
import "./assets/base.css";
import "primeicons/primeicons.css";

// Router
import router from "./router";

createApp(App)
	.use(router)
	.use(PrimeVue, {
		unstyled: true,
		pt: Lara,
	})
	.mount("#app");
