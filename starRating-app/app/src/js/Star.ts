import * as classNames from './../scss/main.scss';

export class Star {
	public el: HTMLDivElement;

	private _selected: boolean = false;

	constructor(selected: boolean = false) {
		this.el = document.createElement('div');

		this.el.className = classNames['rating-star'];

		this.selected = selected;
	}

	public get selected(): boolean {
		return this._selected;
	}

	public set selected(value: boolean) {
		if (value != this._selected) {
			this._selected = value;
			this.el.classList.toggle(classNames['full'], value);
		}
	}
}
