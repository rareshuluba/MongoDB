import { Component, Input, OnInit, Output , EventEmitter} from '@angular/core';
import { Todo } from 'src/app/libs/models/todo';

@Component({
  selector: 'app-work',
  templateUrl: './work.component.html',
  styleUrls: ['./work.component.css']
})
export class WorkComponent implements OnInit {
  @Input() work: Todo = new Todo();
  @Output() newEvent = new EventEmitter<Todo>()

  constructor() { }

  ngOnInit(): void {
  }

  taskDone(){
    this.newEvent.emit(this.work);
  }

}
