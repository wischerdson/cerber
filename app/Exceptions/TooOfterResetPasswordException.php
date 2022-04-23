<?php

namespace App\Exceptions;

use Exception;
use Illuminate\Http\JsonResponse;

class TooOfterResetPasswordException extends Exception
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
			'reason' => 'too_ofter_reset_password'
		], 429);
	}
}
