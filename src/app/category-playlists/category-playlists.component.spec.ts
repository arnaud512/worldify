import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryPlaylistsComponent } from './category-playlists.component';

describe('CategoryPlaylistsComponent', () => {
  let component: CategoryPlaylistsComponent;
  let fixture: ComponentFixture<CategoryPlaylistsComponent>;

  beforeEach(async(() => {
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
