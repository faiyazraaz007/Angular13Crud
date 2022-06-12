import { Component, OnInit , ViewChild } from '@angular/core';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {NgToastService} from 'ng-angular-popup';
import Swal from 'sweetalert2';
import { ApiService } from '../services/api.service';
import * as _ from 'lodash';
import { CategoryDialogComponent } from '../category-dialog/category-dialog.component';
import { CategoryService } from '../services/category.service';



@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.scss']
})
export class CategoryListComponent implements OnInit {

  displayedColumns : string[] = ['categoryCode', 'categoryName','action'];

  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  categoryData:any = [];

  constructor( private dialog : MatDialog, private category : CategoryService) { }

  ngOnInit(): void {
    this.getAllcategory();
  }

  openDialog() {
    this.dialog.open(CategoryDialogComponent, {
        width : '30%',
    }).afterClosed().subscribe(val=>{
      if(val==="save"){
        this.getAllcategory();
      }})
  }
  getAllcategory(){
    this.category.getCategory()
    .subscribe({
      next:(data)=>{
       this.categoryData = data;
       this.dataSource = new MatTableDataSource(data);
       this.dataSource.paginator = this.paginator;
       this.sort = this.sort
      },
      error:()=>
        Swal.fire('Error fetching data world!')
      // this.toast.error({detail:"error message", summary:"Error fetching data", duration:5000})
      //  alert("Error fetching data")
    })
  }

  editCategory(row : any){
    this.dialog.open(CategoryDialogComponent, {
      width : '30%',
      data : row
    }).afterClosed().subscribe(val=>{
      if(val==="update"){
        this.getAllcategory()
      }
    })
  }

  deleteCategory(id:number){
    Swal.fire({
            title: 'Are you sure want to remove?',
            text: 'You will not be able to recover this file!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'No, keep it'
          }).then((res) => {
            if (res.value) {
              //  console.log("Success",id );
              this.category.deleteCategory(id)
              .subscribe({
                  next:(res)=>{
              Swal.fire(
                'Deleted!',
                'Your imaginary file has been deleted.',
                'success'
              )
              this.getAllcategory();
            }
          }
        )
      } else if (res.dismiss === Swal.DismissReason.cancel) {
              console.log("Cancelled");
              Swal.fire(
                'Cancelled',
                'Your imaginary file is safe :)',
                'error'
              )
              this.getAllcategory();
            }
          })
      }
  

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}
