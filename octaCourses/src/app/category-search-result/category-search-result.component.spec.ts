import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CategorySearchResultComponent } from './category-search-result.component';

describe('CategorySearchResultComponent', () => {
  let component: CategorySearchResultComponent;
  let fixture: ComponentFixture<CategorySearchResultComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CategorySearchResultComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CategorySearchResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
