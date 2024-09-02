import React from "react";
import { Elements } from "@stripe/react-stripe-js";

import { PaymentForm } from "./paymentForm";
import getStripe from "src/shared/utils/get-stripejs";

interface PaymentViewProps {
  handlePaymentSubmit: (
    stripeId: string,
    email: string,
    number?,
    stripeData?,
    country?: string
  ) => void;
  currency: string;
  amount?: number;
  recurring?: boolean | null | undefined;
  priceId?: string | null | undefined;
  isUserAuthenticated?: boolean;
  email?: string | null | undefined;
  isEmailInputField?: boolean;
}
const Payment: React.FC<PaymentViewProps> = ({
  handlePaymentSubmit,
  currency,
  amount,
  recurring,
  priceId,
  isUserAuthenticated,
  email,
  isEmailInputField,
}): JSX.Element => {
  return (
    <>
      <Elements stripe={getStripe()}>
        <PaymentForm
          handlePaymentSubmit={handlePaymentSubmit}
          currency={currency}
          amount={amount}
          recurring={recurring}
          priceId={priceId}
          isUserAuthenticated={isUserAuthenticated}
          email={email}
          isEmailInputField={isEmailInputField}
        />
      </Elements>
    </>
  );
};

export default Payment;
