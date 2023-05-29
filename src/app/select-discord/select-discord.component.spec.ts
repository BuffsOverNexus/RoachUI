import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectDiscordComponent } from './select-discord.component';

describe('SelectDiscordComponent', () => {
  let component: SelectDiscordComponent;
  let fixture: ComponentFixture<SelectDiscordComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SelectDiscordComponent]
    });
    fixture = TestBed.createComponent(SelectDiscordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
