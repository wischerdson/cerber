<?php

namespace App\Services;

use App\Models\EntryPoint;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class Auth
{
	private Request $request;

	public function __construct(Request $request)
	{
		$this->request = $request;
	}

	public function signUp(): string
	{
		$user = User::create($this->request->all());

		$entryPoint = new EntryPoint();
		$entryPoint->provider = 'email';
		$entryPoint->login = $this->request->email;
		$entryPoint->password = $this->request->password;
		$user->entryPoints()->save($entryPoint);

		return $user->createToken($entryPoint)->plainTextToken;
	}

	/**
	 * @throws \App\Exceptions\UserNotFoundException
	 * @throws \App\Exceptions\InvalidPasswordException
	 */
	public function attempt(): string
	{
		$entryPoint = EntryPoint::where('login', $this->request->login)->first();

		if (!$entryPoint) {
			throw new \App\Exceptions\UserNotFoundException();
		}

		if (!Hash::check($this->request->password, $entryPoint->password_hash)) {
			throw new \App\Exceptions\InvalidPasswordException();
		}

		$entryPoint->load('user');

		return $entryPoint->user->createToken($entryPoint)->plainTextToken;
	}
}
