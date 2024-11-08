'use client'

import converToSubcurrency from "@/lib/convertToSubcurrency"
import { PaymentElement, useElements, useStripe } from "@stripe/react-stripe-js"
import { useEffect, useState } from "react"
import { Button } from "./ui/button"

const CheckoutForm = ({ totalPriceWithVat }: { totalPriceWithVat: number }) => {
    const stripe = useStripe()
    const elements = useElements()
    const [errorMessage, setErrorMessage] = useState<string | null>(null)
    const [clientSecret, setClientSecret] = useState<string>("")
    const [loading, setLoading] = useState<boolean>(false)

    // Fetch the clientSecret when the total price changes
    useEffect(() => {
      if (totalPriceWithVat <= 0) return; // Prevent fetch if totalPrice is invalid

      const fetchClientSecret = async () => {
        const response = await fetch('/api/create-payment-intent', {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ totalPriceWithVat: converToSubcurrency(totalPriceWithVat) }),
        })
        const data = await response.json()
        setClientSecret(data.clientSecret) // Set the clientSecret in state
      }

      fetchClientSecret()
    }, [totalPriceWithVat])

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault()

        if (!stripe || !elements || !clientSecret) {
            return; // Make sure Stripe.js and elements are loaded, and clientSecret is available
        }

        setLoading(true) // Start loading state

        // Call elements.submit() before any async work
        const { error: submitError } = await elements.submit()

        if (submitError) {
            setErrorMessage(submitError.message || "An error occurred during payment.")
            setLoading(false)
            return
        }

        // After submit, call confirmPayment
        const { error } = await stripe.confirmPayment({
            elements,
            clientSecret,
            confirmParams: {
                return_url: `${window.location.origin}/payment-success?totalPrice=${totalPriceWithVat}`, // Adjust return URL dynamically
            },
        })

        if (error) {
            setErrorMessage(error.message || "An error occurred during payment.") // Set the error message
        } else {
            // Handle successful payment
            setErrorMessage(null) // Clear any error messages
        }

        setLoading(false) // Stop loading state
    }

    // Show a loading spinner while Stripe and elements are not ready
    if (!stripe || !elements || !clientSecret) {
        return (
          <div className="flex items-center justify-center">
            <div
              className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] text-surface motion-reduce:animate-[spin_1.5s_linear_infinite] dark:text-white"
              role="status"
            >
              <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
                Loading...
              </span>
            </div>
          </div>
        )
    }

    return (
      <form onSubmit={handleSubmit} className="bg-white p-2 rounded-md">
        {clientSecret && <PaymentElement />}

        {/* Display error message if there's any */}
        {errorMessage && (
          <div className="text-red-500 mt-4 text-center">
            {errorMessage}
          </div>
        )}

        <button
          disabled={!stripe || loading}
          className="text-white w-full p-5 bg-black mt-2 rounded-md font-bold disabled:opacity-50 disabled:animate-pulse"
        >
          {!loading ? `Pay $${totalPriceWithVat}` : "Processing..."}
        </button>
      </form>
    )
}

export default CheckoutForm
