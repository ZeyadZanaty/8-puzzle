import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/Rx';

@Injectable({
  providedIn: 'root'
})
export class SolverService {

  solverUrl:string = "http://localhost:5000/run"

  constructor (private _http: Http) {};

  solve(state){
    return this._http.post(this.solverUrl,state)
    .map(data=>data.json());
  }
}
