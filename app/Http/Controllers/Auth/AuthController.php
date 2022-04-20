<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;

use Illuminate\Support\Facades\{Auth, Validator, Hash};
use App\Models\ApiError;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use App\Models\User;
use Illuminate\Auth\Events\Registered;

/**
 * @Group(name="Auth", description="The authentication endpoint")
 */
class AuthController extends Controller
{
    /**
     * @Endpoint(name="Register")
     * @BodyParam(name="firstname", type="string", status="required", description="A first name", example="John")
     * @BodyParam(name="lastname", type="string", status="required", description="A last name", example="Doe")
     * @BodyParam(name="phone", type="string",status="optional", description="A user phone")
     * @BodyParam(name="email", type="string", status="required", description="user email", example="example@test.com")
     * @BodyParam(name="password", type="string", status="required", description="user password")
     * @ResponseExample(status=200, file="responses/auth/register.json")
     * @ResponseExample(status=422, file="responses/auth/registererrors.json")
     */
    public function register(Request $request)
    {
        $data = $request->all();
        // dd($request->all());
        $validator = Validator::make($data, [
            'firstname' => 'required',
            'lastname' => 'required',
            'phone' => 'required',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string',
        ]);
        if ($validator->fails()) {
            return response(['errors' => $validator->errors()->all()], 422);
        }
        $request['password'] = Hash::make($request['password']);
        $request['remember_token'] = Str::random(10);
        try {
            $user = User::create($request->toArray());
            //code...
        } catch (\Exception $e) {
            dd($e);
        }


        # Atache Role to simple user
        // $user->attachRole('user');
        $token = $user->createToken('Laravel Password Grant Client')->accessToken;
        try {
            event(new Registered($user));
        } finally  {
            $user['roles'] = $user->roles;
            $user['permissions'] = $user->permissions;
            return response(['token' => $token, 'user' => $user], 200);
        }
    }

    /**
     * @Endpoint(name="Login")
     * @BodyParam(name="email", type="string", status="required", description="user email", example="example@test.com")
     * @BodyParam(name="password", type="string", status="required", description="user password")
     * @ResponseExample(status=200, file="responses/auth/login.json")
     * @ResponseExample(status=422, file="responses/auth/loginerrors.json")
     */
    public function login(Request $request)
    {
        // dd($request->all());
        $validator = Validator::make($request->all(), [
            'email' => 'required|string|email',
            'password' => 'required|string',
        ]);
        if ($validator->fails()) {
            return response(['errors' => $validator->errors()->all()], 422);
        }
        $user = User::where('email', $request->email)->first();
        if ($user) {
            if (Hash::check($request->password, $user->password)) {
                $token = $user->createToken('Laravel Password Grant Client')->accessToken;
                $user['roles'] = $user->roles;
                $user['permissions'] = $user->permissions;
                $response = ['user' => $user, 'token' => $token];
                return response($response, 200);
            } else {
                $error = new ApiError("User.CONNEXION_FAILLED", 422);
                return response()->json($error, 422);
            }
        } else {
            $error = new ApiError("User.CONNEXION_FAILLED", 404);
            return response()->json($error, 422);
        }
    }
    /**
     * @Endpoint(name="Logout")
     */
    public function logout(Request $request)
    {
        $token = $request->user()->token();
        $token->revoke();
        $error = new ApiError("User.LOGOUT_SUCCESS", 200);
        return response()->json($error);
    }

    public function Profile()
    {
        $user = User::findOrFail(Auth::user()->id);
        return response()->json($user, 200);
    }

    public function updateProfile(Request $request)
    {
        $user = User::findOrFail(Auth::user()->id);
        $user->update($request->all());
        return response()->json($user, 200);
    }

}
