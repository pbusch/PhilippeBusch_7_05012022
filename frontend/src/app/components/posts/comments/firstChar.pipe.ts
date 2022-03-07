import { PipeTransform, Pipe } from '@angular/core';

@Pipe({
  name: 'firstChar',
})
export class SplitPipe implements PipeTransform {
  transform(input: string): string {
    console.log();
    //return input.split(' ')[0];
    return input.slice(0, 1);
  }
}
