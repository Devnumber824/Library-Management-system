import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllBooksForUserComponent } from './all-books-for-user.component';

describe('AllBooksForUserComponent', () => {
  let component: AllBooksForUserComponent;
  let fixture: ComponentFixture<AllBooksForUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllBooksForUserComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AllBooksForUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
