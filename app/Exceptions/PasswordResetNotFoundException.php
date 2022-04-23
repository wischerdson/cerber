<?php

namespace App\Exceptions;

use Exception;
use Illuminate\Http\JsonResponse;

/**
 * Throws in case where \App\Models\PasswordReset not found
 */
class PasswordResetNotFoundException extends Exception
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
			'reason' => 'password_reset_not_found'
		], 404);
	}
}
