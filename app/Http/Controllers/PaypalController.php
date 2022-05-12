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
        $session = Session::find($sessionId);
        if(!$session) {
            return response()->json([
                'message' => 'Not found'
            ], 404);
        }
        $contribution = $session->contribution()->first();
        $amount = $request->amount;
        $convertedAmount =  $amount / +env('XAF_USD_VALUE', 621.61);
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
                    'price' => $convertedAmount,
                    'desc'  => 'Payement de la cotisation: '.$contribution->name,
                ]
            ];

            $product['invoice_id'] = $payment->id;
            $product['invoice_description'] = "Order #{$product['invoice_id']} Bill";
            $product['return_url'] = env('PAYPAL_RETURN_URL')."?selected_p=$payment->id";
            $product['cancel_url'] = env('PAYPAL_RETURN_URL')."?selected_p=$payment->id";
            $product['total'] = $convertedAmount;

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

        /**@var Payment|null */
        $payment = Payment::find($paymentId);

        if (in_array(strtoupper($response['ACK']), ['SUCCESS', 'SUCCESSWITHWARNING'])) {
            if($payment) {
                $c = $payment->session()->first()->contribution()->first();
                $c->balance = $c->balance + $payment->amount;
                $c->save();
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
