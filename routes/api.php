<?php

use App\Http\Controllers\Auth\AuthController;
use App\Http\Controllers\Auth\EmailVerificationController;
use App\Http\Controllers\ContributionsController;
use App\Http\Controllers\PaymentController;
use App\Http\Controllers\SessionController;
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


// Route::post('password/reset', [ResetPasswordAPIController::class, 'reset']);
// Route::post('password/email', [ForgotPasswordAPIController::class, 'sendResetLinkEmail'])->name('password.email');

// 'middleware' => ['cors']
Route::post('/login', [AuthController::class, 'login'])->name('login.api');
Route::post('/register', [AuthController::class, 'register'])->name('register.api');

Route::middleware('auth:api')->group(function () {
    Route::get('/contributions/{id}', [ContributionsController::class, 'show'])->name('contributions.get');
    Route::get('/contributions', [ContributionsController::class, 'index'])->name('contributions.get');
    Route::post('/logout', [AuthController::class, 'logout'])->name('logout.api');

    Route::post('/contributions', [ContributionsController::class, 'store'])->name('contributions.post');
    Route::put('/contributions/{id}', [ContributionsController::class, 'update'])->name('contributions.put');
    Route::delete('/contributions/{id}', [ContributionsController::class, 'destroy'])->name('contributions.delete');
    Route::post(
        '/contributions/{id}/add-special-member',
        [ContributionsController::class, 'addSpecialMember']
    )->name('contributions.addSpecialMember');
    Route::post('/contributions/{id}/remove-special-member', [ContributionsController::class, 'removeSpecialMember'])->name('contributions.removeSpecialMember');


    Route::post('/contributions/{id}/membership-requests', [ContributionsController::class, 'addMembership'])->name('contributions.addMembership');
    Route::get(
        '/contributions/{id}/membership-requests',
        [ContributionsController::class, 'getMemberships']
    )->name('contributions.getMemberships');
    Route::get(
        '/membership-requests/{id}',
        [ContributionsController::class, 'showMemberShipRequest']
    )->name('contributions.showMemberShipRequest');

    Route::get(
        '/membership-requests/contributions/{contributionId}',
        [ContributionsController::class, 'getMembershipByUserAndContribution']
    )->name('contributions.getMembershipByUserAndContribution');

    Route::put('/membership-requests/{id}', [
        ContributionsController::class, 'updateMemberShipRequest'
    ])->name('contributions.updateMemberShipRequest');

    Route::delete('/membership-requests/{id}', [
    ContributionsController::class, 'deleteMemberShipRequest'])->name('contributions.deleteMemberShipRequest');

    Route::put('/membership-requests/{id}/accept', [ContributionsController::class, 'acceptMembership'])->name('contributions.acceptMembership');
    Route::put(
    '/contributions/{id}/accept-all-membership-requests', [ContributionsController::class, 'acceptAllMemberships'])->name('contributions.acceptAllMemberships');
    Route::put('/contributions/{id}/reject-all-membership-requests', [ContributionsController::class, 'rejectAllMemberships'])->name('contributions.rejectAllMemberships');


    Route::get('/contributions/{id}/my-unpaid-sessions', [SessionController::class, 'myUnpaidSessions'])->name('contributions.myUnpaidSessions');
    Route::post('/init-messonb-payments', [PaymentController::class, 'mesombPayment'])->name('contributions.mesombPayment');


    Route::put('/user', [AuthController::class, 'updateProfile'])->name('user.update');
    Route::put('/user/password', [AuthController::class, 'changePassword'])->name('user.password');
    Route::post('/user/set-avatar', [AuthController::class, 'setProfilePicture'])->name('user.setProfilePicture');
    Route::delete('/user/set-avatar', [AuthController::class, 'deleteProfilePicture'])->name('user.deleteProfilePicture');
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
