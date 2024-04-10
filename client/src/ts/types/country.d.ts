interface Country {
	capital: string;
	co2_emissions: number;
	currency: CountryCurrency;
	employment_agriculture: number;
	employment_industry: number;
	employment_services: number;
	exports: number;
	fertility: number;
	forested_area: number;
	gdp: number;
	gdp_growth: number;
	gdp_per_capita: number;
	homicide_rate: number;
	imports: number;
	infant_mortality: number;
	internet_users: number;
	iso2: string;
	life_expectancy_female: number;
	life_expectancy_male: number;
	name: string;
	pop_density: number;
	pop_growth: number;
	population: number;
	post_secondary_enrollment_female: number;
	post_secondary_enrollment_male: number;
	primary_school_enrollment_female: number;
	primary_school_enrollment_male: number;
	refugees: number;
	region: string;
	secondary_school_enrollment_female: number;
	secondary_school_enrollment_male: number;
	sex_ratio: number;
	surface_area: number;
	threatened_species: number;
	tourists: number;
	unemployment: number;
	urban_population: number;
	urban_population_growth: number;
}

interface CountryCurrency {
	code: string;
	name: string;
}

export type { Country, CountryCurrency };
