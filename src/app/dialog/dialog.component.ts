import { IfStmt, ThisReceiver } from '@angular/compiler';
import { Component, OnInit, inject, Inject } from '@angular/core';
import { FormGroup, FormBuilder,Validators, FormControl } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {NgToastService} from 'ng-angular-popup';
import Swal from 'sweetalert2';
import { CategoryService } from '../services/category.service';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {

  freshnessList = ["Brand New", "Second Hand", "Refurbished"];
  productForm !: FormGroup;
  actionBtn : string = "save";
  categoryData :any;

  constructor(private formbuilder : FormBuilder,
     private api : ApiService,
     public category : CategoryService,
     @Inject(MAT_DIALOG_DATA) public editData: any,
     public toast : NgToastService,
     private dialogRef : MatDialogRef<DialogComponent>) { }

  ngOnInit(): void {
    this.loadCategory();
    this.productForm = this.formbuilder.group({
      productName : ['', Validators.required],
      category : ['', Validators.required],
      freshness : ['', Validators.required],
      price : ['', Validators.required],
      comment : ['', Validators.required],
      date : ['', Validators.required],
    })

    if(this.editData){
      this.actionBtn = "Update";
      this.productForm.controls["productName"].setValue(this.editData.productName);
      this.productForm.controls["category"].setValue(this.editData.category);
      this.productForm.controls["date"].setValue(this.editData.date);
      this.productForm.controls["freshness"].setValue(this.editData.freshness);
      this.productForm.controls["price"].setValue(this.editData.price);
      this.productForm.controls["comment"].setValue(this.editData.comment);
    }
  }
  loadCategory() {
    this.category.getCategory()
    .subscribe({
      next:(data)=>{
       this.categoryData = data;
      //  console.log(this.categoryData);
      }})
  }
  addProduct(){
    
    if(!this.editData){
      if(this.productForm.valid){
        this.api.postProduct(this.productForm.value)
        .subscribe({
          next:(res)=>{
            Swal.fire('Thank you...', 'product added successfully', 'success')
            // this.toast.success({detail:"success message", summary:"product added successfully", duration:5000})
            // alert("product added successfully");
            this.productForm.reset();
            this.dialogRef.close('save');
          },
          error:()=>
          Swal.fire('product does not added')
          //  this.toast.error({detail:"error message", summary:"product does not added", duration:5000})
          // alert("product does not added")
          })
        }
      }
      else {
        this.updateProduct()
      }
  }
  updateProduct(){
    this.api.putProduct(this.productForm.value,this.editData.id)
    .subscribe({
      next:(res)=>{
        Swal.fire('Thank you...', 'You update succesfully!', 'success')
        // this.toast.success({detail:"success message", summary:"product update successfully", duration:5000})
        // alert("product update successfully");
        this.productForm.reset();
        this.dialogRef.close('update');
      },
      error:()=>
      Swal.fire('product does not update')
      // this.toast.error({detail:"error message", summary:"product does not update", duration:5000})
      // alert("product does not update")
      })
  }
}

