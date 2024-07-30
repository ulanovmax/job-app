module.exports = {
	env: {
		browser: true,
		es2021: true,
		node: true,
	},
	extends: [
		"plugin:vue/vue3-recommended",
		"eslint:recommended",
		"prettier",
		"plugin:@typescript-eslint/strict",
		"plugin:@typescript-eslint/strict-type-checked",
	],
	overrides: [],
	parser: "vue-eslint-parser",
	parserOptions: {
		parser: {
			js: "@typescript-eslint/parser",
			ts: "@typescript-eslint/parser",
			"<template>": "espree",
		},
		ecmaVersion: 2015,
		sourceType: "module",
		allowImportExportEverywhere: true,
		project: true,
		tsconfigRootDir: __dirname,
		extraFileExtensions: [".vue"],
	},
	plugins: ["@typescript-eslint", "prettier", "simple-import-sort"],
	ignorePatterns: ["src/presets/**/*.js"],
	rules: {
		"@typescript-eslint/restrict-template-expressions": "off",
		"@typescript-eslint/no-explicit-any": "warn",
		"@typescript-eslint/no-confusing-void-expression": "off",
		"@typescript-eslint/await-thenable": "off",
		"@typescript-eslint/no-unsafe-return": "off",
		"@typescript-eslint/unified-signatures": "off",
		"@typescript-eslint/no-for-in-array": "error",
		"@typescript-eslint/no-non-null-asserted-optional-chain": "error",
		"@typescript-eslint/array-type": [
			"error",
			{ default: "array-simple", readonly: "array-simple" },
		],
		"@typescript-eslint/prefer-optional-chain": "error",
		"no-implied-eval": "off",
		"@typescript-eslint/no-implied-eval": "error",
		"no-unused-vars": "error",
		"@typescript-eslint/no-unused-vars": "error",
		"require-await": "off",
		"@typescript-eslint/require-await": "error",
		"default-param-last": ["error"],
		"@typescript-eslint/consistent-type-imports": [
			"error",
			{
				prefer: "type-imports",
			},
		],
		"no-restricted-imports": [
			"error",
			{
				patterns: ["../"],
			},
		],
		"@typescript-eslint/no-duplicate-enum-values": "error",
		"@typescript-eslint/no-duplicate-type-constituents": "error",
		// '@typescript-eslint/no-inferrable-types': 'error',
		"@typescript-eslint/method-signature-style": ["error", "property"],
		"@typescript-eslint/no-unsafe-member-access": "error",
		"vue/require-default-prop": "off",
		"vue/no-v-model-argument": "off",
		"vue/multi-word-component-names": "off",
		"vue/no-multiple-template-root": 0,
		"vue/block-lang": [
			"error",
			{
				script: {
					lang: "ts",
				},
			},
		],
		"vue/define-props-declaration": ["error", "type-based"],
		"vue/no-parsing-error": "off",
		"simple-import-sort/imports": [
			"error",
			{
				groups: [
					// Packages `Vue` related packages come first.
					["^vue", "^@?\\w"],
					// Components
					["^@/components?\\w"],
					// Enums
					["^@/ts/enums?\\w"],
					// Interfaces
					["^@/ts/interfaces?\\w"],
					// Utils
					["^@/utils?\\w"],
					// Store
					["^pinia", "^@/stores?\\w"],
					// Absolute imports and other imports such as Vue-style `@/foo`.
					// Anything not matched in another group.
					["^"],
					// Relative imports.
					// Anything that starts with a dot.
					["^\\."],
				],
			},
		],
		"simple-import-sort/exports": "error",
	},
	root: true,
};
