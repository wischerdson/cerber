<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Services\Auth;
use Illuminate\Http\Request;

class AuthController extends Controller
{
	public function register(Auth $auth, Request $request): string
	{
		$request->validate([
			'email' => 'required | email | unique:' . \App\Models\EntryPoint::class . ',login',
			'login' => 'required | unique:' . \App\Models\EntryPoint::class . ',login',
			'password' => 'required | min:6 | max:40'
		]);

		return $auth->register();
	}

	public function token(Auth $auth, Request $request): string
	{
		$request->validate([
			'login' => 'required',
			'password' => 'required'
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
