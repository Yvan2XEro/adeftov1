<?php

namespace App\Http\Controllers;

use App\Models\Session;
use Illuminate\Http\Request;

class SessionController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $sessions =Session::all();
        foreach ($sessions as $session) {
            $session->contribution;
        }
        return response()->json($sessions, 200);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $session = Session::create($request->all());
        $session->contribution;
        return response()->json($session, 201);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $session = Session::find($id);
        if (!$session) {
            return response()->json(['message' => 'Session not found'], 404);
        }
        $session->contribution;
        return response()->json($session, 200);
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
        $session = Session::find($id);
        if (!$session) {
            return response()->json(['message' => 'Session not found'], 404);
        }
        $session->update($request->all());
        $session->contribution;
        return response()->json($session, 200);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $session = Session::find($id);
        if (!$session) {
            return response()->json(['message' => 'Session not found'], 404);
        }
        $session->delete();
        return response()->json(null, 204);
    }

    //Find sessions of the contributionS having no Payment with the status 'paid' registered on the authenticated user
    public function myUnpaidSessions(Request $request, $id)
    {
        $sessions = Session::whereHas('contribution', function ($query) use ($id) {
            $query->where('contribution_id', $id);
        })->whereDoesntHave('payments', function ($query) {
            $query->where('user_id', auth()->user()->id)->where('status', 'paid');
        })->get();
        foreach ($sessions as $session) {
            $session->contribution;
        }
        return response()->json($sessions, 200);
    }
}
