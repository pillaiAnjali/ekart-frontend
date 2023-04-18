import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-all-products',
  templateUrl: './all-products.component.html',
  styleUrls: ['./all-products.component.css']
})
export class AllProductsComponent implements OnInit {
allProducts: any=[];
searchKey:string=''

    constructor(private api:ApiService){}

    ngOnInit(): void {
      //make api call
      this.api.getAllProducts()
      .subscribe(
        (result:any)=>{
          this.allProducts = result
        },
        (result:any)=>{
          console.log(result);
          
        }
      )

      //get behavior subject from api service
      this.api.searchTerm.subscribe((result:any)=>{
        console.log(result)
        this.searchKey=result
      })
    }

    addtocart(product:any){
      //add quantity into product with value as 1
      Object.assign(product,{quantity:1})
      console.log(product)

      this.api.addToCart(product)
      .subscribe((result:any)=>{
        this.api.cartCount()
        // alert(result)
      },
      (result:any)=>{
        alert(result.error);
        
      })
    }
}
