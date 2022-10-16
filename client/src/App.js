import React, { useState } from 'react';
import StripeCheckout from 'react-stripe-checkout';

function App() {

  const [product, setProduct] = useState({
    name: "Reactjs",
    price: 10,
    productBy: 'Facebook'
  })

  const makePayment = token => {
    const body = {
      token,
      product
    }
    const header = {
      "Content-Type": "application/json"
    }

    return fetch(`http://localhost:5000/payment`, {
      method: 'POST',
      header,
      body: JSON.stringify(body)
    }).then(res => {
      console.log('Response', res)
      const { status } = res;
      console.log('Status', status)
    })
      .catch(err => console.log(err))
  }

  return (
    <div className="App">
      Stripe
      <StripeCheckout
        //Publishable key
        // stripeKey={process.env.REACT_APP_KEY}
        stripeKey="pk_test_51He1P4Jz7nbfLVoYDBP7q8kVxEZLjLd34krGafVPawZ4PIkziUVjrOyzePVtXM3rkRoo04sVfvFjBuRZehSWy8Xu00kIVA41KE"
        token={makePayment}
        amount={product.price * 100}
        name="Reactjs"
        shippingAddress
        billingAddress
      />
    </div>
  );
}

export default App;
