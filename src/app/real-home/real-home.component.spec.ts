import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RealHomeComponent } from './real-home.component';

describe('RealHomeComponent', () => {
  let component: RealHomeComponent;
  let fixture: ComponentFixture<RealHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RealHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RealHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
