import { createApp, h, provide } from "vue";
import type { PluginOptions } from "vue-toastification";
import { POSITION } from "vue-toastification";
import Toast from "vue-toastification";
import { DefaultApolloClient } from "@vue/apollo-composable";
import PrimeVue from "primevue/config";

// Pinia
import { createPinia } from "pinia";
import piniaPluginPersistedState from "pinia-plugin-persistedstate";

import "vue-toastification/dist/index.css";
import "./assets/tailwind.css";
import "./assets/base.css";
import "primeicons/primeicons.css";

import { apolloClient } from "./apollo";
import App from "./App.vue";
import Lara from "./presets/lara";
// Router
import router from "./router";

const pinia = createPinia();
pinia.use(piniaPluginPersistedState);

// Toast options
const toastOptions: PluginOptions = {
	position: POSITION.BOTTOM_RIGHT,
	pauseOnHover: false,
};

const app = createApp({
	setup() {
		provide(DefaultApolloClient, apolloClient);
	},

	render: () => h(App),
});

app.use(router)
	.use(pinia)
	.use(PrimeVue, {
		unstyled: true,
		pt: Lara,
	})
	.use(Toast, toastOptions)
	.mount("#app");
