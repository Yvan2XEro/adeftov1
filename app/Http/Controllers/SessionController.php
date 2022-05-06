<?php

namespace App\Http\Controllers;

use App\Models\Contribution;
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

    /**
     * Display a listing of the resource.
     * @param  int  $id
     * @return \Illuminate\Http\Response
     *
     * */

    public function nextSession(Request $request, $id)
    {
        $contribution = Contribution::find($id);
        if (!$contribution) {
            return response()->json(['message' => 'Contribution not found'], 404);
        }
        $session = Session::where('contribution_id', $id)->where('month', date('m'))->first();
        if (!$session) {
            $session = Session::create([
                'contribution_id' => $id,
                'month' => date('m')
            ]);
        }
        $session->contribution;
        return response()->json($session, 200);
    }
}
