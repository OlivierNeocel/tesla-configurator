import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Model} from "../api/model";
import { Observable, tap} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ModelService {

  private modelsUrl = '/models';

  constructor(private http: HttpClient) { }

  getModels(): Observable<Model[]> {
    return this.http.get<Model[]>(this.modelsUrl)
      .pipe(
        tap(() => console.log("Fetched models"))
      );
  }
}
