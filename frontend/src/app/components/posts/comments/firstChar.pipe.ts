import { PipeTransform, Pipe } from '@angular/core';

@Pipe({
  name: 'firstChar',
})
export class SplitPipe implements PipeTransform {
  transform(input: string | undefined): string {
    return (input ?? '').slice(0, 1);
  }
}
