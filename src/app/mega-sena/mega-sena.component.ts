import { Component } from '@angular/core';

@Component({
  selector: 'app-mega-sena',
  templateUrl: './mega-sena.component.html',
  styleUrls: ['./mega-sena.component.css'],
})
export class MegaSenaComponent {
  number: number[] = [0, 0, 0, 0, 0, 0];
  catch: number[] = [];
  validation: any;
  error = '';

  megaSena(maxNumber = 61) {
    this.hits(() => {
      var random = Math.floor(Math.random() * maxNumber);
      for (var a = 0; a < 6; a++) {
        this.number[a] = random;
        while (this.number.includes(random)) {
          random = Math.floor(Math.random() * maxNumber);
        }
      }
    });
  }

  hits(callback: () => void) {
    const minNumber = 0;
    const maxNumber = 60;
    const minInputs = 6;

    for (let b = minNumber; b < minInputs; b++) {
      if (this.catch[b] < minNumber || this.catch[b] > maxNumber) {
        this.error = 'Digite um número entre 0 e 60';
        return;
      }
    }

    if (this.catch.length < minInputs) {
      this.error = 'Digite todos os números';
      return;
    }

    const hasDuplicate = new Set(this.catch).size !== this.catch.length;
    if (hasDuplicate) {
      this.error = 'Números duplicados não são permitidos';
      return;
    }

    this.error = '';
    document.getElementById('howMuch')?.classList.remove('hidden');
    let intersection = this.number.filter((x) => this.catch.includes(x)).length;

    this.validation = intersection;
    callback();
  }

  reset() {
    this.catch = [];
    this.number = [];
  }
}
