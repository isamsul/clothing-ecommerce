import StripeCheckout from "react-stripe-checkout";

const StripeCheckoutButton = ({price}) => {
  const priceForStripe = price * 100;
  const publishableKey = 'pk_test_51J6ci7Hi2d1dQvdWromIIAN84riySikPa88ooOiZOoPswZnkeDT781YwCnbry58FVkrvDFCv5wF95G41diD78VIk00W2mPy1IT';

  const onToken = token => {
    console.log(token)
    alert('Payment Successful')
  }

  return(
    <StripeCheckout
      label="Py Now"
      name="CROWN Clothing Ltd."
      billingAddress
      shippingAddress
      image="https://svgshare.com/i/CUz.svg"
      description={`Your total is $${price}`}
      panelLabel="Pay Now"
      token={onToken}
      stripeKey={publishableKey}
    
    />
  )

}

export default StripeCheckoutButton;