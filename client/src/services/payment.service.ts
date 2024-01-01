import { message } from 'antd';
import { config } from '../config';
import { stripeService } from './stripe-service';

interface Payment {
    product: string;
    quantity: number;
    mode: 'payment' | 'subscription';
    successUrl: string;
    cancelUrl: string;
    metadata?: Record<string, string>;
}

class PaymentService {

    private products_to_key_map: Record<string, string> = {
        registration: config.stripeRegistrationStripeId
    }
    async checkout(payment: Payment) {
        const stripe = await stripeService.getStripe();
        
        if (!stripe) {
            message.error('Stripe is not loaded');
            return;
        }

        const { product, quantity, mode, successUrl, cancelUrl, metadata } = payment;

        const stripeId = this.products_to_key_map[product];

        if (!stripeId) {
            message.error('Invalid product');
            return;
        }

        const { error } = await stripe.redirectToCheckout({
            lineItems: [{ price: stripeId, quantity }],
            mode,
            successUrl,
            cancelUrl,
            customerEmail: metadata?.email
        });

        if (error) {
            message.error(error.message);
        }
    }
}

export const paymentService = new PaymentService();