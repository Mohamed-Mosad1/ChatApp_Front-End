import { CommonModule, NgFor } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { RolesModalsComponent } from 'src/app/_modals/roles-modals/roles-modals.component';
import { AdminService } from 'src/app/core/services/admin.service';
import { IUser } from 'src/app/models/auth';

@Component({
  selector: 'app-admin-management',
  templateUrl: './admin-management.component.html',
  styleUrls: ['./admin-management.component.scss'],
  standalone: true,
  imports: [CommonModule, NgFor],
})
export class AdminManagementComponent implements OnInit {
  users: Partial<IUser[]> = [];
  bsModalRef!: BsModalRef;

  constructor(
    private _adminService: AdminService,
    private _modalService: BsModalService
  ) {}

  ngOnInit(): void {
    this.getUsersWithRoles();
  }

  getUsersWithRoles(): void {
    this._adminService.getUsersWithRoles().subscribe({
      next: (res: Partial<IUser[]>) => {
        if (res) {
          this.users = res;
        }
      },
      error: (err: any) => {
        console.error('Error fetching users with roles:', err);
      },
    });
  }

  openRoleModal(user: IUser): void {
    const config: ModalOptions = {
      class: 'modal-dialog-centered',
      initialState: {
        user,
        roles: this.getRolesArray(user),
      },
    };

    this.bsModalRef = this._modalService.show(RolesModalsComponent, config);

    this.bsModalRef.content.updateSelectedRoles.subscribe({
      next: (values: any[]) => {
        const rolesToUpdate = {
          roles: values.filter(x => x.checked).map(x => x.name),
        };

        if (rolesToUpdate.roles.length > 0) {
          this._adminService.updateUsersRoles(user.userName, rolesToUpdate.roles).subscribe({
            next: () => {
              user.roles = [...rolesToUpdate.roles];
            },
            error: (err: any) => {
              console.error('Error updating user roles:', err);
            },
          });
        }
      },
    });
  }

  private getRolesArray(user: IUser): any[] {
    const userRoles: string[] = user.roles;
    const availableRoles = [
      { name: 'Admin', value: 'Admin', checked: false },
      { name: 'Moderator', value: 'Moderator', checked: false },
      { name: 'Member', value: 'Member', checked: false },
    ];

    availableRoles.forEach(role => {
      role.checked = userRoles.includes(role.name);
    });

    return availableRoles;
  }
}
