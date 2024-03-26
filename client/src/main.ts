import { createApp } from "vue";
import App from "./App.vue";
import PrimeVue from "primevue/config";
import Lara from "./presets/lara";

import "./assets/tailwind.css";
import "./assets/base.css";
// import "primevue/resources/themes/aura-dark-teal/theme.css";
// import "primevue/resources/primevue.min.css";

createApp(App)
	.use(PrimeVue, {
		unstyled: true,
		pt: Lara,
	})
	.mount("#app");
