import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import axios from 'axios';
import { CurrencyPipe } from '@angular/common';
import { PkrCurrencyPipe } from '../pkr-currency.pipe';
import { FormsModule } from '@angular/forms';
import { CartService } from '../services/cart.service';

interface Product {
  productId: number;
  productName: string;
  desc: string;
  image: string;
  price: number;
  quantity: number;
  createdAt: string;
  updatedAt: string;
  display: boolean ;
}

@Component({
  standalone:true,
  providers:[CurrencyPipe],
  imports:[PkrCurrencyPipe, FormsModule],
  selector: 'app-productdetails',
  templateUrl: './productdetails.component.html',
  styleUrls: ['./productdetails.component.css']
})
export class ProductdetailsComponent implements OnInit {
  quat = 1;
  cartItems: any[] = [];
  showCartItem: boolean = false;
  ItemList: Product[] = [];
  constructor(private route: ActivatedRoute, private CurrencyPipe: CurrencyPipe, private cartService: CartService) {}

decrement() {
  if(this.quat>1){
  this.quat--;
}}
increment() {
 this.quat++;
}
  productId: number | undefined;
  Item: Product[] = [];

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.productId = +params['id']; // The '+' operator converts the string to a number
      console.log('Product ID:', this.productId);
    });
    axios.get(`http://localhost:3000/products/itemList/${this.productId}`)
    .then((response) => {
      this.Item = response.data;
      console.log(this.Item);
    })
    .catch((error) => {
      console.log(error);
    });
  }

  increment1(productId: number, quantity: number): void {
    const product = this.Item.find(p => p.productId === productId);
    if (product) {
      this.cartService.addToCart(productId, quantity);
      this.loadCartItems(); // Reload cart items to update the view
    }
  }

  loadCartItems() {
    const cartItems = this.cartService.getCartItems();
    this.cartItems = cartItems.map((item: any) => {
      const product = this.ItemList.find(p => p.productId === item.productId);
      if (product) {
        return { ...product, quantity: item.quantity, total: product.price * item.quantity };
      }
      return null;
    }).filter(item => item !== null);
    this.updateShowCartItem();
  }
  updateShowCartItem() {
    this.showCartItem = this.cartItems.length > 0;
  }

  
}
