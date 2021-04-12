import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WatchnowComponent } from './watchnow.component';

describe('WatchnowComponent', () => {
  let component: WatchnowComponent;
  let fixture: ComponentFixture<WatchnowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WatchnowComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WatchnowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
