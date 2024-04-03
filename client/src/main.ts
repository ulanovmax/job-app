import { createApp, h, provide } from "vue";
import { DefaultApolloClient } from "@vue/apollo-composable";
import PrimeVue from "primevue/config";
import ToastService from "primevue/toastservice";

// Pinia
import { createPinia } from "pinia";
import piniaPluginPersistedState from "pinia-plugin-persistedstate";

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
	.use(ToastService)
	.mount("#app");
