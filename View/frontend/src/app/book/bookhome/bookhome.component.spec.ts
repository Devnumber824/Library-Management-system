import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookhomeComponent } from './bookhome.component';

describe('BookhomeComponent', () => {
  let component: BookhomeComponent;
  let fixture: ComponentFixture<BookhomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BookhomeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BookhomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
