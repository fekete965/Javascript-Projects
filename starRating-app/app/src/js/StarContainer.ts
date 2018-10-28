import { Star } from './Star';
import * as classNames from './../scss/main.scss';

export class StarContainer {
	private _backgroundColor: string;

	private _callback: (value?: number) => void;

	private _el: HTMLDivElement;

	private _fontColor: string;

	private _isEnabled: boolean;

	private _label: HTMLLabelElement;

	private _parentEl: HTMLElement;

	private _ratingText: string[] = [];

	private _stars: Star[] = [];

	private _value: number = -1;

	constructor(
		parentEl: HTMLElement,
		backgroundColor: string = '#ef7d22',
		fontColor: string = '#fff',
		initialValue: number = -1,
		isEnabled: boolean = true,
		callback?: (value?: number) => void
	) {
		this._parentEl = parentEl;
		this._backgroundColor = backgroundColor;
		this._fontColor = fontColor;
		this._isEnabled = isEnabled;
		this._callback = callback;

		this._ratingText = ['1/5 - I hate it', "2/5 - I don't like it", "3/5 - It's okay", '4/5 - I like it', '5/5 - I love it'];

		this.createEl();

		this.value = initialValue;

		if (this._isEnabled === true) {
			this._el.addEventListener('click', e => this.handleClick(e));
			this._el.addEventListener('mousemove', e => this.handleMouseMove(e));
			this._el.addEventListener('mouseout', e => this.handleMouseOut(e));
		};
	}

	public get value(): number {
		return this._value;
	}

	public set value(value: number) {
		if (value != this._value) {
			this._value = value;

			this.updateStars();
			this.starHover(-1); // Remove hover temporarily

			if (this._callback) {
				this._callback(this._value);
			}
		}
	}

	private createEl(): void {
		// Create star container
		this._el = document.createElement('div');
		this._el.className = classNames['rating-stars-container'];
		this._el.style.color = this._backgroundColor;

		// Create stars
		for (let i = 0; i < 5; i++) {
			const star = new Star();

			this._el.appendChild(star.el);
			this._stars.push(star);
		}

		// Create label
		this._label = document.createElement('label');
		this._label.className = classNames['rating-label'];
		this._label.style.background = this._backgroundColor;
		this._label.style.color = this._fontColor;

		const labelCont = document.createElement('div');
		labelCont.className = classNames['rating-label-container'];
		labelCont.appendChild(this._label);

		// Append to parent
		this._parentEl.appendChild(this._el);
		this._parentEl.appendChild(labelCont);
	}

	private handleClick(e: MouseEvent): void {
		let selectedIndex = -1;
		this._stars.forEach((star, index) => {
			if (star.el === e.target) {
				selectedIndex = index;
			}
		});

		this._el.classList.remove(classNames['hover']);

		this.value = this.value != selectedIndex ? selectedIndex : -1;
	}

	private handleMouseMove(e: MouseEvent): void {
		let selectedIndex = -1;
		this._stars.forEach((star, index) => {
			if (star.el === e.target) {
				selectedIndex = index;
			}
		});

		this._el.classList.add(classNames['hover']);

		this.starHover(selectedIndex);
	}

	private handleMouseOut(e: MouseEvent): void {
		this.starHover(-1);
		this._el.classList.remove(classNames['hover']);
	}

	private starHover(hoveredIndex: number): void {
		this._stars.forEach((e, i) => {
			e.el.classList.toggle(classNames['hover'], i <= hoveredIndex);
		});

		this.updateLabel(hoveredIndex);
	}

	private updateLabel(selectedIndex: number): void {
		if (selectedIndex >= 0) {
			this._label.innerHTML = this._ratingText[selectedIndex];
			this._label.classList.add(classNames['show-label']);
		} else {
			this._label.innerHTML = '';
			this._label.classList.remove(classNames['show-label']);
		}
	}

	private updateStars(): void {
		this._stars.forEach((e, i) => {
			e.selected = i <= this._value;
		});
	}
}
