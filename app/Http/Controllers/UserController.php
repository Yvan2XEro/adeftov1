<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\{Hash, Validator};

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $user = $request->user();
        if($user->hasRole('superadministrator') || $user->hasRole('administrator')){
            $users = User::all();
            foreach ($users as $user) {
                $user->roles;
                $user->permissions;
                $user->payments;
                foreach ($user->payments as $payment) {
                    $payment->session;
                    $payment->session->contribution;
                }
            }
            return response()->json($users,);
        }else{
            return response()->json(['error' => 'Unauthorized'], 401);
        }
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $user = $request->user();
        if($user->hasRole('superadministrator') || $user->hasRole('administrator')) {
            $validator = Validator::make($request->all(), [
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
            $user = User::create($request->all());
            return response()->json($user);
        }else{
            return response()->json(['error' => 'Unauthorized'], 401);
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $user = User::find($id);
        $user->roles;
        $user->permissions;
        $user->payments;
        foreach ($user->payments as $payment) {
            $payment->session;
            $payment->session->contribution;
        }
        return response()->json($user);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $user = $request->user();
        if($user->hasRole('superadministrator') || $user->hasRole('administrator')){
            $user = User::find($id);
            $user->update($request->all());
            $user->roles;
            $user->permissions;
            $user->payments;
            foreach ($user->payments as $payment) {
                $payment->session;
                $payment->session->contribution;
            }
            return response()->json($user);
        }else{
            return response()->json(['error' => 'Unauthorized'], 401);
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(Request $request, $id)
    {
        $user = $request->user();
        $u = User::find($id);
        if($user->hasRole('superadministrator') || $user->hasRole('administrator')){
            $u->delete();
            return response()->json(['message' => 'User deleted successfully']);

        }else{
            return response()->json(['error' => 'Unauthorized'], 401);
        }
    }
}
