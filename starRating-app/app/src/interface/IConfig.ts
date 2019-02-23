import { IClasses } from "./IClasses";

export interface IConfig {
	classes?: IClasses;
	initialValue?: number;
	disabled?: boolean;
	newRatingText?: string[];
	callback?: (value?: number) => void;
};