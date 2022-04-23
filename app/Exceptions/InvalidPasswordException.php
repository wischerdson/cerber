<?php

namespace App\Exceptions;

use Exception;
use Illuminate\Http\JsonResponse;

/**
 * Throws in case where "password" field doesn't match with one in \App\Models\EntryPoint
 */
class InvalidPasswordException extends Exception
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
			'reason' => 'invalid_password'
		], 422);
	}
}
