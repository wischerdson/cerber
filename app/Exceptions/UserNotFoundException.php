<?php

namespace App\Exceptions;

/**
 * Throws in case where \App\Models\User not found
 */
class UserNotFoundException extends BadRequestException
{
	public string $errorReason = 'user_not_found';

	public int $statusCode = 404;
}
