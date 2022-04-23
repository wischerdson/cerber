<?php

namespace App\Exceptions;

use Exception;
use Illuminate\Http\JsonResponse;

/**
 * Throws in case where attempt to confirm password reset code failed
 */
class InvalidPasswordResetCodeException extends Exception
{
	public function report(): void
	{

	}

	/**
	 * Render the exception as an HTTP response.
	 */
	public function render(): JsonResponse
	{
		return response()->json([
			'message' => 'Error occured',
			'reason' => 'invalid_password_reset_code'
		], 422);
	}
}
