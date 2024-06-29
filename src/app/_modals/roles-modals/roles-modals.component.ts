import { CommonModule, NgFor } from '@angular/common';
import { Component, EventEmitter, Input, NgModule } from '@angular/core';
import { FormsModule, NgModel, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { ListsComponent } from 'src/app/components/lists/lists.component';
import { IUser } from 'src/app/models/auth';

@Component({
  selector: 'app-roles-modals',
  templateUrl: './roles-modals.component.html',
  styleUrls: ['./roles-modals.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ListsComponent
  ],})
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
