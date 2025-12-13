import axios from 'axios';
import { useState, useEffect } from 'react';
import { OrderSummary } from './OrderSummary';
import { CheckoutPageHeader } from './CheckoutPageHeader';
import { PaymentSummary } from './PaymentSummary';
import './CheckoutPage.css'
import './CheckoutPageHeader.css'

export function CheckoutPage({ cart, loadCart }) {
  const [deliveryOptions, setDeliveryOptions] = useState([]);
  const [paymentSummary, setPaymentSummary] = useState(null);

  useEffect(() => {
    const fetchCheckoutData = async () => {
      let response = await axios.get('/api/delivery-options?expand=estimatedDeliveryTime');
      setDeliveryOptions(response.data);

      response = await axios.get('/api/payment-summary')
      setPaymentSummary(response.data);
    };

    fetchCheckoutData();
  }, [cart]);

  return (
    <>
      <title>Checkout</title>

      <CheckoutPageHeader paymentSummary={paymentSummary} />

      <div className="checkout-page">
        <div className="page-title">Review your order</div>

        <div className="checkout-grid">
          <OrderSummary deliveryOptions={deliveryOptions} cart={cart} loadCart={loadCart} />

          <PaymentSummary paymentSummary={paymentSummary} loadCart={loadCart} />
        </div>
      </div>
    </>
  );
}