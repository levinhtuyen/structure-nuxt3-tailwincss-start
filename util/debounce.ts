/* eslint-disable @typescript-eslint/no-this-alias */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type Procedure = (...args: any[]) => any;

export type Options<TT> = {
	isImmediate?: boolean;
	maxWait?: number;
	callback?: (data: TT) => void;
};

export interface DebouncedFunction<F extends Procedure> {
	(this: ThisParameterType<F>, ...args: Parameters<F>): Promise<ReturnType<F>>;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	cancel: (reason?: any) => void;
}

export default function debounce<F extends Procedure>(
	func: F,
	waitMilliseconds = 50,
	options: Options<ReturnType<F>> = {},
): DebouncedFunction<F> {
	let timeoutId: ReturnType<typeof setTimeout> | undefined;
	const isImmediate = options.isImmediate ?? false;
	const callback = options.callback ?? false;
	const maxWait = options.maxWait;
	let lastInvokeTime = Date.now();

	let promises: {
		resolve: (x: ReturnType<F>) => void;
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		reject: (reason?: any) => void;
	}[] = [];

	function nextInvokeTimeout() {
		if (maxWait !== undefined) {
			const timeSinceLastInvocation = Date.now() - lastInvokeTime;

			if (timeSinceLastInvocation + waitMilliseconds >= maxWait) {
				return maxWait - timeSinceLastInvocation;
			}
		}

		return waitMilliseconds;
	}

	const debouncedFunction = function (
		this: ThisParameterType<F>,
		...args: Parameters<F>
	) {
		const context = this;
		return new Promise<ReturnType<F>>((resolve, reject) => {
			const invokeFunction = function () {
				timeoutId = undefined;
				lastInvokeTime = Date.now();
				if (!isImmediate) {
					const result = func.apply(context, args);
					// eslint-disable-next-line @typescript-eslint/no-unused-expressions
					callback && callback(result);
					promises.forEach(({ resolve }) => resolve(result));
					promises = [];
				}
			};

			const shouldCallNow = isImmediate && timeoutId === undefined;

			if (timeoutId !== undefined) {
				clearTimeout(timeoutId);
			}

			timeoutId = setTimeout(invokeFunction, nextInvokeTimeout());

			if (shouldCallNow) {
				const result = func.apply(context, args);
				// eslint-disable-next-line @typescript-eslint/no-unused-expressions
				callback && callback(result);
				return resolve(result);
			}
			promises.push({ resolve, reject });
		});
	};

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	debouncedFunction.cancel = function (reason?: any) {
		if (timeoutId !== undefined) {
			clearTimeout(timeoutId);
		}
		promises.forEach(({ reject }) => reject(reason));
		promises = [];
	};

	return debouncedFunction;
}
