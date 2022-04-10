import { PipeTransform, Pipe } from '@angular/core';

// Pipe pour l'affichage de la première lettre du prénom dans les commentaires
@Pipe({
  name: 'firstChar',
})
export class SplitPipe implements PipeTransform {
  transform(input: string | undefined): string {
    return (input ?? '').slice(0, 1);
  }
}
