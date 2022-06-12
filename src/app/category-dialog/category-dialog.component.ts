import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';
import { CategoryService } from '../services/category.service';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { inject } from '@angular/core/testing';

@Component({
  selector: 'app-category-dialog',
  templateUrl: './category-dialog.component.html',
  styleUrls: ['./category-dialog.component.scss']
})
export class CategoryDialogComponent implements OnInit {
  categoryForm !: FormGroup;
  actionBtn : string ='Save';

  constructor(public formBuilder : FormBuilder,
     public category:CategoryService,
     @Inject(MAT_DIALOG_DATA) public editData: any,
      private dialogRef : MatDialogRef<CategoryDialogComponent> ) { }

  ngOnInit(): void {
    this.categoryForm = this.formBuilder.group({
      categoryCode : ['', Validators.required],
      categoryName : ['', Validators.required],
    })

    if(this.editData){
      this.actionBtn = "Update";
      this.categoryForm.controls["categoryCode"].setValue(this.editData.productName);
      this.categoryForm.controls["categoryName"].setValue(this.editData.category);
    }
  }

  addCategory(){
    if(!this.editData){
      if(this.categoryForm.valid){
        this.category.postCategory(this.categoryForm.value)
        .subscribe({
          next:(res)=>{
             Swal.fire('Thank you...', 'product added successfully', 'success')
            // this.toast.success({detail:"success message", summary:"product added successfully", duration:5000})
            // alert("category added successfully");
            this.categoryForm.reset();
            this.dialogRef.close('save');
          },
          error:()=>
           Swal.fire('product does not added')
          //  this.toast.error({detail:"error message", summary:"product does not added", duration:5000})
          //  alert("category does not added")
          })
        }
        else {
          this.updateCategory()
        }
    }
  }
  updateCategory(){
    this.category.putCategory(this.categoryForm.value,this.editData.id)
    .subscribe({
      next:(res)=>{
        Swal.fire('Thank you...', 'You update succesfully!', 'success')
        // this.toast.success({detail:"success message", summary:"product update successfully", duration:5000})
        // alert("product update successfully");
        this.categoryForm.reset();
        this.dialogRef.close('update');
      },
      error:()=>
      Swal.fire('product does not update')
      // this.toast.error({detail:"error message", summary:"product does not update", duration:5000})
      // alert("product does not update")
      })
  }
}
