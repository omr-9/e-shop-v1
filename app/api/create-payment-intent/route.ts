import { NextRequest, NextResponse } from "next/server";
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)
export async function POST(request:NextRequest) {
    try {
        const {totalPriceWithVat} = await request.json()
        const paymentIntent = await stripe.paymentIntents.create({
           amount:totalPriceWithVat,
           currency:'usd',
           automatic_payment_methods:{enabled : true}
        })
        return NextResponse.json({clientSecret: paymentIntent.client_secret})
        
    } catch (error) {
        console.log('Internal Error :', error)
         return NextResponse.json(
            {error:`Internal Server Error: ${error}` },
            {status:500}

         )
    }
}