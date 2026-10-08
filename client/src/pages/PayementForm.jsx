import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import axios from "axios";

function PaymentForm() {
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { data } = await axios.post(
      "http://localhost:5000/api/payment/create-payment-intent",
      {
        amount: 2500,
        customerName: "Iqbal"
      }
    );

    const result = await stripe.confirmCardPayment(data.clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement)
      }
    });

    if (result.paymentIntent.status === "succeeded") {
      await axios.post("http://localhost:5000/api/payment/save-order", {
        customerName: "Iqbal",
        amount: 2500,
        paymentId: result.paymentIntent.id
      });

      alert("Payment successful and order saved!");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardElement />
      <button type="submit">Pay</button>
    </form>
  );
}

export default PaymentForm;