export default function useDebounce(
	callback: (...args: any[]) => Promise<void> | void,
	delay: number = 500
) {
	let timer: ReturnType<typeof setTimeout>;

	return function (...args: any[]) {
		clearTimeout(timer);

		timer = setTimeout(() => {
			// eslint-disable-next-line @typescript-eslint/no-unsafe-argument
			void callback(...args);
		}, delay);
	};
}
