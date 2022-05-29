import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Todo } from '../libs/models/todo';
import { WorkService } from '../libs/services/work.service';
import { take, finalize } from 'rxjs/operators'

@Component({
  selector: 'app-core',
  templateUrl: './core.component.html',
  styleUrls: ['./core.component.css']
})
export class CoreComponent implements OnInit {

  tasks: Todo[] = []
  tempWork: Todo = new Todo

  constructor(private workService: WorkService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.getAllTasks();
  }

  getAllTasks() {
    this.workService.getTasks().subscribe(res => {
      this.tasks = res;
    });
  }

  addTask() {
    if (this.tasks.find(t => t.name === this.tempWork.name?.toLowerCase()) !== undefined) {
      this.toastr.error("Cannot add the same task");
      return;
    }
    this.workService.addTask(this.tempWork).pipe(finalize(() => {
      this.getAllTasks();
    })).subscribe(() => {
      this.toastr.success("Added " + this.tempWork.name);
    });
  }

  updateTask() {
    if (this.tempWork.name === null) {
      this.toastr.error("Please provide a name")
    }
    else {
      this.tempWork._id = this.tasks.find(w => w.name === this.tempWork.name)!._id
      this.workService.updateTask(this.tempWork).pipe(finalize(() => {
        this.getAllTasks();
      })).subscribe(() => {
        this.toastr.info(this.tempWork.name + " Updated");
      })
    }
  }

  deleteTask() {
    if (this.tempWork.name === null) {
      this.toastr.error("Please provide a name");
    }
    else {
      this.workService.deleteTask(this.tasks.find(w => w.name === this.tempWork.name)!).pipe(finalize(() => {
        this.getAllTasks();
      })).subscribe(() => {
        this.toastr.success(this.tempWork.name + " Deleted");
      });
    }
  }

  deleteFromTask(work: Todo) {
    this.workService.deleteTask(work).pipe(finalize(() => {
      this.getAllTasks();
    })).subscribe(() => {
      this.toastr.success(this.tempWork.name + " Deleted");
    });
  }
}
