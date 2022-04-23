<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Services\Auth;
use Illuminate\Http\Request;

class AuthController extends Controller
{
	public function signUp(Auth $auth, Request $request): string
	{
		$request->validate([
			'phone' => 'required | unique:'.\App\Models\User::class,
			'email' => 'required | email | unique:'.\App\Models\EntryPoint::class.',login',
			'password' => 'required | min:6 | max:60',
			'user_agent' => 'required'
		]);

		return $auth->signUp();
	}

	public function token(Auth $auth, Request $request): string
	{
		$request->validate([
			'login' => 'required',
			'password' => 'required',
			'user_agent' => 'required'
		]);

		return $auth->attempt();
	}

	public function user(Request $request): User
	{
		return $request->user();
	}

	public function logout(Request $request): void
	{
		$request->user()->currentAccessToken()->delete();
	}
}
