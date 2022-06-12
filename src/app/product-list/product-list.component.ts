import { ChangeDetectorRef, Component, OnInit , ViewChild } from '@angular/core';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {NgToastService} from 'ng-angular-popup';
import Swal from 'sweetalert2';
import { DialogComponent } from '../dialog/dialog.component';
import { ApiService } from '../services/api.service';
import * as _ from 'lodash';
import { CategoryService } from '../services/category.service';
import { FormGroup, FormBuilder,Validators, FormControl } from '@angular/forms';
import { jsPDF } from "jspdf";
import html2canvas from 'html2canvas';
@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {

  displayedColumns : string[] = ['productName', 'category','date','freshness', 'price','comment','action'];
  // freshnessList = ["Electronics", "Fruits", "Vegitables"];
  selectCat:any;
  dataSource!: MatTableDataSource<any>;
  catSearchForm !: FormGroup;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  apiData:any = [];
  categoryData :any ;
  productData:any;


  

  constructor(
    private formbuilder : FormBuilder,
    public dialog: MatDialog ,
    public api : ApiService ,
    private cdr : ChangeDetectorRef,
    public category : CategoryService,
    public toast : NgToastService) { }

  ngOnInit(): void {
    this.getAllproducts();
    this.loadCategory();
    this.catSearchForm = this.formbuilder.group({
      productName: [''],
      // category : ['', Validators.required],
      category: [''],
    })
    // this.cdr.detectChanges();
    // this.dataSource.paginator=this.paginator;

    // if(this.searchByCat){
    //   this.actionBtn = "Update";
    //   this.catSearchForm.controls["category"].setValue(this.editData.category);
    // }
  }

  loadCategory(){
    this.category.getCategory()
    .subscribe({
      next:(data)=>{
       this.categoryData = data;
        }}
    )}

    loadProductName(){

    }
    

  openDialog() {
    this.dialog.open(DialogComponent, {
        width : '30%'
    }).afterClosed().subscribe(val=>{
      if(val==="save"){
        this.getAllproducts();
      }
    })
  }

  getAllproducts(){
    this.api.getProduct()
    .subscribe({
      next:(data)=>{
        console.log(data);
      //  this.apiData = data;
      //  this.productData= data.productName.value;
      //  console.log(this.productData.data);

       this.dataSource = new MatTableDataSource(data);
       this.cdr.detectChanges();
       this.dataSource.paginator =this.paginator;
       this.sort = this.sort;
       this.productData = data;
      },
      error:()=>
      Swal.fire('Error fetching data world!')
      // this.toast.error({detail:"error message", summary:"Error fetching data", duration:5000})
      // alert("Error fetching data")
    })
  }

  


  editProduct(row : any){
    this.dialog.open(DialogComponent, {
      width : '30%',
      data: row
    }).afterClosed().subscribe(val=>{
      if(val==="update"){
        this.getAllproducts()
      }
    })
  }

  deleteProduct(id:number){
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
              this.api.deleteProduct(id)
              .subscribe({
                  next:(res)=>{
              Swal.fire(
                'Deleted!',
                'Your imaginary file has been deleted.',
                'success'
              )
              this.getAllproducts();
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
              this.getAllproducts();
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

  onChange(category:any){
     let filterValue = _.filter(this.apiData,(data)=>{
     return data.category.toLowerCase() == category.value.toLowerCase();
  })
  this.dataSource = new MatTableDataSource(filterValue);
  }

// Screenshoot page //
public convertToPDF(){
html2canvas(document.getElementById("contentToConvert")!).then(canvas => {
// Few necessary setting options
const contentDataURL = canvas.toDataURL('image/png')
let pdf = new jsPDF('p', 'mm', 'a4'); // A4 size page of PDF
var width = pdf.internal.pageSize.getWidth();
var height = canvas.height * width / canvas.width;
pdf.addImage(contentDataURL, 'PNG', 0, 0, width, height)
pdf.save('output.pdf'); // Generated PDF
});
}


  searchByCat(){
    // console.log(this.catSearchForm.value)
    let search = this.clean(this.catSearchForm.value);
    this.api.getProductByCat(search)
    .subscribe({
      next:(data)=>{
        console.log(data);
       this.dataSource = new MatTableDataSource(data);
       this.paginator = this.paginator;
       this.sort = this.sort;
       this.productData = data;
      },
      error:()=>
      Swal.fire('Error fetching data world!')
      // this.toast.error({detail:"error message", summary:"Error fetching data", duration:5000})
      // alert("Error fetching data")
    })
  }

  resetBtn(){
    this.catSearchForm.reset();
    this.getAllproducts();
  }

  clean(obj:any) {
    for (var propName in obj) {
      if (!obj[propName]) {
        delete obj[propName];
      }
    }
    return obj
  }
}
