import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable, tap} from "rxjs";
import {Option} from "../model/option";

@Injectable({
  providedIn: 'root'
})
export class OptionService {

  private optionsUrl = '/options';
  constructor(private http: HttpClient) { }

  getOption(modelCode: string): Observable<Option> {
    return this.http.get<Option>(this.optionsUrl + '/' + modelCode)
      .pipe(
        tap(() => console.log('Fetched options for model code', modelCode))
      );
  }
}
