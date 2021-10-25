import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ListOfStudentsWeeklyReportPage } from './list-of-students-weekly-report.page';

describe('ListOfStudentsWeeklyReportPage', () => {
  let component: ListOfStudentsWeeklyReportPage;
  let fixture: ComponentFixture<ListOfStudentsWeeklyReportPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ListOfStudentsWeeklyReportPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ListOfStudentsWeeklyReportPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
