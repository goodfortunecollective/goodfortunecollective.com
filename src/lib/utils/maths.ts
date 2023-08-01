export const clamp = (value = 0, min = 0, max = 0) => {
	return Math.max(min, Math.min(value, max));
};

export const lerp = (source: number = 0, target: number = 0, amount: number = 0.1): number => {
	amount = amount < 0 ? 0 : amount;
	amount = amount > 1 ? 1 : amount;
	return (1 - amount) * source + amount * target;
};
