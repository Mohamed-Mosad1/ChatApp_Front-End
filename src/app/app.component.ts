import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'client';

  baseUrl: string = 'https://localhost:44364/api/';

  constructor(private _httpClient: HttpClient) {
    this.getMessage();
   }

  getMessage(){
    return this._httpClient.get(this.baseUrl + 'Messages').subscribe({
      next: (data) => {
        console.log(data);
      },
      error: (err) => {
        console.log(err)
      }
    });
  }


}
