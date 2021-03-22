import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild, ViewChildren } from '@angular/core';
import { Node } from 'src/app/service/story.model';
import * as uuid from 'uuid';

@Component({
  selector: 'app-idea',
  templateUrl: './idea.component.html',
  styleUrls: ['./idea.component.scss']
})
export class IdeaComponent implements OnInit {

  @Input() idea!: Node;
  @Input() parent?: Node;

  @Output() addSiblingIdea: EventEmitter<Node> = new EventEmitter();
  @Output() removeFromParent: EventEmitter<Node> = new EventEmitter();

  @ViewChild('textarea') textarea!: ElementRef;

  private lastEnter: number = 0;

  constructor() { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.textarea.nativeElement.focus();
    });
  }

  onKeydown(event:KeyboardEvent): void {
    if(event.key === "Enter" && this.isCursorAtEnd() && this.trimEnd(this.idea.text || '') !== '') {
      const now = Date.now();
      if(this.lastEnter > 0 && (now - this.lastEnter) < 800) {
        setTimeout(() => {
          this.idea.text = this.trimEnd(this.idea.text || '');
        }, 0);
        this.addSiblingIdea.emit(this.idea);
        this.lastEnter = 0;
      } else {
        this.lastEnter = now;
      }
    } else {
      this.lastEnter = 0;
    }

    if(event.key === "Tab") {
      event.preventDefault();
      this.addNode();
    }

    if(event.key === "Escape") {
      this.textarea.nativeElement.blur();
    }
  }

  onFocusOut():void {
    this.idea.text = this.trimEnd(this.idea.text || '');
    if(this.idea.text === '') {
      this.removeFromParent.emit(this.idea);
    }
  }

  trimEnd(s: string): string {
    return s.replace(/(\s)+$/ig, '');
  }

  isCursorAtEnd(): boolean {
    const domEle = this.textarea.nativeElement;
    return domEle.selectionStart === domEle.selectionEnd && domEle.selectionStart === domEle.value.length;
  }

  addNode(): void {
    const node:Node = {
      uuid: uuid.v4()
    };

    if(!this.idea.ideas) {
      this.idea.ideas = [];
    }
    this.idea.ideas.push(node);
  }

}
