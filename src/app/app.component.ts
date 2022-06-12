import { Component, OnInit , ViewChild } from '@angular/core';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { DialogComponent } from './dialog/dialog.component';
import { ApiService } from './services/api.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {NgToastService} from 'ng-angular-popup';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Angular13Crud';
  // displayedColumns : string[] = ['productName', 'category','date','freshness', 'price','comment','action'];
  // dataSource!: MatTableDataSource<any>;

  // @ViewChild(MatPaginator) paginator!: MatPaginator;
  // @ViewChild(MatSort) sort!: MatSort;

  // constructor(public dialog: MatDialog , public api : ApiService , public toast : NgToastService ) {

  }


  // ngOnInit(): void {
    // this.getAllproducts();
  // }

  // openDialog() {
  //   this.dialog.open(DialogComponent, {
  //       width : '30%'
  //   }).afterClosed().subscribe(val=>{
  //     if(val==="save"){
  //       this.getAllproducts()
  //     }
  //   })
  // }

  // getAllproducts(){
  //   this.api.getProduct()
  //   .subscribe({
  //     next:(data)=>{
  //      this.dataSource = new MatTableDataSource(data);
  //      this.paginator = this.paginator;
  //      this.sort = this.sort
  //     },
  //     error:()=>
  //     Swal.fire('Error fetching data world!')
  //     // this.toast.error({detail:"error message", summary:"Error fetching data", duration:5000})
  //     // alert("Error fetching data")
  //   })
  // }


  // editProduct(row : any){
  //   this.dialog.open(DialogComponent, {
  //     width : '30%',
  //     data: row
  //   }).afterClosed().subscribe(val=>{
  //     if(val==="update"){
  //       this.getAllproducts()
  //     }
  //   })
  // }

  // deleteProduct(id:number){
  //   Swal.fire({
  //           title: 'Are you sure want to remove?',
  //           text: 'You will not be able to recover this file!',
  //           icon: 'warning',
  //           showCancelButton: true,
  //           confirmButtonText: 'Yes, delete it!',
  //           cancelButtonText: 'No, keep it'
  //         }).then((res) => {
  //           if (res.value) {
  //             //  console.log("Success",id );
  //             this.api.deleteProduct(id)
  //             .subscribe({
  //                 next:(res)=>{
  //             Swal.fire(
  //               'Deleted!',
  //               'Your imaginary file has been deleted.',
  //               'success'
  //             )
  //             this.getAllproducts();
  //           }
  //         }
  //       )
  //     } else if (res.dismiss === Swal.DismissReason.cancel) {
  //             console.log("Cancelled");
  //             Swal.fire(
  //               'Cancelled',
  //               'Your imaginary file is safe :)',
  //               'error'
  //             )
  //             this.getAllproducts();
  //           }
  //         })
          
  //   //  this.api.deleteProduct(id)
  //   //  .subscribe({
  //   //   next:(res)=>{
  //   //     Swal.fire({
  //   //       title: 'Are you sure want to remove?',
  //   //       text: 'You will not be able to recover this file!',
  //   //       icon: 'warning',
  //   //       showCancelButton: true,
  //   //       confirmButtonText: 'Yes, delete it!',
  //   //       cancelButtonText: 'No, keep it'
  //   //     }).then((res) => {
  //   //       if (res.value) {
  //   //         Swal.fire(
  //   //           'Deleted!',
  //   //           'Your imaginary file has been deleted.',
  //   //           'success'
  //   //         )
  //   //         this.getAllproducts();

  //   //       } else if (res.dismiss === Swal.DismissReason.cancel) {
  //   //         Swal.fire(
  //   //           'Cancelled',
  //   //           'Your imaginary file is safe :)',
  //   //           'error'
  //   //         )
  //   //         this.getAllproducts();
  //   //       }
  //   //     })
  //   //     // this.toast.error({detail:"success message", summary:"product delete successfully", duration:5000})
  //   //     // alert("product delete successfully");
  //   //     // this.getAllproducts();
  //   //   }
  //   //   // error:()=>
  //   //   // alert("product does not delete")
  //   //  })
  //  }

  // applyFilter(event: Event) {
  //   const filterValue = (event.target as HTMLInputElement).value;
  //   this.dataSource.filter = filterValue.trim().toLowerCase();

  //   if (this.dataSource.paginator) {
  //     this.dataSource.paginator.firstPage();
  //   }
  // }

// }

