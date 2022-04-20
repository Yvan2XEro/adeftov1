<?php

namespace App\Http\Controllers;

use App\Models\Contribution;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class ContributionsController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $contributions = Contribution::latest()->paginate(10);
        foreach ($contributions as $contribution) {
            $contribution->user;
            $contribution->members;
            $contribution->specialsMembers;
        }
        return $contributions;
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
        $validator = Validator::make($request->all(), [
            'name' => 'required|unique:contributions',
        ]);
        if($validator->fails()){
            return response()->json($validator->errors(), 400);
        }
        $contribution = $user->contributions()->create($request->all());
        return response()->json($contribution, 201);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $contribution = Contribution::find($id);
        if(is_null($contribution)){
            return response()->json(['message' => 'Record not found'], 404);
        }
        $contribution['user'] = $contribution->user()->first();
        $contribution->members;
        $contribution->specialsMembers;
        return $contribution;
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
        $validator = Validator::make($request->all(), [
            'name' => 'required|unique:contributions',
        ]);
        if($validator->fails()){
            return response()->json($validator->errors(), 400);
        }
        $contribution = Contribution::find($id);
        if(is_null($contribution)){
            return response()->json(['message' => 'Record not found'], 404);
        }
        if($contribution->user_id != $request->user()->id && !$request->user()->hasRole('admin')){
            return response()->json(['message' => 'Unauthorized'], 401);
        }
        $contribution->update($request->all());
        return response()->json($contribution, 200);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(Request $request, $id)
    {
        $contribution = Contribution::find($id);
        if(is_null($contribution)){
            return response()->json(['message' => 'Record not found'], 404);
        }
        if ($contribution->user_id != $request->user()->id && !$request->user()->hasRole('admin')) {
            return response()->json(['message' => 'Unauthorized'], 401);
        }
        $contribution->delete();
        return response()->json(null, 204);
    }

    public function addSpecialMember(Request $request, $id) {
        $contribution = Contribution::find($id);
        if(is_null($contribution)){
            return response()->json(['message' => 'Record not found'], 404);
        }
        if ($contribution->user_id != $request->user()->id && !$request->user()->hasRole('admin')) {
            return response()->json(['message' => 'Unauthorized'], 401);
        }
        $contribution->specialsMembers()->attach($request->input('member_id'));
        return response()->json($contribution, 200);
    }


    public function removeSpecialMember(Request $request, $id)
    {
        $contribution = Contribution::find($id);
        if(is_null($contribution)){
            return response()->json(['message' => 'Record not found'], 404);
        }
        if ($contribution->user_id != $request->user()->id && !$request->user()->hasRole('admin')) {
            return response()->json(['message' => 'Unauthorized'], 401);
        }
        $contribution->specialsMembers()->detach($request->input('member_id'));
        return response()->json($contribution, 200);
    }
}
