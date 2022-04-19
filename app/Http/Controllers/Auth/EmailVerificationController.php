<?php

namespace App\Http\Controllers\Auth;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\ApiError;

class EmailVerificationController extends Controller
{

    public function resend(Request $request)
    {
        dd($request);
        if(!$request->user()->hasVerifiedEmail()) {
            $request->user()->sendEmailVerificationNotification();
            return new ApiError('Verification email sent.', 200);
        }else{
            return new ApiError('Email already verified.', 200);
        }
    }

    public function verify(Request $request, $id, $hash)
    {
        if($request->user()->id !== $id) {
            return new ApiError('Invalid user.', 400);
        }
        if($request->user()->hash !== $hash) {
            return new ApiError('Invalid hash.', 400);
        }
        if($request->user()->hasVerifiedEmail()) {
            return new ApiError('Email already verified.', 200);
        }
        $request->user()->markEmailAsVerified();
        return new ApiError('Email verified.', 200);
    }

}
