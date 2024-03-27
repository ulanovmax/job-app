import { createApp, h, provide } from "vue";
import { DefaultApolloClient } from "@vue/apollo-composable";
import PrimeVue from "primevue/config";

import "./assets/tailwind.css";
import "./assets/base.css";
import "primeicons/primeicons.css";

import { apolloClient } from "./apollo";
import App from "./App.vue";
import Lara from "./presets/lara";
// Router
import router from "./router";

createApp({
	setup() {
		provide(DefaultApolloClient, apolloClient);
	},

	render: () => h(App),
})
	.use(router)
	.use(PrimeVue, {
		unstyled: true,
		pt: Lara,
	})
	.mount("#app");
