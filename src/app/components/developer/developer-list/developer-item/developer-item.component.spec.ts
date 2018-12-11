import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeveloperItemComponent } from './developer-item.component';

describe('DeveloperItemComponent', () => {
  let component: DeveloperItemComponent;
  let fixture: ComponentFixture<DeveloperItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeveloperItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeveloperItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
