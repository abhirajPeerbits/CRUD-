import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

import { EmployeeModel } from './employee-model.model';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  selectedEmployee: EmployeeModel;

  // save all employee from mongo db
  employees : EmployeeModel[];

  // URL

  readonly baseURL = 'http://localhost:3000/employee';



  constructor(private http : HttpClient) { }
  // save form data from mongo db
  // get employee data from Form and post to mongodb
  postEmployee(emp:EmployeeModel)
  {
    // post function return observable 
    return this.http.post(this.baseURL,emp);
  }

  // getdata from the database

  getEmployee(){
    return this.http.get(this.baseURL);
  }

// update employee

  putEmployee(emp:EmployeeModel)
  {
    return this.http.put(this.baseURL + `/${emp._id}`,emp);
  }

  deleteEmployee(_id:string)
  {
    return this.http.delete(this.baseURL + `/${_id}`);
  }
}
