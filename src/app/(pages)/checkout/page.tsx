// "use client";

// import { Elements } from "@stripe/react-stripe-js";
// import { loadStripe } from "@stripe/stripe-js";
// import CheckoutForm from "./CheckoutForm";
// import { useSearchParams } from "next/navigation";

// // Make sure to call `loadStripe` outside of a component’s render to avoid
// // recreating the `Stripe` object on every render.
// const stripePromise = loadStripe(
//   process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY as string
// );

// console.log("Stripe key", process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY);

// export default function Checkout() {
//   //get client secret fron location state
//   const clientSecret = useSearchParams().get("scs"); // scs - stripe client secret

//   if (!clientSecret)
//     return (
//       <div>
//         <p>Missing client secret</p>
//       </div>
//     );

//   const options = {
//     // passing the client secret obtained from the server
//     clientSecret,
//   };

//   return (
//     <Elements stripe={stripePromise} options={options}>
//       <CheckoutForm />
//     </Elements>
//   );
// }


import React from 'react'

const page = () => {
  return (
    <div>
      <h1>Checkout</h1>
    </div>
  )
}

export default page
