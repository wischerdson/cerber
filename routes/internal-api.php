<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\PasswordResetController;
use Illuminate\Support\Facades\Route;

Route::prefix('auth')->group(function () {
	Route::post('sign-up', [AuthController::class, 'signUp']);
	Route::post('token', [AuthController::class, 'token']);
});

Route::prefix('password-reset')->group(function () {
	Route::post('via-email', [PasswordResetController::class, 'resetPassword']);
	Route::get('details', [PasswordResetController::class, 'details']);
	Route::get('confirm', [PasswordResetController::class, 'confirm']);
	Route::put('change-password', [PasswordResetController::class, 'changePassword']);
});

Route::middleware('auth:sanctum')->group(function () {
	Route::prefix('auth')->group(function () {
		Route::get('user', [AuthController::class, 'user']);
		Route::delete('logout', [AuthController::class, 'logout']);
	});
});
