import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductCompareComponent } from './product-compare.component';

describe('ProductCompareComponent', () => {
  let component: ProductCompareComponent;
  let fixture: ComponentFixture<ProductCompareComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductCompareComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductCompareComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
