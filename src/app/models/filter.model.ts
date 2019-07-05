import { Options } from 'ng5-slider';

export class Filter {
  constructor(minValue: number, maxValue: number) {
    this.minValue = minValue;
    this.maxValue = maxValue;
    this.options.floor = minValue;
    this.options.ceil = maxValue;
  }
  minValue: number;
  maxValue: number;
  options: Options = {
    floor: this.minValue,
    ceil: this.maxValue,
  };
}
