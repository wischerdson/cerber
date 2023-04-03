<?php

namespace App\Exceptions;

use Exception;
use Illuminate\Http\JsonResponse;

abstract class BadRequestException extends Exception
{
	public string $errorReason;

	public ?string $errorMessage = null;

	public ?array $errorDetails = null;

	public int $statusCode = 422;

	public function report(): void
	{

	}

	/**
	 * Render the exception as an HTTP response.
	 */
	public function render(): JsonResponse
	{
		$responseData = ['error_reason' => $this->errorReason];

		if ($this->errorMessage !== null) {
			$responseData['message'] = $this->errorMessage;
		}

		if ($this->errorDetails !== null) {
			$responseData['details'] = $this->errorDetails;
		}

		return response()->json($responseData, 422);
	}
}
