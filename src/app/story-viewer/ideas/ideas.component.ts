import { Component, Input, OnInit } from '@angular/core';
import * as uuid from 'uuid';
import { Node } from 'src/app/service/story.model';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-ideas',
  templateUrl: './ideas.component.html',
  styleUrls: ['./ideas.component.scss']
})
export class IdeasComponent implements OnInit {

  @Input() ideas: Node[] | undefined;
  @Input() parent?: Node;

  parentsByNodeMap: Map<Node, Node | undefined> = new Map();

  currentNode: Node | undefined;

  @Input() public set connectedDropListsIds(ids: string[]) {
    this.allDropListsIds = ids;
  }
  public get connectedDropListsIds(): string[] {
    return this.allDropListsIds/*.filter((id) => id !== this.parent?.uuid)*/;
  }
  public allDropListsIds!: string[];

  public get uuid(): string {
    return 'liste-' + (this.parent?.uuid || 'root');
  }

  constructor() { }

  ngOnInit(): void {
    if (this.ideas?.length === 0) {
      this.addNode();
    }

    this.computeParents(this.ideas, undefined);
  }

  computeParents(children: Node[] | undefined, parent: Node | undefined): void {
    children?.forEach(node => {
      this.parentsByNodeMap.set(node, parent);
      if (node.ideas) {
        this.computeParents(node.ideas, node);
      }
    });
  }

  addSiblingIdea(sibling: Node): void {
    if (this.ideas) {
      const index = this.ideas.indexOf(sibling);
      this.addNode(index + 1);
    }
  }

  addNode(index?: number): void {
    const node: Node = {
      uuid: uuid.v4()
    };

    if (!this.ideas) {
      this.ideas = [];
    }

    if (!index) {
      this.ideas.push(node);
    } else {
      this.ideas.splice(index + 1, 0, node);
    }
  }

  removeIdea(idea: Node): void {
    if (this.ideas) {
      const index = this.ideas.indexOf(idea);
      this.ideas.splice(index, 1);
    }
  }

  dropIdea(event: CdkDragDrop<Node[] | undefined>) {
    if (this.ideas) {
      if (event.previousContainer === event.container) {
        moveItemInArray(this.ideas, event.previousIndex, event.currentIndex);
      } else if(event.previousContainer.data && event.container.data) {
        transferArrayItem(event.previousContainer.data,
          event.container.data,
          event.previousIndex,
          event.currentIndex);
      }
    }
  }
}
