import { Component, OnInit } from '@angular/core';
import { NumberComposer } from './number-composer';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public positions = 2;
  public firstRegiments = 4;
  public secondRegiments = 3;
  public isCalculated = false;
  public table: string[][] = [];
  public optimalStrategies: string[] = [];

  public calculate(): void {
    this.isCalculated = true;
    const firstCompositions = this._getNumberCompositions(this.firstRegiments, this.positions);
    const secondCompositions = this._getNumberCompositions(this.secondRegiments, this.positions);
    this._fillGameMatrix(firstCompositions, secondCompositions);
  }

  public reset(): void {
    this.isCalculated = false;
    this.positions = 0;
    this.firstRegiments = 0;
    this.secondRegiments = 0;
    this.table = [];
    this.optimalStrategies = [];
  }

  public firstPlayerOptimal(): void {
    if (this.table.length === 0) {
      return;
    }


    let max = Number.MIN_SAFE_INTEGER;
    let optimalStrategies: string[] = [];

    for (let i = 1; i < this.table.length; i++) {
      const rowStrategy = this.table[i][0];
      let rowMin = Number.MAX_SAFE_INTEGER;

      for (let j = 1; j < this.table[i].length; j++) {
        rowMin = Math.min(rowMin, Number(this.table[i][j]));
      }

      if (rowMin > max) {
        max = rowMin;
        optimalStrategies = [rowStrategy];
      } else if (rowMin === max) {
        optimalStrategies.push(rowStrategy);
      }
    }

    this.optimalStrategies = optimalStrategies;
  }

  private _getNumberCompositions(n: number, length: number): number[][] {
    return new NumberComposer().getNumberCompositions(n, length);
  }

  private _fillGameMatrix(rows: number[][], columns: number[][]): void {
    this.table = [];
    for (let i = 0; i < rows.length + 1; i++) {
      this.table[i] = [];
    }

    for (let i = 0; i < columns.length; i++) {
      this.table[0][i + 1] = `(${columns[i]})`;
    }

    for (let j = 0; j < rows.length; j++) {
      this.table[j + 1][0] = `(${rows[j]})`;
    }

    this.fillResults(rows, columns);
  }

  private fillResults(firstPlayer: number[][], secondPlayer: number[][]): void {
    for (let i = 0; i < firstPlayer.length; i++) {
      for (let j = 0; j < secondPlayer.length; j++) {
        let wins = 0;

        for (let k = 0; k < this.positions; k++) {
          if (firstPlayer[i][k] === secondPlayer[j][k]) {
            continue;
          }

          const diff = firstPlayer[i][k] - secondPlayer[j][k];
          wins += diff > 0
            ? secondPlayer[j][k] + 1
            : -firstPlayer[i][k] - 1;
        }

        this.table[i + 1][j + 1] = wins.toString();
      }
    }
  }
}
