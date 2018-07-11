import './classList.js';
import { StarContainer } from './StarContainer';
import '../scss/main.scss';

export function StarRating(targetId: string): StarContainer {
    
    if (typeof targetId === 'string') {

        const targetDiv = document.getElementById(targetId);
        const rating = new StarContainer(targetDiv);

        return rating;
    } else {
        return undefined;
    };

}

StarRating('rating-container');