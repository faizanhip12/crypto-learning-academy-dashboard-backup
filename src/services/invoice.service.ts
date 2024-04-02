import http from 'src/services/httpService';
import { AxiosResponse } from 'axios'
import { GetParams } from 'src/services/service'

const Services = {
    createPaymentIntent(body: any): Promise<AxiosResponse> {
        return http.post(`/invoice/payment_intents`, body);
    },
    paymentIntentConfirm(intentId: string): Promise<AxiosResponse> {
        return http.get(`/invoice/payment_intents/confirm/${intentId}`,);
    },
    getInvoices(): Promise<AxiosResponse> {
        return http.get(`/invoice`);
    }
};

export default Services;
