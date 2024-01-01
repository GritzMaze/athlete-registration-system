import { Stripe, loadStripe } from '@stripe/stripe-js';
import { config } from '../config';

class StripeService {

    private stripe: Promise<Stripe | null>;
    constructor() {
        this.stripe = loadStripe(config.stripePublicKey);
    }


    public getStripe() {
        return this.stripe;
    }
}

export const stripeService = new StripeService();