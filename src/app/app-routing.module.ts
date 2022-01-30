import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'log-in',
    loadChildren: () => import('./log-in/log-in.module').then( m => m.LogInPageModule)
  },
  {
    path: '',
    redirectTo: 'log-in',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'account',
    loadChildren: () => import('./account/account.module').then( m => m.AccountPageModule)
  },
  {
    path: 'account-edit-page',
    loadChildren: () => import('./account-edit-page/account-edit-page.module').then( m => m.AccountEditPagePageModule)
  },
  {
    path: 'student-weekly-report/:weeklyReportID',
    loadChildren: () => import('./student-weekly-report/student-weekly-report.module').then( m => m.StudentWeeklyReportPageModule)
  },
  {
    path: 'list-of-students',
    loadChildren: () => import('./list-of-students/list-of-students.module').then( m => m.ListOfStudentsPageModule)
  },
  {
    path: 'evaluation',
    loadChildren: () => import('./evaluation/evaluation.module').then( m => m.EvaluationPageModule)
  },
  {
    path: 'concerns',
    loadChildren: () => import('./concerns/concerns.module').then( m => m.ConcernsPageModule)
  },
  {
    path: 'list-of-students-weekly-report/:studentNumber',
    loadChildren: () => import('./list-of-students-weekly-report/list-of-students-weekly-report.module').then( m => m.ListOfStudentsWeeklyReportPageModule)
  },
  {
    path: 'grading/:studentNumber',
    loadChildren: () => import('./grading/grading.module').then( m => m.GradingPageModule)
  },
  {
    path: 'week-reports/:studentNumber',
    loadChildren: () => import('./week-reports/week-reports.module').then( m => m.WeekReportsPageModule)
  },
  {
    path: 'certificate',
    loadChildren: () => import('./certificate/certificate.module').then( m => m.CertificatePageModule)
  },
  {
    path: 'add-document/:studentNumber',
    loadChildren: () => import('./add-document/add-document.module').then( m => m.AddDocumentPageModule)
  },
  {
    path: 'list-week-pdf',
    loadChildren: () => import('./list-week-pdf/list-week-pdf.module').then( m => m.ListWeekPdfPageModule)
  },
  {
    path: 'grading-list',
    loadChildren: () => import('./grading-list/grading-list.module').then( m => m.GradingListPageModule)
  },


];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
