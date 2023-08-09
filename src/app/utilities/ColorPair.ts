export function getColor(typePair: string) {
	let color = ''
	switch (typePair) {
		case 'пр':
			color = 'rgba(115, 120, 255, 0.69)'
			break
		case 'лк':
			color = 'rgba(143, 31, 255, 0.69)'
			break
		case 'с/р':
			color = 'rgba(255, 74, 139, 0.69)'
			break
		case 'лаб':
			color = 'rgba(255, 92, 0, 0.7)'
			break
		default:
			color = 'rgba(255, 0, 0, 0.69)'
			break
	}
	return color
}