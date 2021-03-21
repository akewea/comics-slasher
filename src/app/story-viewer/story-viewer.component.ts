import { Component, OnInit } from '@angular/core';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { MatSliderChange } from '@angular/material/slider';
import { Board, Box, Story } from '../service/story.model';
import { StoryService } from '../service/story.service';

@Component({
  selector: 'app-story-viewer',
  templateUrl: './story-viewer.component.html',
  styleUrls: ['./story-viewer.component.scss']
})
export class StoryViewerComponent implements OnInit {

  story: Story;

  constructor(
    public storyService: StoryService,
  ) {
    this.story = storyService.getSampleStory();
  }

  ngOnInit(): void {
  }

  updateHeight(box: Box, event: MatSliderChange): void {
    if(!box.layout) {
      box.layout = {};
    }
    box.layout.height = event.value || undefined;
  }

  updateWidth(box: Box, event: MatSliderChange): void {
    if(!box.layout) {
      box.layout = {};
    }
    box.layout.width = event.value || undefined;
  }

  updateNewLine(box: Box, event: MatSlideToggleChange): void {
    if(!box.layout) {
      box.layout = {};
    }
    box.layout.newLine = event.checked;
  }

  getBoxLine(board: Board | undefined, box: Box): Box[] | undefined {
    const lines = this.getLines(board);
    for (let index = 0; index < lines.length; index++) {
      if(lines[index].indexOf(box) >= 0){
        return lines[index];
      }
    }
    return undefined;
  }

  getLines(board: Board | undefined): Box[][] {
    const lines: Box[][] = [];
    if (board?.boxes) {
      let line: Box[] = [];
      let newLine = false;
      for (const box of board.boxes) {
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

}
