import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginauthComponent } from './loginauth.component';

describe('LoginauthComponent', () => {
  let component: LoginauthComponent;
  let fixture: ComponentFixture<LoginauthComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoginauthComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginauthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
