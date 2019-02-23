import './classList.js';
import { StarContainer } from './StarContainer';
import { IConfig } from '../interface/IConfig.js';

// New Version:
// 	Args:
// 	 1 - targetDiv: string - Required,
//   2 - config : object - Optional 
//  	config props: 
// 			classes: object - Optional
// 			initialValue: number - Optional
//  		disabled: boolean - Optional
//  		ratingText string[] - Optional
//  		callback: Function - Optional
//  	
//		classes props:
// 			spanContainer: string - Optional 
// 			span: string - Optional 
// 			root: string - Optional 
// 			starContainer: string - Optional
// 			wrapper: string - Optional


export function create(
	target: string | HTMLElement,
	config: IConfig
): StarContainer {
	let targetDiv: HTMLElement;

	if (typeof target === 'string') {
		targetDiv = document.getElementById(target);
	} else if (target) {
		targetDiv = target;
	} else {
		return undefined;
	}

	return new StarContainer(targetDiv, config);
}
