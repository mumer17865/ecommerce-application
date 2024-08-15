import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from '../services/cart.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatBadgeModule } from '@angular/material/badge';
import { CurrencyPipe } from '@angular/common';
import axios from 'axios';
import { PkrCurrencyPipe } from "../pkr-currency.pipe";

@Component({
  selector: 'app-checkout',
  standalone: true,
  providers: [CurrencyPipe]  ,
  imports: [CommonModule, FormsModule, MatIconModule, MatButtonModule, MatBadgeModule, PkrCurrencyPipe],
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  deliveryCharge = 199;
  cartItems: any[] = [];
  name: any;
  contact: any;
  email: any;
  address: any;
  ins: any;
  time: any;
  showCartItem: boolean = false;

  constructor(private CurrencyPipe: CurrencyPipe, private cartService: CartService, private router: Router) {}

  ngOnInit() {
    this.loadCartItems();
    this.updateShowCartItem();
  }

  clearCart() {
    this.cartService.clearCart();
    this.updateShowCartItem();
  }

  loadCartItems() {
    this.cartItems = this.cartService.getCartItems().map(item => ({
      ...item,
      total: item.price * item.quantity
    }));
  }

  getSubtotal(): number {
    return this.cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  }

  getGrandTotal(): number {
    return this.getSubtotal() + this.deliveryCharge;
  }

  updateShowCartItem() {
    this.showCartItem = this.cartItems.length > 0;
  }

  placeOrder() {
    const orderData = {
      cartItems: this.cartItems,
      customerInfo: {
        name: this.name,
        contact: this.contact,
        address: this.address,
        email: this.email
      }
    };
  
    console.log(orderData);
  
    axios.post('http://localhost:3000/orders/checkout', orderData)
      .then((response) => {
        if (response.data.success) {
          alert('Order placed successfully!');
          this.router.navigate(['/dashboard']);
          this.cartService.clearCart();
        } else {
          alert('Request failed: ' + (response.data.message || 'Unknown error'));
        }
      })
      .catch((error) => {
        alert('Request failed: ' + (error.response?.data?.message || 'Unknown error'));  
      });
  }
}
