import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ApiService } from '../services/api.service';

//paypal payment gateway import
import {
  IPayPalConfig,
  ICreateOrderRequest 
} from 'ngx-paypal';
import { empty } from 'rxjs';
import { resetFakeAsyncZone } from '@angular/core/testing';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent  implements OnInit{

  //paypal property
  public payPalConfig ? : IPayPalConfig;

  cartItems:any=[]
  cartTotalPrice:number=0
  offerStatus:boolean=false
  finalAmount:number=0
  offerTagStatus = true
  paymentBtn:boolean=false
  makePaymentStatus:boolean=false
  showSuccess:boolean=false
  showCancel:boolean=false
  showError:boolean=false
  user:any={}
  addressForm = this.fb.group({
    username:[''],
    addr1:[''],
    addr2:[''],
    state:['']
  })

  constructor(private api:ApiService,private fb:FormBuilder){}
ngOnInit(): void {
  this.initConfig();

  this.api.getCart().subscribe(
    (result:any)=>{
      // console.log(result)
      this.cartItems=result
      //call total cart price
      this.getCartTotalPrice()
    },
    (result:any)=>{
      console.log(result.error)
    }
  )


  
}
getCartTotalPrice(){
  let total = 0
//  console.log(netPrice)
  this.cartItems.forEach((item:any) => {
    total+=item.netPrice
    console.log(total)
    this.cartTotalPrice = Math.ceil(total);
    this.finalAmount = this.cartTotalPrice
  console.log(this.cartTotalPrice)
  })
  
}


//remove from cart
removeCartItem(id:any){
  this.api.removeCartItem(id).subscribe((result:any)=>{
    this.cartItems=result
    this.getCartTotalPrice()
    
  })
}

emptyCart(){
  this.api.emptyCart().subscribe((result:any)=>{
    this.cartItems = []
    this.getCartTotalPrice()
    this.api.cartCount()
  
  })
}

viewOffers(){
  this.offerStatus=true
}

discount10(){
  let discount = this.cartTotalPrice*(10/100)
  this.finalAmount = this.cartTotalPrice - discount
  this.offerStatus = false
  this.offerTagStatus=false
}
discount50(){
  let discount = this.cartTotalPrice*(50/100)
  this.finalAmount = this.cartTotalPrice - discount
  this.offerStatus=false
  this.offerTagStatus=false
}

submit(){
  if(this.addressForm.valid){
    this.paymentBtn=true
    this.user.username = this.addressForm.value.username
    this.user.addr1 = this.addressForm.value.addr1
    this.user.addr2 = this.addressForm.value.addr2
    this.user.state = this.addressForm.value.state
  }
  else{
    alert('Invalid details')
  }
}

//makepayment status change function
makepayment(){
  this.makePaymentStatus=true
}

//paypal function
private initConfig(): void {
  this.payPalConfig = {
      currency: 'EUR',
      clientId: 'sb',
      createOrderOnClient: (data) => < ICreateOrderRequest > {
          intent: 'CAPTURE',
          purchase_units: [{
              amount: {
                  currency_code: 'EUR',
                  value: '9.99',
                  breakdown: {
                      item_total: {
                          currency_code: 'EUR',
                          value: '9.99'
                      }
                  }
              },
              items: [{
                  name: 'Enterprise Subscription',
                  quantity: '1',
                  category: 'DIGITAL_GOODS',
                  unit_amount: {
                      currency_code: 'EUR',
                      value: '9.99',
                  },
              }]
          }]
      },
      advanced: {
          commit: 'true'
      },
      style: {
          label: 'paypal',
          layout: 'vertical'
      },
      onApprove: (data, actions) => {
          console.log('onApprove - transaction was approved, but not authorized', data, actions);
          actions.order.get().then((details:any) => {
              console.log('onApprove - you can get full order details inside onApprove: ', details);
          });

      },
      onClientAuthorization: (data) => {
          console.log('onClientAuthorization - you should probably inform your server about completed transaction at this point', data);
          this.showSuccess = true;
          this.emptyCart()
          alert('Payment Successful..Order Confirmed')
          setTimeout(() => {
            this.makePaymentStatus=false
            this.paymentBtn=false
          }, 3000);
          
          
      },
      onCancel: (data, actions) => {
          console.log('OnCancel', data, actions);
          this.showCancel = true;
          alert('Transaction has been cancelled')
          setTimeout(() => {
            this.makePaymentStatus=false
          }, 3000);
          
      },
      onError: err => {
          console.log('OnError', err);
          this.showError = true;
          alert('Transaction has been failed')
          setTimeout(() => {
            this.makePaymentStatus=false
          }, 3000);
          
      },
      onClick: (data, actions) => {
          console.log('onClick', data, actions);
          // this.resetStatus();
      }
  };
}

modalClose(){

  setTimeout(() => {
    this.addressForm.reset()
  this.paymentBtn=false
  this.makePaymentStatus=false
  this.showCancel=false
  this.showSuccess=false
  this.showError=false
  this.cartTotalPrice
  }, 5000);

  
}
}
