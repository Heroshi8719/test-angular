import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InactivityModal } from './inactivity-modal';

describe('InactivityModal', () => {
  let component: InactivityModal;
  let fixture: ComponentFixture<InactivityModal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InactivityModal],
    }).compileComponents();

    fixture = TestBed.createComponent(InactivityModal);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
