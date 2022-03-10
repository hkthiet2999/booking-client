import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoomImgCellComponent } from './room-img-cell.component';

describe('RoomImgCellComponent', () => {
  let component: RoomImgCellComponent;
  let fixture: ComponentFixture<RoomImgCellComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RoomImgCellComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RoomImgCellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
