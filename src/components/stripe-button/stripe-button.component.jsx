import React from 'react';

import StripeCheckout from 'react-stripe-checkout';

const StripeCheckoutButton = ({ price }) => {
    const priceForStripe = price * 100;
    const publishableKey = 'pk_test_yZwlOcgQ0UeI9MNr3FdbJlWd00ncLPyKVf';

    const onToken = token =>{
    console.log(token)
    }
    return (
        <StripeCheckout
            label='Pay Now'
            name='Ecommerce'
            billingAddress
            shippingAddress
            image='http://svgshare.com/i/CUz.svg'
            description={`Your total is ${price}`}
            amount={priceForStripe}
            panelLabel='Pay Now'
            token={onToken}
            stripeKey={publishableKey}
        />
    )
}

export default StripeCheckoutButton;