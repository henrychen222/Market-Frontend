import { Pipe, PipeTransform } from "@angular/core";

@Pipe({name: 'keys', pure: false})
export class KeysPipe implements PipeTransform {
    transform(value: any, args: any[] = null): any {
        return Object.keys(value);
    }
}

@Pipe({name: 'parenthes', pure: false})
export class ParenthesPipe implements PipeTransform {
  transform(value: string, args: any[] = null): any {
    return value.replace('.', '(') + ')';
  }
}
