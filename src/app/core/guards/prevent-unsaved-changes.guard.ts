import { CanDeactivateFn } from '@angular/router';
import { MemberEditComponent } from 'src/app/components/members/member-edit/member-edit.component';

export const preventUnsavedChangesGuard: CanDeactivateFn<MemberEditComponent> = (component: MemberEditComponent)  => {
  if(component.editMemberForm.dirty){
    return confirm('Are you sure you want to continue? Any unsaved changes will be lost!');
  }
  return true;
};


