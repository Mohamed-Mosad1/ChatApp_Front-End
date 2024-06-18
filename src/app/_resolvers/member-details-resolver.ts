import { ActivatedRouteSnapshot, Resolve } from "@angular/router";
import { Member } from "../models/member";
import { Observable } from "rxjs";
import { Injectable } from "@angular/core";
import { MembersService } from "../core/services/members.service";

@Injectable({
  providedIn: 'root'
})

export class MemberDetailsResolver implements Resolve<Member> {

  constructor(private _membersService: MembersService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<Member> | any {
    const _route = route.paramMap.get('userName')
    if(_route) {
      return this._membersService.getMemberByUserName(_route)
    }
  }
}
