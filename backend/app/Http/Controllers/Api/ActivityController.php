<?php

namespace App\Http\Controllers\Api;

use App\Http\Requests\Activity\UpdateActivityRequest;
use App\Models\Activity;
use Illuminate\Http\Request;
use App\Services\ActivityService;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use App\Http\Requests\Activity\StoreActivityRequest;

class ActivityController extends Controller

{
    private $service;
    private $user;

    public function __construct(ActivityService $activity)
    {
        $this->service = $activity;
        $this->user = Auth()->user();
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return response()->json(Auth()->user()->activities->where('status', 0), 200);
    }


    /**
     * Store a newly created resource in storage.
     *
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\Response
     */
    public function store(StoreActivityRequest $request)
    {
        $validated = $request->validated();

        $activity = Auth()->user()->activities()->create($validated);

        return response()->json([
            "message" => "Activity created successfully!",
            "data" => $activity,
        ], 201);
    }

    /**
     * Display the specified resource.
     *
     * @param \App\Models\Activity $activity
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $activity = Auth()->user()->activities()->find($id);

        return response()->json([
            "data" => $activity,
        ], 200);
    }


    /**
     *  Update the specified resource in storage.
     * @param UpdateActivityRequest $request
     * @param $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function update(UpdateActivityRequest $request, $id)
    {
        $validated = $request->validated();

        $activity = Auth()->user()->activities()->findOrFail($id);

        $activity->update($validated);

        return response()->json([
            "message" => "Activity updates successfully!",
            "data" => $activity,
        ], 204);
    }

    /**
     * Remove the specified resource from  with soft delete.
     *
     * @param \App\Models\Activity $activity
     * @return \Illuminate\Http\Response
     */

    public function destroy($id)
    {
        $activity = Auth()->user()->activities()->findOrFail($id);

        return response()->json([
            "message" => "Activity deleted successfully!",
            "data" => $activity,
        ], 200);
    }

    /**
     * Update activity status
     * @param $id
     * @return \Illuminate\Http\JsonResponse
     */

    public function updateStatus($id)
    {
        $activity = Auth()->user()->activities()->findOrFail($id);

        $activity->update(['status' => !$activity->status]);

        return response()->json([
            "message" => "Activity status updated successfully!",
            "data" => $activity,
        ], 200);
    }
}
