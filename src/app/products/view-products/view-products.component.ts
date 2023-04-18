import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-view-products',
  templateUrl: './view-products.component.html',
  styleUrls: ['./view-products.component.css']
})
export class ViewProductsComponent implements OnInit{
  productId:any 
  product:any={}
    constructor(private viewActivatedRoute:ActivatedRoute,private api:ApiService){}

    ngOnInit(): void {
      //get path parameter from component route
      this.viewActivatedRoute.params.subscribe((data)=>{
        console.log(data)
        this.productId = data['id']
      })

      //api call
      this.api.viewProduct(this.productId)
      .subscribe(
        //200
        (result:any)=>{
          console.log(result)
          this.product=result
        },
        (result:any)=>{
          //400
          console.log(result.error);
          
        }
      )
    }

    addToWishlist(product:any){
      this.api.addToWishlist(product)
      .subscribe((result:any)=>{
        alert(result)
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
