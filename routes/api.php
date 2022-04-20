<?php

use App\Http\Controllers\Auth\AuthController;
use App\Http\Controllers\Auth\EmailVerificationController;
use App\Http\Controllers\ContributionsController;
use App\Models\User;
use Illuminate\Foundation\Auth\EmailVerificationRequest;
// use App\Http\Controllers\Auth\ResetPasswordAPIController;
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


Route::middleware('auth:api')->get('/user', function (Request $request) {
    $u  = User::find($request->user()->id);
    $u["permissions"] = $u->permissions;
    $u["roles"] = $u->roles;
    return $u;
});
Route::middleware('auth:api')->post('/user', function (Request $request) {
    $u  = User::find($request->user()->id);
    $u["permissions"] = $u->permissions;
    $u["roles"] = $u->roles;
    return $u;
});
// Route::post('password/reset', [ResetPasswordAPIController::class, 'reset']);
// Route::post('password/email', [ForgotPasswordAPIController::class, 'sendResetLinkEmail'])->name('password.email');

// 'middleware' => ['cors']
Route::post('/login', [AuthController::class, 'login'])->name('login.api');
Route::post('/register', [AuthController::class, 'register'])->name('register.api');
Route::get('/contributions', [ContributionsController::class, 'index'])->name('contributions.get');
Route::get('/contributions/{id}', [ContributionsController::class, 'show'])->name('contributions.get');

Route::middleware('auth:api')->group(function () {
    Route::post('/contributions', [ContributionsController::class, 'store'])->name('contributions.post');
    Route::post('/logout', [AuthController::class, 'logout'])->name('logout.api');
    Route::put('/contributions/{id}', [ContributionsController::class, 'update'])->name('contributions.put');
    Route::delete('/contributions/{id}', [ContributionsController::class, 'destroy'])->name('contributions.delete');
    Route::post(
    '/contributions/{id}/add-special-member', [ContributionsController::class, 'addSpecialMember'])->name('contributions.addSpecialMember');
    Route::post('/contributions/{id}/remove-special-member', [ContributionsController::class, 'removeSpecialMember'])->name('contributions.removeSpecialMember');
});


/*
|   EMAILS VERIFICATION
|*/

Route::get('/email/verify/{id}/{hash}', function (EmailVerificationRequest $request) {
    $request->fulfill();

    return redirect('/');
})->middleware(['auth', 'signed'])->name('verification.verify');

Route::post('/email/verification-notification', function (Request $request) {
    $request->user()->sendEmailVerificationNotification();

    return back()->with('message', 'Verification link sent!');
})->middleware(['auth', 'throttle:6,1'])->name('verification.send');
