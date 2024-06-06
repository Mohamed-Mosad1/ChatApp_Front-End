import { Injectable } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {

  loaderRequestCount = 0;

  constructor(private _spinnerService: NgxSpinnerService) { }

  loader(){
    this.loaderRequestCount++;
    this._spinnerService.show(undefined, {
      type: 'line-scale-party',
      bdColor: 'rgba(255,255,255,0)',
      color: '#333333',
    });
  }

  idel() {
    this.loaderRequestCount--;
    if(this.loaderRequestCount <= 0){
      this.loaderRequestCount = 0;
      this._spinnerService.hide();
    }
  }

}
