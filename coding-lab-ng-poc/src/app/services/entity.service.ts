import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http'
import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class EntityService<T> {

  BASE_URL: string = environment.base_url;

  constructor(private http: HttpClient) {}

  // READ
  findAll<T>(model: T | any): Observable<T | T[]> {
    return this.http.get<T | T[]>(`${this.BASE_URL}/${model._tableName}`);
  }

  findById<T>(model: T | any, id: number): Observable<T | T[]> {
    return this.http.get<T | T[]>(`${this.BASE_URL}/${model._tableName}/${id}`);
  }

  // CREATE
  create<T>(model: T | any, objToCreate: T | any): Observable<T | T[]> {
    return this.http.post<T | T[]>(`${this.BASE_URL}/${model._tableName}`, objToCreate);
  }

  // UPDATE
  update<T>(model: T | any, objToUpdate: T | any): Observable<T | T[] | any> {
    return this.http.patch(`${this.BASE_URL}/${model._tableName}/${objToUpdate.id}`, objToUpdate);
  }

  // DELETE 
  delete<T>(model: T | any, objId: number): Observable<T | T[] | any> {
    return this.http.delete(`${this.BASE_URL}/${model._tableName}/${objId}`);
  }

}
