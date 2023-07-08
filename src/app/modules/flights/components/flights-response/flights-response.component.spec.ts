import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FlightsResponseComponent } from './flights-response.component';

describe('FlightsResponseComponent', () => {
  let component: FlightsResponseComponent;
  let fixture: ComponentFixture<FlightsResponseComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FlightsResponseComponent]
    });
    fixture = TestBed.createComponent(FlightsResponseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
