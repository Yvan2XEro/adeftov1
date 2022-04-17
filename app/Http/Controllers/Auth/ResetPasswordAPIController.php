<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Validator;
use Illuminate\Auth\Events\PasswordReset;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Password;
use Illuminate\Foundation\Auth\ResetsPasswords;

/**
 * @Group(name="ResetPassword", description="The reset password endpoint")
 */
class ResetPasswordAPIController extends Controller
{

    use ResetsPasswords;

    /**
     * Reset the given user's password.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\RedirectResponse|\Illuminate\Http\JsonResponse
     */
    /**
     * @Endpoint(name="ResetPassword")
     * @BodyParam(name="email", type="string", status="required"))
     * @BodyParam(name="token", type="string", status="required", description="The token via email")
     * @BodyParam(name="password", type="string", status="required", description="user password")
     * @BodyParam(name="password_confirmation", type="string", status="required", description="user password confirmation")
     * @ResponseExample(status=200, file="responses/auth/successresetpassword.json")
     * @ResponseExample(status=422, file="responses/auth/resetpassordinvalid.json")
     */
    public function reset(Request $request)
    {
        //$request->validate($this->rules(), $this->validationErrorMessages());

        $validator = Validator::make($request->all(), [
            'token' => ['required', 'max:255'],
            'email' => ['required', 'email', 'max:255'],
            'password' => ['required', 'confirmed'],
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()->all()], 400);
        }
        // Here we will attempt to reset the user's password. If it is successful we
        // will update the password on an actual user model and persist it to the
        // database. Otherwise we will parse the error and return the response.

        $response = $this->broker()->reset(
            $this->credentials($request),
            function ($user, $password) {
                $this->resetPassword($user, $password);
            }
        );

        return $response == Password::PASSWORD_RESET
            ? $this->sendResetResponse($request, $response)
            : $this->sendResetFailedResponse($request, $response);
    }
    /**
     * Reset the given user's password.
     *
     * @param  \Illuminate\Contracts\Auth\CanResetPassword  $user
     * @param  string  $password
     * @return void
     */
    protected function resetPassword($user, $password)
    {
        $this->setUserPassword($user, $password);
        $user->save();
        event(new PasswordReset($user));
    }



    /**
     * Get the response for a successful password reset.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  string  $response
     * @return \Illuminate\Http\JsonResponse
     */
    protected function sendResetResponse(Request $request, $response)
    {
        return response()->json(['success' => ["message" => trans($response)]], 200);
    }

    /**
     * Get the response for a failed password reset.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  string  $response
     * @return \Illuminate\Http\JsonResponse
     */
    protected function sendResetFailedResponse(Request $request, $response)
    {
        return response()->json(['error' => ["message" => trans($response)]], 422);
    }
}
