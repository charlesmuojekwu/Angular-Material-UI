import {Component} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import { MatCalendarCellClassFunction } from '@angular/material/datepicker';

// sample text for textarea
const TEST_TEXT = "Welcome to the DFINITY Discourse Forum! In this post, you’ll find some helpful information and resources about DFINITY as well as some guidelines for contributing to and interacting within our forum. Introduction to DF"

@Component({
  selector: "create-course-step-1",
  templateUrl:"create-course-step-1.component.html",
  styleUrls: ["create-course-step-1.component.scss"]
})
export class CreateCourseStep1Component {


  form = this.fb.group({
    title: ['', [
      Validators.required,
      Validators.minLength(5),
      Validators.maxLength(60)
    ]],
    releasedAt: [new Date(1990,0,1), Validators.required],
    category: ['BEGINNER', Validators.required],
    courseType: ['premium', Validators.required],
    downloadsAllowed: [false, Validators.requiredTrue],
    longDescription: [TEST_TEXT, [Validators.required, Validators.minLength(3)]]
  });

  // method to style specific date of the month
  dateClass: MatCalendarCellClassFunction<Date> = (cellDate, view) => {

    const date = cellDate.getDate();

    if(view == 'month') {
      return (date == 1) ? 'highlight-date' : ""
    }

    return "";

  }

  constructor(private fb: FormBuilder) {

  }

  get courseTitle() {
    return this.form.controls['title'];
  }

}
