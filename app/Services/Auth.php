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

	public function register(): string
	{
		/** @var \App\Models\User */
		$user = User::create($this->request->all());

		$emailEntryPoint = $user->entryPoints()->create([
			'provider' => EntryPoint::PROVIDER_EMAIL_PASSWORD,
			'login' => $this->request->email,
			'password' => $this->request->password
		]);

		$loginEntryPoint = $emailEntryPoint->replicate()->fill([
			'provider' => EntryPoint::PROVIDER_LOGIN_PASSWORD,
			'login' => $this->request->login,
			'confirmed' => true
		]);

		$user->entryPoints()->save($loginEntryPoint);

		return $user->createToken($loginEntryPoint)->plainTextToken;
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
