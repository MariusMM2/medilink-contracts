import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContractUpdateComponent } from './contract-update.component';

describe('ContractUpdateComponent', () => {
  let component: ContractUpdateComponent;
  let fixture: ComponentFixture<ContractUpdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContractUpdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContractUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
