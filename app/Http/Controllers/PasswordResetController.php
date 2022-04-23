<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\PasswordReset;
use App\Services\PasswordReset as PasswordResetService;
use Illuminate\Http\Request;

class PasswordResetController extends Controller
{
	private PasswordResetService $service;

	public function __construct(PasswordResetService $service)
	{
		$this->service = $service;
	}

	public function resetPassword(Request $request): string
	{
		$request->validate([ 'email' => 'required | email' ]);

		return $this->service->initiateByEmail($request->email);
	}

	public function details(Request $request): PasswordReset
	{
		$request->validate([ 'id' => 'required | uuid' ]);

		return $this->service->getModelByUUID($request->id);
	}

	public function confirm(Request $request)
	{
		$request->validate([
			'id' => 'required | uuid',
			'code' => 'required | digits:'.PasswordResetService::CODE_LENGTH
		]);

		$token = $this->service->attemptToConfirm($request->id, $request->code);

		return ['token' => $token];
	}

	public function changePassword(Request $request)
	{
		$request->validate([
			'id' => 'required | uuid',
			'token' => 'required',
			'password' => 'required | min:6 | max:60'
		]);

		return $this->service->changePassword($request->id, $request->token, $request->password);
	}
}
