import { CommonModule, NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { AdminManagementComponent } from '../admin-management/admin-management.component';
import { FormsModule } from '@angular/forms';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { HasRoleDirective } from 'src/app/_directive/has-role.directive';

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.scss'],
  standalone: true,
  imports: [ CommonModule,
    FormsModule,
    RouterLink,
    RouterLinkActive,
    HasRoleDirective,
    TabsModule,
    AdminManagementComponent
  ]
})
export class AdminPanelComponent {

}
