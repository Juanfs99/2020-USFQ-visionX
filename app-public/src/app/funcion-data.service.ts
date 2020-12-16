import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Objetos } from './funcionamiento/funcionamiento.component';

@Injectable({
  providedIn: 'root'
})
export class FuncionDataService {

  constructor(private http: HttpClient) { }

  //metodo publico para el componente
  private apiBaseUrl = '/api/objects';
  public getObjects(): Promise<Objetos> {

    //const codigo: string = '5fd8162e57e6b1747c762a2d';

    const url: string = `${this.apiBaseUrl}`;
    return this.http
      .get(url)
      .toPromise()
      .then(response => response as Objetos)
      .catch(this.handleError);

  }
  private handleError(error: any): Promise<any> {
    console.error('Error en la lectura de objetos', error);
    return Promise.reject(error.message || error);
  }

}