import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiscordMessageComponent } from './discord-message.component';

describe('DiscordMessageComponent', () => {
  let component: DiscordMessageComponent;
  let fixture: ComponentFixture<DiscordMessageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DiscordMessageComponent]
    });
    fixture = TestBed.createComponent(DiscordMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
