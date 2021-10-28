import { Component, Inject, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { OAuthService } from 'angular-oauth2-oidc';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import * as _ from 'lodash';


@Component({
  selector: 'app-fetch-data',
  templateUrl: './fetchdata.component.html'
})
export class FetchDataComponent implements OnInit {
  public forecasts: WeatherForecast[];

  constructor(
    private http: HttpClient,
    private oauthService: OAuthService) {

  }
  ngOnInit(): void {
    var headers = new Headers({
      "Authorization": "Bearer " + this.oauthService.getAccessToken()
    });
    this.getWeatherForecastData();
  }

   public getWeatherForecastData() {

     const heder = new HttpHeaders()
       .set('Authorization', "Bearer " + this.oauthService.getAccessToken())
       .set('Access-Control-Allow-Origin', "*");
     return this.http.get<WeatherForecast[]>('https://localhost:5001/weatherforecast', {headers: heder})
      .subscribe(
        (response) => {                           //Next callback
          console.log('response received')
          console.log(response);
          this.forecasts = response;
        },
        (error) => {                              //Error callback
          console.error('Request failed with error')
          alert(error);
        },
        () => {                                   //Complete callback
          console.log('Request completed')
        })
  }
}



interface WeatherForecast {
  date: string;
  temperatureC: number;
  temperatureF: number;
  summary: string;
}
