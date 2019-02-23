import { IConfig } from '../interface/Iconfig';
import * as classNames from './../scss/main.scss';
import { Star } from './Star';

export class StarContainer {
	private _config?: IConfig;

	private _defaultRatingText: string[] = [
		'1/5 - I hate it',
		"2/5 - I don't like it",
		"3/5 - It's okay",
		'4/5 - I like it',
		'5/5 - I love it'
	];

	private _el: HTMLDivElement;

	private _span: HTMLSpanElement;

	private _rootEl: HTMLElement;

	private _ratingText: string[] = [];

	private _stars: Star[] = [];

	private _value: number = -1;


	constructor(
		root: HTMLElement,
		config?: IConfig
	) {
		this._rootEl = root;
		this.config = config;
	
		this.createEl();

		this.value = this.config !== undefined && this.config.initialValue - 1;

		if (typeof this.config.disabled !== 'string' && !this.config.disabled) {
			this._el.addEventListener('click', e => this.handleClick(e));
			this._el.addEventListener('mousemove', e => this.handleMouseMove(e));
			this._el.addEventListener('mouseout', e => this.handleMouseOut(e));
		};
	};


	public set config(newConfig: IConfig) {
		this._ratingText = Array.isArray(newConfig.newRatingText) && newConfig.newRatingText.length > 1 ? newConfig.newRatingText : this._defaultRatingText ;
		this._config = typeof newConfig === 'object' && Array.isArray(newConfig) === false ? newConfig : {};
	};

	public get config(): IConfig {
		return this._config;
	};

	public get value(): number {
		return this._value;
	};

	public set value(value: number) {
		if (typeof value === 'number' && value !== this._value) {
			this._value = Math.floor(value);

			this.updateStars();
			this.starHover(-1); // Remove hover temporarily
		};
	};



	private createEl(): void {
		const { classes } = this.config;

		// Create wrapper
		const wrapper = document.createElement('div');
		wrapper.style.display = 'inline-block';
		if (typeof classes.wrapper === 'string') {
			wrapper.classList.add(classes.wrapper);
		} else {
			wrapper.style.width = '270px';
		};

		// Create star container
		this._el = document.createElement('div');
		this._el.className = classNames['rating-stars-container'];
		if (classes !== undefined && typeof classes.starContainer === 'string') {
			this._el.classList.add(classes.starContainer);
		} else {
			this._el.style.color = '#ef7d22';
		};

		// Create star elements
		for (let i = 0; i < this._ratingText.length; i++) {
			const star = new Star();

			this._el.appendChild(star.el);
			this._stars.push(star);
		};

		// Create span container
		const span = document.createElement('div');
		span.className = classNames['rating-span-container'];
		if (classes !== undefined && typeof classes.spanContainer === 'string') {
			span.classList.add(classes.spanContainer);
		};
		// Create span element
		this._span = document.createElement('span');
		this._span.className = classNames['rating-span'];
		if (classes !== undefined && typeof classes.spanContainer === 'string') {
			this._span.classList.add(classes.span);
		} else {
			this._span.style.background = '#ef7d22';
			this._span.style.color = '#fff';
			this._span.style.fontFamily = 'Helvetica, Arial, sans-serif';
		};
		span.appendChild(this._span);

		// If class exist, add it to the root element
		if (classes !== undefined && typeof classes.root === 'string') {
			this._rootEl.classList.add(classes.root);
		};

		// Append to parent
		wrapper.appendChild(this._el);
		wrapper.appendChild(span);
		this._rootEl.appendChild(wrapper);
	};

	private handleClick(e: MouseEvent): void {
		const { callback } = this.config;
		let selectedIndex = -1;
		this._stars.forEach((star, index) => {
			if (star.el === e.target) {
				selectedIndex = index;
			};
		});

		this._el.classList.remove(classNames['hover']);

		this.value = this.value != selectedIndex ? selectedIndex : -1;

		if (typeof callback === 'function') {
			callback(this._value + 1);
		};
};

	private handleMouseMove(e: MouseEvent): void {
		let selectedIndex = -1;
		this._stars.forEach((star, index) => {
			if (star.el === e.target) {
				selectedIndex = index;
			};
		});

		this._el.classList.add(classNames['hover']);

		this.starHover(selectedIndex);
	};

	private handleMouseOut(e: MouseEvent): void {
		this.starHover(-1);
		this._el.classList.remove(classNames['hover']);
	};

	private starHover(hoveredIndex: number): void {
		this._stars.forEach((e, i) => {
			e.el.classList.toggle(classNames['hover'], i <= hoveredIndex);
		});

		this.updateSpan(hoveredIndex);
	};

	private updateSpan(selectedIndex: number): void {
		if (selectedIndex >= 0) {
			this._span.innerHTML = this._ratingText[selectedIndex];
			this._span.classList.add(classNames['show-span']);
		} else {
			this._span.innerHTML = '';
			this._span.classList.remove(classNames['show-span']);
		};
	};

	private updateStars(): void {
		this._stars.forEach((e, i) => {
			e.selected = i <= this._value;
		});
	};
};
