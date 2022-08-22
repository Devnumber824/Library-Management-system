import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginauthuserComponent } from './loginauthuser.component';

describe('LoginauthuserComponent', () => {
  let component: LoginauthuserComponent;
  let fixture: ComponentFixture<LoginauthuserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoginauthuserComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginauthuserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
