<?php

namespace App\Http\Controllers;

use App\Models\Payment;
use App\Models\Session;
use App\Models\User;
use Illuminate\Http\Request;
use Srmklive\PayPal\Services\ExpressCheckout;

class PaypalController extends Controller
{
    public function handlePayment(Request $request)
    {
        $sessionId = $request->session_id;
        $session = Session::fing($sessionId);
        $contribution = $session->contribution();
        $amount = $request->amount;
        $user = User::findOrFail($request->user()->id);

        $payment = Payment::create([
            'user_id' => $user->id,
            'session_id' => $sessionId,
            'status' => 'pending',
            'method' => 'paypal',
            'amount' => $amount
        ]);

        if($session) {
            $product = [];
            $product['items'] = [
                [
                    'name' => $user->firstname.' '.$user->lastname,
                    'price' => $request->amount,
                    'desc'  => 'Payement de la cotisation: '.$contribution->name,
                ]
            ];

            $product['invoice_id'] = $payment->id;
            $product['invoice_description'] = "Order #{$product['invoice_id']} Bill";
            $product['return_url'] = route('success.payment');
            $product['cancel_url'] = route('cancel.payment');
            $product['total'] = $amount;

            $paypalModule = new ExpressCheckout();
            $res = $paypalModule->setExpressCheckout($product);
            $res = $paypalModule->setExpressCheckout($product, true);

            return response()->json([
                'link'=>$res['paypal_link']
            ], 200);
        }
    }

    public function paymentSuccess(Request $request)
    {
        $paypalModule = new ExpressCheckout;
        $response = $paypalModule->getExpressCheckoutDetails($request->token);
        $paymentId = $response['InvoiceID'];

        $payment = Payment::find($paymentId);

        if (in_array(strtoupper($response['ACK']), ['SUCCESS', 'SUCCESSWITHWARNING'])) {
            if($payment) {
                $payment->status = 'paid';
                $payment->save();
            }

        } else {
            $payment->status = 'failed';
            $payment->save();
        }
    }

    public function paymentCancel()
    {
        dd('Your payment has been declend. The payment cancelation page goes here!');
    }
}
