import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminDiscordComponent } from './admin-discord.component';

describe('AdminDiscordComponent', () => {
  let component: AdminDiscordComponent;
  let fixture: ComponentFixture<AdminDiscordComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminDiscordComponent]
    });
    fixture = TestBed.createComponent(AdminDiscordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
