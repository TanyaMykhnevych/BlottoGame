import { Component, OnInit } from '@angular/core';
import { NumberComposer } from './number-composer';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public firstRegiments = 4;
  public firstPositions = 2;
  public secondRegiments = 3;
  public secondPositions = 2;
  public isCalculated = false;
  public table: string[][] = [];

  public calculate(): void {
    this.isCalculated = true;
    const firstCompositions = this._getNumberCompositions(this.firstRegiments, this.firstPositions);
    const secondCompositions = this._getNumberCompositions(this.secondRegiments, this.secondPositions);
    this._fillGameMatrix(firstCompositions, secondCompositions);
  }

  public reset(): void {
    this.isCalculated = false;
    this.firstRegiments = 0;
    this.firstPositions = 0;
    this.secondRegiments = 0;
    this.secondPositions = 0;
    this.table = [];
  }

  public firstPlayerOptimal(): void {
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
  }
}
