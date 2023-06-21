import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAnnouncementComponent } from './admin-announcement.component';

describe('AdminAnnouncementComponent', () => {
  let component: AdminAnnouncementComponent;
  let fixture: ComponentFixture<AdminAnnouncementComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminAnnouncementComponent]
    });
    fixture = TestBed.createComponent(AdminAnnouncementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
