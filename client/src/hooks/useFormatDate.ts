export const useFormatDate = (date: string): string =>
	new Date(date.split("T")[0]).toDateString();
