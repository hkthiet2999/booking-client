import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoommenuComponent } from './roommenu.component';

describe('RoommenuComponent', () => {
  let component: RoommenuComponent;
  let fixture: ComponentFixture<RoommenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RoommenuComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RoommenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
