<?php

use App\Http\Controllers\Auth\AuthController;
use App\Http\Controllers\Auth\ResetPasswordAPIController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
Route::post('password/reset', [ResetPasswordAPIController::class, 'reset']);
Route::post('password/email', [ForgotPasswordAPIController::class, 'sendResetLinkEmail'])->name('password.email');

// 'middleware' => ['cors']
Route::group([], function () {
    Route::post('/login', [AuthController::class, 'login'])->name('login.api');
    Route::post('/register', [AuthController::class, 'register'])->name('register.api');
    Route::middleware('auth:api')->group(function () {
            Route::post('/logout', [AuthController::class, 'logout'])->name('logout.api');
    });
});
