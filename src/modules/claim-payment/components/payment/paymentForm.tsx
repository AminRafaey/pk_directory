import React, { useRef, useState } from "react";
import { useRouter } from "next/router";
import { Controller, useForm } from "react-hook-form";

import { styled } from "@mui/material/styles";
import LockIcon from "@mui/icons-material/Lock";

// Stripe Imports
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import axios from "axios";

import { CARD_OPTIONS, StripeFiledContainer } from "components/stripe";
import { RefType, Toastify } from "src/shared/components/Tosatify";
import { Box, CircularProgress } from "@mui/material";
import { LoadingWrapperClaim, SecurePayButton } from "../claim-payment-styled";
import { EMAIL_REGEX } from "src/shared/constant";
import { InputTextField } from "components/InputTextField";

const BoxStyled4 = styled("div")`
  padding-top: 0.25rem;
  padding-bottom: 0.25rem;
  width: 100%;
  border-color: rgba(60, 60, 60, 1);
  border-radius: 0.375rem;
  margin-top: 2rem;
  font-size: 16.8px;
  font-family: "Saira";
  line-height: 21.6px;
`;

type FormFieldTypes = {
  email: string;
  inputnumber: string;
};

interface PaymentFormProps {
  handlePaymentSubmit: (
    stripeId: string,
    email: string,
    inputnumber?: string,
    stripeData?,
    country?: string
  ) => void;
  currency: string;
  amount?: number;
  recurring: boolean | null | undefined;
  priceId?: string | null | undefined;
  isUserAuthenticated?: boolean;
  email?: string | null | undefined;
  emailPhoneInputRecordId?: string | null | undefined;
  isEmailInputField?: boolean;
}

export const PaymentForm: React.FC<PaymentFormProps> = ({
  handlePaymentSubmit,
  currency,
  amount,
  recurring,
  priceId,
  isUserAuthenticated = false,
  email,
  isEmailInputField,
}) => {
  const router = useRouter();
  const successAlert = useRef<RefType>(null);
  const errorAlert = useRef<RefType>(null);
  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm<FormFieldTypes>();
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const [isFocus, setIsFocus] = useState(false);
  // for latter  use setSelectedCountry
  const [selectedCountry, setSelectedCountry] = useState("");
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmitPay = async (data: FormFieldTypes): Promise<any> => {
    setIsLoading(true);
    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    axios
      .post("/api/Payment?pay=true", {
        email,
        currency,
        amount,
      })
      .then(async (res) => {
        const clientSecret = res.data.client_secret;

        const result = await stripe.confirmCardPayment(clientSecret, {
          payment_method: {
            card: elements.getElement(CardElement),
            billing_details: {
              email,
            },
          },
        });
        if (result.error) {
          // Show error to your customer (e.g., insufficient funds)
          console.log(result.error.message);
         
        } else if (result.paymentIntent.status === "succeeded") {
          setIsLoading(false);
          reset();
          // The payment has been processed!
          if (data?.inputnumber) {
            handlePaymentSubmit(
              result.paymentIntent.id,
              email || data.email,
              data.inputnumber,
              result,
              selectedCountry
            );
          } else {
            handlePaymentSubmit(result.paymentIntent.id, email || data.email);
          }
          // Show a success message to your customer
          // There's a risk of the customer closing the window before callback
          // execution. Set up a webhook or plugin to listen for the
          // payment_intent.succeeded event that handles any business critical
          // post-payment actions.
        }
      })
      .catch((e) => {
        console.log(e);
        router.push(
          `${window.location.origin}/checkout?status=cancel&returnTo=${window.location.href}`
        );
      });
  };

  const handleSubmitSub = async (data: FormFieldTypes): Promise<any> => {
    setIsLoading(true);
    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    const result = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardElement),
      billing_details: {
        email: email || data.email,
      },
    });
    if (result.error) {
      console.log(result.error.message);
    } else {
      axios
        .post("/api/Payment?sub=true", {
          payment_method: result.paymentMethod.id,
          email: email || data.email,
          priceId,
        })
        .then((res) => {
          // eslint-disable-next-line camelcase
          const { client_secret: clientSecret, status } = res.data;
          if (status === "requires_action") {
            stripe
              .confirmCardPayment(clientSecret)
              .then((paymentConfirmationRes) => {
                if (paymentConfirmationRes.error) {
                  console.log(paymentConfirmationRes.error);
                  // Display error message in your UI.
                  // The card was declined (i.e. insufficient funds, card has expired, etc)
                } else {
                  // it might need to send the phone number on a conditional basis in the future
                  handlePaymentSubmit(
                    paymentConfirmationRes.paymentIntent.id,
                    email || data.email,
                    data.inputnumber
                  );
                  // Show a success message to your customer
                }
              });
          } else {
            handlePaymentSubmit(
              res.data.id,
              email || data.email,
              data.inputnumber
            );
            // No additional information was needed
            // Show a success message to your customer
          }
        })
        .catch((e) => {
          console.log(e);
          router.push(
            `${window.location.origin}/checkout?status=cancel&returnTo=${window.location.href}`
          );
        });
    }
  };
  return (
    <>
      <Toastify
        ref={successAlert}
        type="success"
        message="Your payment has been successfully received"
      />
      <Toastify ref={errorAlert} type="error" message={errorMessage} />
      <form
        onSubmit={handleSubmit(recurring ? handleSubmitSub : handleSubmitPay)}
        noValidate
      >
        <Box marginTop="28px" width="413px">
          {!isUserAuthenticated && (
            <>
              {!email && (
                <Controller
                  name="email"
                  control={control}
                  rules={{
                    required: true,
                    pattern: EMAIL_REGEX,
                  }}
                  render={({ field }) => (
                    <InputTextField
                      field={field}
                      errors={errors.email && "Email is required"}
                      placeholder="Email"
                    />
                  )}
                />
              )}

              <StripeFiledContainer isFocus={isFocus}>
                <CardElement
                  options={CARD_OPTIONS}
                  onFocus={() => setIsFocus(true)}
                  onBlur={() => setIsFocus(false)}
                  onChange={(e) => {
                    if (e.error) {
                      setErrorMessage(
                        e.error.message ?? "An unknown error occured"
                      );
                    }
                  }}
                />
              </StripeFiledContainer>
            </>
          )}
        </Box>
        <SecurePayButton type="submit">
          {isLoading ? (
            <LoadingWrapperClaim>
              <CircularProgress sx={{ color: "white" }} size={20} />
            </LoadingWrapperClaim>
          ) : (
            <>
              <LockIcon sx={{ marginRight: "8px" }} />
              SECURE PAY
            </>
          )}
        </SecurePayButton>
      </form>
    </>
  );
};
