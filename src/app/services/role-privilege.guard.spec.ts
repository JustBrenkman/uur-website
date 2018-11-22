import { TestBed, async, inject } from '@angular/core/testing';

import { RolePrivilegeGuard } from './role-privilege-guard.service';

describe('RoleGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RoleGuard]
    });
  });

  it('should ...', inject([RoleGuard], (guard: RoleGuard) => {
    expect(guard).toBeTruthy();
  }));
});
