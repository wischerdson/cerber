<?php

namespace App\Exceptions;

use Exception;
use Illuminate\Http\JsonResponse;

/**
 * Throws in case where \App\Models\User not found
 */
class UserNotFoundException extends Exception
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
			'reason' => 'user_not_found'
		], 404);
	}
}
