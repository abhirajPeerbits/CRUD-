import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { EmployeeModel} from './shared/employee-model.model';
import { EmployeeService } from './shared/employee.service';
// import { Position } from './position';

declare  var M : any;


@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css'],
  providers:[EmployeeService],
})
export class EmployeeComponent implements OnInit {
  isSubmitButtonDisable : boolean = false ;
  isFormDisable : boolean = true ;
  isDataDisplay : boolean = false;
  
  SelectPosition :any= [{id: 1, name: "developer"},
  {id: 2, name: "tester"},
  {id: 3, name: "QA"}];
  
  constructor(private employeeService:EmployeeService) { }

  ngOnInit() {
    // this.SelectPosition = [
      
    // ];
    this.resetForm();
    this.refreshEmployeeList();
   
  }

  resetForm(form?: NgForm){
      if(form)
        form.reset();
        this.employeeService.selectedEmployee = {
          _id : "",
          name : "",
          position:"",
          office : "",
          salary:null,
          
        
      }

      
  }

    

  onSubmit(form : NgForm){
    // postEmployee function use post function and post() function return observable so we need to subscribe here.
    // subscribe give the response to node poject becouse here is frontend
    // in form hiddle field is empty so perform insert operation other wisw perform update operation 

    // if(form.value._id == "")
    // {
      //insert operation
      this.employeeService.postEmployee(form.value).subscribe( (res) => {
          this.resetForm(form);
          this.refreshEmployeeList();
          M.toast({html: 'saved sucessfully', classes: 'rounded'});

      });
      console.log("for new user");
      
    // }
    // else{
    //   alert('data already exist');
    // }

    // }
    // else{
      //update operation

    //   this.employeeService.putEmployee(form.value).subscribe( (res) => {
    //     this.resetForm(form);
    //     this.refreshEmployeeList();
    //     M.toast({html: 'update sucessfully', classes: 'rounded'});
    //     console.log("for  old  user");

    // });

    // } 
  }

  onUpdate(form :NgForm){

   
    //update operation
    if(!(form.value._id == ""))
    {
      this.employeeService.putEmployee(form.value).subscribe( (res) => {
      this.resetForm(form);
      this.refreshEmployeeList();
      M.toast({html: 'update sucessfully', classes: 'rounded'});
      console.log("for old user update sucessfully");

       });
     }
     else
     {
       alert('you can not uopdate data becouse data not avilabel in a database.. !');
       console.log('you can not uopdate data becouse data not avilabel in a database.. !');
       
     }

 

  }


  // here we retrive data from the server(mongodb & node) 
  // getEmployee function use get method so it return observable so we need to scbscribe here
  // in | res |  we get employee array from the data base so save it in variable 
  refreshEmployeeList(){
      this.employeeService.getEmployee().subscribe( (res) => {
        // here need to cast type of | res | becouse | employees  variable in | EmployeeModel | type 
        this.employeeService.employees = (res) as EmployeeModel[] ;
           
      });
  }


  // edit employee data

  onEdit(emp : EmployeeModel){
    // update form for select employee

    this.employeeService.selectedEmployee = emp;

  }

  // delete employee
  onDelete(_id: string,form :NgForm){
    if(confirm('are you sure remove this data .. ?') == true){
      this.employeeService.deleteEmployee(_id).subscribe((res) => {
         this.refreshEmployeeList();
         this.resetForm(form);
         M.toast({html: 'delete  sucessfully', classes: 'rounded'});
      });
    }
  }

  submitDisable(){
   this.isSubmitButtonDisable = true;
   
    console.log('submit button hide');
    return true;
  } 

  // updateDisable(){
  //   console.log('update button hide');
  //   this.isUpdateButtonDisplay = false;
  //   return false;
  // }

  formEnable(){
    this.isFormDisable = false;
    this.isDataDisplay = false;
    this.isSubmitButtonDisable = false;
    
    console.log("form disable" + this.isFormDisable);
    
    return false;

  }
  dataEnable(){
    this.isDataDisplay = true ;
    // this.isFormDisable = true;
    return true;
  }


  
}
