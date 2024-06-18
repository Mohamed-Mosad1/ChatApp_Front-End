import { Component, EventEmitter, Input } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { IUser } from 'src/app/models/auth';

@Component({
  selector: 'app-roles-modals',
  templateUrl: './roles-modals.component.html',
  styleUrls: ['./roles-modals.component.scss']
})
export class RolesModalsComponent {

  @Input() updateSelectedRoles: EventEmitter<any> = new EventEmitter();
  user!: IUser;
  roles!: any[];

  constructor(public bsModalRef: BsModalRef) { }

  updateRoles() {
    this.updateSelectedRoles.emit(this.roles);
    this.bsModalRef.hide();
  }

}
