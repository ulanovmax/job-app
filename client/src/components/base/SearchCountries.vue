<template>
	<Dropdown
		v-model="selectedCountry"
		:options="countries"
		option-label="name"
		placeholder="Type a Country"
		class="w-full"
		editable
		:loading="loading"
		@change="onChange"
	/>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import { useToast } from "vue-toastification";
import type { DropdownChangeEvent } from "primevue/dropdown";
import Dropdown from "primevue/dropdown";

import { getCountries } from "@/api/get-countries.api.ts";
import useDebounce from "@/hooks/useDebounce.ts";
import type { Country } from "@/ts/types/country";

interface Props {
	modelValue: string;
}

interface Emits {
	(e: "change", value: string): void;
	(e: "update:modelValue", value: string): void;
}

const emits = defineEmits<Emits>();
const props = defineProps<Props>();

const selectedCountry = computed({
	get() {
		return props.modelValue;
	},

	set(value) {
		emits("update:modelValue", value);
	},
});

const countries = ref<Array<Pick<Country, "name">>>([]);
const loading = ref(false);

const toast = useToast();

const onChange = (event: DropdownChangeEvent) => {
	selectedCountry.value = event.value?.name ?? event.value;

	loadCountries();
};

const loadCountries = useDebounce(async () => {
	loading.value = true;

	try {
		const countriesArray: Country[] = await getCountries(
			selectedCountry.value
		);

		countries.value = countriesArray.filter((item) => item.name);
	} catch (e) {
		toast.error("Couldn't find your country");
	} finally {
		loading.value = false;
	}
});
</script>

<style scoped></style>
