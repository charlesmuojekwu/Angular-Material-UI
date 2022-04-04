import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import {Course} from "../model/course";
import {CoursesService} from "../services/courses.service";
import {debounceTime, distinctUntilChanged, startWith, tap, delay, catchError, finalize, map} from 'rxjs/operators';
import {merge, fromEvent, throwError} from "rxjs";
import { Lesson } from '../model/lesson';
import { SelectionModel } from '@angular/cdk/collections';


@Component({
    selector: 'course',
    templateUrl: './course.component.html',
    styleUrls: ['./course.component.scss']
})
export class CourseComponent implements OnInit, AfterViewInit {

    course:Course;

    lessons:Lesson[] = [];

    loading = false;

    // access the paginator component
    @ViewChild(MatPaginator)
    paginator : MatPaginator

    @ViewChild(MatSort)
    sort:MatSort

    // table row selection
    selection = new SelectionModel<Lesson>(true, []);


    constructor(private route: ActivatedRoute,
                private coursesService: CoursesService) {

    }

    displayedColumns = ['select','seqNo', 'description', 'duration'];

    expandedLession:Lesson = null;

    ngOnInit() {

        this.course = this.route.snapshot.data["course"];

        //load the first page
        this.loadLessonsPage();
        
    }

    onLessonToggled(lesson: Lesson) {
      this.selection.toggle(lesson);
    }


    loadLessonsPage() { 

      this.loading = true;

      this.coursesService.findLessons(
          this.course.id, 
          this.sort?.direction ?? "asc", 
          this.paginator?.pageIndex ?? 0,
          this.paginator?.pageSize ?? 3,
          this.sort?.active ?? "seqNo")
        .pipe(
            tap(lessons => this.lessons = lessons),
            catchError(err => {
              console.log("Error loading lesson", err);
              alert("Error loading lesson");

              return throwError(err)
            }),
            finalize(() => this.loading = false)
        ).subscribe();

    }

    onToggleLesson(lesson:Lesson) {
      if(lesson == this.expandedLession) {
        this.expandedLession = null;
      }else{
        this.expandedLession = lesson
      }
    }

    ngAfterViewInit() {

      // reset paginator on sort
      this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);

      merge(this.sort.sortChange, this.paginator.page)
        .pipe(
            tap(() => this.loadLessonsPage())
        ).subscribe();

    }

    isAllSelected() {
      return this.selection.selected?.length == this.lessons?.length
    }

    toggleAll() {
      if(this.isAllSelected()) {
        this.selection.clear();
      }
      else {
        this.selection.select(...this.lessons)
      }
    }

}
