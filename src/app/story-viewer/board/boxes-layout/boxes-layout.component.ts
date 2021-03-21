import { Component, Input, OnInit } from '@angular/core';
import { Board, Box } from 'src/app/service/story.model';

@Component({
  selector: 'app-boxes-layout',
  templateUrl: './boxes-layout.component.html',
  styleUrls: ['./boxes-layout.component.scss']
})
export class BoxesLayoutComponent implements OnInit {

  @Input() board: Board | undefined;

  constructor() { }

  ngOnInit(): void {
    console.log('getLines', this.getLines());
    console.log('getLinesHeight', this.getLinesHeight());
    console.log('getTotalHeight', this.getTotalHeight());
    if(!!this.board) {
      console.log('box 0 h', this.getBoxHeight(this.board?.boxes[0]));
      console.log('box 1 h', this.getBoxHeight(this.board?.boxes[1]));
      console.log('box 1 l', this.getBoxLineIndex(this.board?.boxes[1]));
    }
  }

  getBoxStyles(index: number) {
    if(!this.board) {
      return {};
    }

    const h = 100 * this.getBoxHeight(this.board?.boxes[index]) / this.getTotalHeight();
    const w = 100 * this.getBoxWidth(this.board?.boxes[index]) / this.getLineWidth(this.board?.boxes[index]);
    const t = 100 * this.getBoxHeightBefore(this.board?.boxes[index]) / this.getTotalHeight();
    const l = 100 * this.getBoxWidthBefore(this.board?.boxes[index]) / this.getLineWidth(this.board?.boxes[index]);

    return {
      position: 'absolute',
      width: w + '%',
      height: h + '%',
      top: t + '%',
      left: l + '%',
    }
  }

  getLines(): Box[][] {
    const lines: Box[][] = [];
    if (this.board?.boxes) {
      let line: Box[] = [];
      let newLine = false;
      for (const box of this.board?.boxes) {
        if (box.layout?.newLine) {
          lines.push(line);
          line = [];
        }
        line.push(box);
      }
      if(line.length > 0) {
        lines.push(line);
      }
    }
    return lines;
  }

  getLinesHeight(): number[] {
    const linesHeight: number[] = [];
    if (this.board?.boxes) {
      for (const line of this.getLines()) {
        linesHeight.push(this.getLineHeight(line));
      }
    }
    return linesHeight;
  }

  getLineHeight(line: Box[]): number {
    let height = 4;
    for (const box of line) {
      if ((box.layout?.rowSpan || 1) === 1) {
        height = box.layout?.height || height;
        break;
      }
    }
    return height;
  }

  getTotalHeight(): number {
    return this.getLinesHeight().reduce((previousValue, currentValue) => previousValue + currentValue, 0);
  }

  getBoxHeight(box: Box): number{
    const boxLineIndex = this.getBoxLineIndex(box);
    return this.getLinesHeight().reduce((previousValue, currentValue, currentIndex) => {
      if(currentIndex >= boxLineIndex && currentIndex < (boxLineIndex + (box.layout?.rowSpan || 1))) {
        return previousValue + currentValue;
      }
      return previousValue + 0;
    }, 0);
  }

  getBoxHeightBefore(box: Box): number{
    const boxLineIndex = this.getBoxLineIndex(box);
    return this.getLinesHeight().reduce((previousValue, currentValue, currentIndex) => {
      if(currentIndex < boxLineIndex) {
        return previousValue + currentValue;
      }
      return previousValue + 0;
    }, 0);
  }

  getBoxLineIndex(box: Box): number {
    const lines = this.getLines();
    for (let index = 0; index < lines.length; index++) {
      if(lines[index].indexOf(box) >= 0){
        return index;
      }
    }
    return -1;
  }

  getBoxLine(box: Box): Box[] | undefined {
    const lines = this.getLines();
    for (let index = 0; index < lines.length; index++) {
      if(lines[index].indexOf(box) >= 0){
        return lines[index];
      }
    }
    return undefined;
  }

  getBoxWidth(box: Box): number{
    return box.layout?.width || 4;
  }

  getBoxWidthBefore(box: Box): number{
    let width = 0;
    const line = this.getBoxLine(box);
    if(!!line) {
      for (const box2 of line) {
        if(box2 === box) {
          break;
        }
        width += box2.layout?.width || 4;
      }
    }
    return width;
  }

  getLineWidth(box: Box): number{
    let width = 0;
    this.getBoxLine(box)?.forEach((value) => (width += value.layout?.width || 4));
    return width;
  }

}


