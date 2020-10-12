import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { GenresAndMoodComponent } from './genres-and-mood.component';

describe('GenresAndMoodComponent', () => {
  let component: GenresAndMoodComponent;
  let fixture: ComponentFixture<GenresAndMoodComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ GenresAndMoodComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GenresAndMoodComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
