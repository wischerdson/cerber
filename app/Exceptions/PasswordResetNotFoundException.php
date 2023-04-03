<?php

namespace App\Exceptions;

/**
 * Throws in case where \App\Models\PasswordReset not found
 */
class PasswordResetNotFoundException extends BadRequestException
{
	public string $errorReason = 'password_reset_not_found';

	public int $statusCode = 404;
}
