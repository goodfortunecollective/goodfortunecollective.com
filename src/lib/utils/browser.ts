export function isMobile() {
	if (typeof window !== 'undefined') {
		return /Android|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i.test(
			navigator.userAgent
		);
	}

	return false;
}
