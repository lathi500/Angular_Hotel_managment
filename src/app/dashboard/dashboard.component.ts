import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ApiService } from '../shared/api.service';
import { restaurantData } from './resturant.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent implements OnInit {

  formValue!: FormGroup;
  restaurantModelObj: restaurantData = new restaurantData;
  allRestaurantData: any;
  showAdd!: boolean;
  showUpdate!: boolean;

  constructor(private formBuilder: FormBuilder, private api: ApiService) { }

  ngOnInit(): void {
    this.formValue = this.formBuilder.group({
      name: [''],
      Email: [''],
      Mobile: [''],
      Address: [''],
      Services: [''],
      Action: ['']
    })

    this.getAllData();
  }

  addRestaurant() {
    this.restaurantModelObj.name = this.formValue.value.name;
    this.restaurantModelObj.Email = this.formValue.value.Email;
    this.restaurantModelObj.Mobile = this.formValue.value.Mobile;
    this.restaurantModelObj.Address = this.formValue.value.Address;
    this.restaurantModelObj.Services = this.formValue.value.Services;


    this.api.postRestaurant(this.restaurantModelObj).subscribe(res => {
      if(this.restaurantModelObj.name == "")
      {
          console.log("");
      }
      else{
        console.log(res);
        alert("Restaurant Data Added... ");
        this.formValue.reset();
        this.getAllData();
      }
    
    },
      err => {
        alert("something wrong!");
      }
    )
  }

  clicklAddResto(){
    this.formValue.reset();
    this.showAdd = true;
    this.showUpdate = false;
  }

  getAllData() {
    this.api.getRestaurant().subscribe(res => {
      this.allRestaurantData = res;
    })
  }

  deteleData(Data: any)
  {
    this.api.deleteRestaurant(Data.id).subscribe(res => {
       alert("Data Deleted");
       this.getAllData();
    })
  }

  editData(data: any)
  {
    this.showUpdate = true;
    this.showAdd = false;
    this.restaurantModelObj._id = data.id;
    this.formValue.controls['name'].setValue(data.name);
    this.formValue.controls['Email'].setValue(data.Email);
    this.formValue.controls['Mobile'].setValue(data.name);
    this.formValue.controls['Address'].setValue(data.name);
    this.formValue.controls['Services'].setValue(data.name);
  }

  updateRestaurantDate()
  {
    this.restaurantModelObj.name = this.formValue.value.name;
    this.restaurantModelObj.Email = this.formValue.value.Email;
    this.restaurantModelObj.Mobile = this.formValue.value.Mobile;
    this.restaurantModelObj.Address = this.formValue.value.Address;
    this.restaurantModelObj.Services = this.formValue.value.Services;

    this.api.updateRestaurant(this.restaurantModelObj, this.restaurantModelObj._id).subscribe(res => {
      alert("Updated");
      this.formValue.reset();
      this.getAllData();
    })
  }

}
