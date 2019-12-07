import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminChangeRoleComponent } from './admin-change-role.component';

describe('AdminChangeRoleComponent', () => {
  let component: AdminChangeRoleComponent;
  let fixture: ComponentFixture<AdminChangeRoleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminChangeRoleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminChangeRoleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
