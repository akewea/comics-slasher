import { Component, ContentChildren, ElementRef, EmbeddedViewRef, Input, OnInit, QueryList, TemplateRef, ViewChild, ViewChildren, ViewRef } from '@angular/core';
import * as uuid from 'uuid';
import { Node } from 'src/app/service/story.model';
import { MatCard } from '@angular/material/card';

@Component({
  selector: 'app-ideas',
  templateUrl: './ideas.component.html',
  styleUrls: ['./ideas.component.scss']
})
export class IdeasComponent implements OnInit {

  @Input() ideas!: Node[];
  @Input() parent?: Node;

  parentsByNodeMap: Map<Node, Node | undefined> = new Map();

  currentNode:Node | undefined;

  constructor() { }

  ngOnInit(): void {
    if(this.ideas.length === 0) {
      this.addNode();
    }

    this.computeParents(this.ideas, undefined);
  }

  computeParents(children: Node[], parent:Node | undefined): void {
    children.forEach(node => {
      this.parentsByNodeMap.set(node, parent);
      if(node.ideas) {
        this.computeParents(node.ideas, node);
      }
    });
  }

  addSiblingIdea(sibling: Node): void {
    const index = this.ideas.indexOf(sibling);
    this.addNode(index + 1);
  }

  addNode(index?:number): void {
    const node:Node = {
      uuid: uuid.v4()
    };

    if(!index) {
      this.ideas.push(node);
    } else {
      this.ideas.splice(index + 1, 0, node);
    }
  }

  removeIdea(idea: Node): void {
    const index = this.ideas.indexOf(idea);
    this.ideas.splice(index, 1);
  }
}
