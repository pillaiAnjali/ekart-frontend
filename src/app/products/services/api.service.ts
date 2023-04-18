import { getLocaleExtraDayPeriods } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, retry } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

    cartItems:any=[]
    // BASE_URL='http://localhost:3000'
    //deployed node server - https://ekart-tzqy.onrender.com/
    BASE_URL = "https://ekart-tzqy.onrender.com"

  //create variable to hold searcnh term as a behavior subject
  searchTerm = new BehaviorSubject('')//as argument pass its initial value
  //to hold the cunt of items in cart
  cartItemCount = new BehaviorSubject(0)
  constructor(private http:HttpClient) { 
    this.cartCount()
  }

  //getAllProducts
  getAllProducts(){
    return this.http.get(`${this.BASE_URL}/products/all-products`)
  }

  //view products
  viewProduct(id:any){
    return this.http.get(`${this.BASE_URL}/products/${id}`)
  }

  //add to wish list
   addToWishlist(product:any){
    const body={
      id:product.id,
      title:product.title,
      price:product.price,
      image:product.image
    }
    return this.http.post(`${this.BASE_URL}/products/add-to-wishlist`,body)
   }

   getWishlistItems(){
    return this.http.get(`${this.BASE_URL}/wishlists/get-all-items`)
   }

   removeWishlistItem(id:any){
    return this.http.get(`${this.BASE_URL}/wishlists/remove-item/${id}`)
   }

   addToCart(product:any){
    const body = {
      id:product.id,
      title:product.title,
      price:product.price,
      image:product.image,
      quantity:product.quantity
    }

    return this.http.post(`${this.BASE_URL}/products/add-to-cart`,body)
   }

   getCart(){
    return this.http.get(`${this.BASE_URL}/wishlists/get-all-cart-items`)
   }

   //get count of cart
   cartCount(){
    return this.http.get(`${this.BASE_URL}/wishlists/get-all-cart-items`).subscribe(
      (result:any)=>{
        this.cartItemCount.next(result.length)
      }
    )
   }

   //remove item from cart
   removeCartItem(id:any){
    return this.http.delete(`${this.BASE_URL}/cart/item/${id}`)
   }

   //empty cart
   emptyCart(){
    return this.http.delete(`${this.BASE_URL}/cart/empty-cart`)
   }

}
