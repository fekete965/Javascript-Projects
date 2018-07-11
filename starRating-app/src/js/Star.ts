 export class Star {

    public htmlRef: HTMLDivElement;

    constructor(
        
        public starText: string,

        public starValue: number,

        public starSelected: boolean
    ) {
        this.htmlRef = document.createElement('div');
        this.htmlRef.className = 'rating-star';
    }
}