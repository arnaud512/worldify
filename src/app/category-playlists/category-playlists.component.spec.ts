import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CategoryPlaylistsComponent } from './category-playlists.component';

describe('CategoryPlaylistsComponent', () => {
  let component: CategoryPlaylistsComponent;
  let fixture: ComponentFixture<CategoryPlaylistsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CategoryPlaylistsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoryPlaylistsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
