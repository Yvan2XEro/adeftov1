<?php

namespace App\Http\Controllers;

use App\Models\Payment;
use App\Models\Session;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

class PaymentController extends Controller
{

    public function mobileMoneyPayment(Request $request)
    {
        $session = Session::find($request->session_id);
        $amount = $request->amount;
        $currency = config('app.currency');
        $user = User::find($request->user_id);

        if (!$session) {
            return response()->json(['message' => 'Session not found'], 404);
        }

        $result = $this->getCinetPayPaymentLink($session, $currency ,$user, $amount);

        if($result instanceof JsonResponse) {
            return $result;
        } else {
            return response()->json([
                'payment_link' => $result,
            ], 200);
        }
    }

    public function notification(Request $request) {
        $transactionId = $request->cpm_trans_id;
        $siteId = $request->cpm_site_id;
        $payment = Payment::firstWhere([
            'payment_id' => $request->payment_id
        ]);
        if($payment && config('CINET_PAY_SITE_ID')== $siteId) {
            $response = Http::post(config('CINET_PAY_TRANSACTION_VERIFICATION_URL'),[
                'apikey' => config('CINET_PAY_API_KEY'),
                'site_id' => config('CINET_PAY_SITE_ID'),
                'transaction_id' => $transactionId,
            ])->array();

            if(+$response['code']==600) {
                $payment->status = 'failed';
                $payment->payment_method = $response['data']['payment_method'];
                $payment->payment_date = $response['data']['payment_date'];
                $payment->save();
            } elseif(+$response['code']==0) {
                $payment->status = 'success';
                $payment->operation_id = $response['data']['operation_id'];
                $payment->payment_method = $response['data']['payment_method'];
                $payment->payment_date = $response['data']['payment_date'];
                $payment->save();
            }
        }
    }

    public function mesombPayment(Request $request) {
        $sessionId = $request->session_id;
        $amount = $request->amount;
        $phone = $request->phone;
        $user = User::findOrFail($request->user()->id);
        $payment = Payment::create([
            'amount' => $amount,
            'user_id' => $user->id,
            'session_id' => $sessionId,
        ]);
        $response = $payment->payment($phone,  $amount)->pay();
        if($response->success) {
            $payment->status = 'paid';
            return response()->json([
                'message' => 'Payment successful',
                'payment' => $payment,
            ], 200);
        }
        return response()->json([
            'message' => 'Payment failed',
            'payment' => $payment,
        ], 400);
    }

    private function getCinetPayPaymentLink(
        Session $session,
        User $user,
        $currency,
        $amount,
    ): string | JsonResponse{
        $transactonDescription = 'Payement de la seance ' . $session->date.'Pour la cotisation :'.$session->contribution->name;
        $transactionId = uniqid();
        $payment = $session->payments()->create([
            'amount' => $amount,
            'currency' => $currency,
            'transaction_id' => $transactionId,
            'customer_name' => $user->lastname,
            'customer_surname' => $user->firstname,
            'status' => 'pending',
            'description' => $transactonDescription,
            'payment_token' => '',
            'user_id' => $user->id,
            'session_id' => $session->id,
        ]);

        $data = [
            'amount' => $amount,
            'apikey' => config('cinetpay.apikey'),
            'site_id' => config('cinetpay.site_id'),
            'currency' => 'XAF',
            'transaction_id' => $transactionId,
            'description' => $transactonDescription,
            'notify_url' => config('cinetpay.notify'),
            'return_url' => config('cinetpay.return'),
            'customer_name' => $user->lastname,
            'customer_surname' => $user->firstname,
            'alternative_currency' => config('cinetpay.alternative_currency'),
            'customer_email' => $user->email,
            'customer_phone_number' => $user->phone,
            'customer_address' => 'Fongo Tongo, Dschang',
            'customer_city' => 'Dschang',
            'customer_country' => 'Cameroun',
            'customer_state' => 'Dschang',
        ];

        $response = Http::post(config('cinetpay.CINET_PAY_CHECKOUT'), $data);
        $responseData = $response->array();
        if(+$responseData['code'] != 201) {
            $payment = $session->payments()->where('id', $payment->id);
            $payment->update([
                'status' => 'failed',
            ]);
            return response()->json([
                'message' => 'Une erreur est survenue lors de la création du paiement',
                'code' => $responseData['code'],
                'error' => $responseData['error'],
            ], 503);
        }
        $payment_url = $responseData['data']['payment_url'];
    }
}
