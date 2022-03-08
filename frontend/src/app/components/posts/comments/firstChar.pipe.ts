import { PipeTransform, Pipe } from '@angular/core';

@Pipe({
  name: 'firstChar',
})
export class SplitPipe implements PipeTransform {
  transform(input: string): string {
    console.log();
    return input.slice(0, 1);
  }
}
