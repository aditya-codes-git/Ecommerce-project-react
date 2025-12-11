import axios from 'axios';
import { useState, useEffect, Fragment } from 'react';
import { Header } from '../components/Header';
import './OrdersPage.css'
import dayjs from 'dayjs';
import { formatMoney } from '../utils/money';

export function OrdersPage({ cart }) {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    axios.get('/api/orders?expand=products')
      .then((response) => {
        setOrders(response.data);
      });
  }, []);

  return (
    <>
      <title>Orders</title>

      <Header cart={cart} />

      <div class="orders-page">
        <div class="page-title">Your Orders</div>

        <div class="orders-grid">
          {orders.map((orders) => {
            return (
              <div key={orders.id} class="order-container">

                <div class="order-header">
                  <div class="order-header-left-section">
                    <div class="order-date">
                      <div class="order-header-label">Order Placed:</div>
                      <div>{dayjs(orders.orderTimeMs).format('MMMM D')}</div>
                    </div>
                    <div class="order-total">
                      <div class="order-header-label">Total:</div>
                      <div>{formatMoney(orders.totalCostCents)}</div>
                    </div>
                  </div>

                  <div class="order-header-right-section">
                    <div class="order-header-label">Order ID:</div>
                    <div>{orders.id}</div>
                  </div>
                </div>

                <div class="order-details-grid">
                  {orders.products.map((orderProduct) => {
                    return (
                      <Fragment key={orderProduct.product.id}>
                        <div class="product-image-container">
                          <img src={orderProduct.product.image} />
                        </div>

                        <div class="product-details">
                          <div class="product-name">
                            {orderProduct.product.name}
                          </div>
                          <div class="product-delivery-date">
                            Arriving on: {dayjs(orderProduct.estimatedDeliveryTimeMs).format('MMMM D')}
                          </div>
                          <div class="product-quantity">
                            Quantity: {orderProduct.quantity}
                          </div>
                          <button class="buy-again-button button-primary">
                            <img class="buy-again-icon" src="images/icons/buy-again.png" />
                            <span class="buy-again-message">Add to Cart</span>
                          </button>
                        </div>

                        <div class="product-actions">
                          <a href="/tracking">
                            <button class="track-package-button button-secondary">
                              Track package
                            </button>
                          </a>
                        </div>
                      </Fragment>
                    );
                  })}
                
                </div>
              </div>
            );
          })}

        </div>
      </div>
    </>
  );
}