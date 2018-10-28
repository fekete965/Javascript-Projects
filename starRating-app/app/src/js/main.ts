import './classList.js';
import { StarContainer } from './StarContainer';

/* Args:
 1 - targetDiv: HTMLElement - Required,
 2 - backgroundColor: string = '#ef7d22' - Optional
 3 - fontColor: string = '#fff' - Optional
 4 - initialValue: number - Optional
 5 - isEnabled: boolean - Optional
 6 - callback: Function = undefined - Optional

*/

export function create(
	target: string | HTMLElement,
	backgroundColor: string,
	fontColor: string,
	initialValue: number,
	isEnabled: boolean,
	callback?: (value?: number) => void
): StarContainer {
	let targetDiv: HTMLElement;

	if (typeof target === 'string') {
		targetDiv = document.getElementById(target);
	} else if (target) {
		targetDiv = target;
	} else {
		return undefined;
	}

	return new StarContainer(targetDiv, backgroundColor, fontColor, initialValue, isEnabled, callback);
}
