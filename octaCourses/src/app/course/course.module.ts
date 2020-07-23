import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CourseRoutingModule } from './course-routing.module';
import { CourseComponent } from './course.component';
import { MaterialModule } from '../shared/material/material.module';
import { Ng2PageScrollModule } from 'ng2-page-scroll';
import { CourseProviderCardComponent } from './course-provider-card/course-provider-card.component';
import { StudentReviewCardComponent } from './student-review-card/student-review-card.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CourseReviewFormComponent } from './course-review-form/course-review-form.component';
import { CourseQuestionFormComponent } from './course-question-form/course-question-form.component';
import { CourseQuestionCardComponent } from './course-question-card/course-question-card.component';
import { CourseAnswerFormComponent } from './course-answer-form/course-answer-form.component';
import { CourseAnswerCardComponent } from './course-answer-card/course-answer-card.component';
import { PaymentDialogComponent } from './payment-dialog/payment-dialog.component';
import { NgxStripeModule } from 'ngx-stripe';
import { environment } from 'src/environments/environment';

@NgModule({
  declarations: [CourseComponent, CourseProviderCardComponent, StudentReviewCardComponent, CourseReviewFormComponent, CourseQuestionFormComponent, CourseQuestionCardComponent, CourseAnswerFormComponent, CourseAnswerCardComponent, PaymentDialogComponent],
  imports: [
    CommonModule,
    CourseRoutingModule,
    MaterialModule,
    Ng2PageScrollModule,
    ReactiveFormsModule,
    NgxStripeModule.forRoot(environment.Publishable_Key)
  ]
})
export class CourseModule { }
