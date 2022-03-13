import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileViewDetailsComponent } from './profile-view-details.component';

describe('ProfileViewDetailsComponent', () => {
  let component: ProfileViewDetailsComponent;
  let fixture: ComponentFixture<ProfileViewDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfileViewDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileViewDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
