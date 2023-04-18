import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css']
})
export class WishlistComponent implements OnInit{
  wishlistItems:any=[]
  constructor(private api:ApiService){

  }

  ngOnInit(): void {
    this.api.getWishlistItems()
    .subscribe(
      (result:any)=>{
        console.log(result)
        this.wishlistItems=result
      },
      (result:any)=>{
        console.log(result.error);
        
      }
    )
  }

  removeWishlistItem(id:any){
    this.api.removeWishlistItem(id).subscribe(
      (result:any)=>{
        this.wishlistItems = result
      },
      (result:any)=>{
        console.log(result.error)})
      }

      addtocart(product:any){
        //add quantity into product with value as 1
        Object.assign(product,{quantity:1})
        console.log(product)
  
        this.api.addToCart(product)
        .subscribe((result:any)=>{
          this.api.cartCount()
          //to remove item from wishlist
          this.removeWishlistItem(product.id)
          alert(result)

        },
        (result:any)=>{
          alert(result.error);
          
        })
      }
}
