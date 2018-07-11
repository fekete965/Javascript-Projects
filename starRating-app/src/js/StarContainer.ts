import { Star } from './Star';

export class StarContainer {

    public starsCont: HTMLDivElement;

    public labelCont: HTMLDivElement;

    public label: HTMLLabelElement;

    public stars: Star[] = [];

    public ratingText: string[] = [];

    public targetDiv: HTMLElement;

    public lastSelectedIndex: number = -1;


    constructor(

        targetDiv: HTMLElement
    ) {
        this.ratingText = ["1/5 - I hate it", "2/5 - I don't like it","3/5 - It's okay", "4/5 - I like it", "5/5 - I love it"];
        
        this.targetDiv = targetDiv;


        this.createStarsCont();

        this.createStars();

        this.createLabelCont();

        this.createLabel();


        this.appendAll();

        this.starsCont.addEventListener('mousemove', (e) => {
            const starsContBox = this.starsCont.getBoundingClientRect();

            const starsIndex = Math.floor((e.pageX - starsContBox.left) / starsContBox.width * this.stars.length);

            this.starsCont.classList.add('hover');

            this.starHover(starsIndex);
        });

        this.starsCont.addEventListener('mouseout', (e) => {
            this.starHover(-1);
            this.starsCont.classList.remove('hover');
        });

        this.starsCont.addEventListener('click', (e) => {
            const starsContBox = this.starsCont.getBoundingClientRect();
            
            const starsIndex = Math.floor((e.pageX - starsContBox.left) / starsContBox.width * this.stars.length);

            this.starsCont.classList.remove('hover');
            
            this.starFill(starsIndex);
            this.starHover(-1);

        });
        
    }

    private createStarsCont() {
        this.starsCont = document.createElement('div');
        this.starsCont.className = 'rating-stars-container';
    }


    private createStars() {
        for (let i = 0; i < 5; i++) {
            const star = new Star(this.ratingText[i], i, false);

            this.starsCont.appendChild(star.htmlRef);
            this.stars.push(star);
        }
    }


    private createLabelCont() {
        this.labelCont = document.createElement('div');
        this.labelCont.className = 'rating-label-container';
    }


    private createLabel() {
        this.label = document.createElement('label');
        this.label.className = 'rating-label';
        this.label.innerHTML = 'rating-label';
        this.labelCont.appendChild(this.label);
    }


    private appendAll() {
        this.targetDiv.appendChild(this.starsCont);
        this.targetDiv.appendChild(this.labelCont);
    }


    public starHover(index: number) {
        this.stars.forEach( (e, i) => {
            e.htmlRef.classList.toggle('hover', i <= index);
        });

        this.labelToggle(index);
    }

    public starFill(index: number) {
        const target = this.stars[index];

        this.stars.forEach( (e, i) => {
            e.htmlRef.classList.toggle('full', (i <= index && !target.starSelected));
            if (i === index) { e.starSelected = !e.starSelected } else { e.starSelected = false; };
        });

        this.lastSelectedIndex = target.starSelected ? index : -1;
    }

    public labelToggle(index: number) {
        
        if (index >= 0) {
            this.label.innerHTML = this.ratingText[index];
            this.labelCont.classList.add('show');
        } else if (this.lastSelectedIndex != -1) {
            this.label.innerHTML = this.ratingText[this.lastSelectedIndex];
        } else {
            this.label.innerHTML = '';
            this.labelCont.classList.remove('show');
        }
    }

}
    