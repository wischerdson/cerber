<?php

namespace App\Exceptions;

/**
 * Throws in case where attempt to confirm password reset code failed
 */
class InvalidPasswordResetCodeException extends BadRequestException
{
	public string $errorReason = 'invalid_password_reset_code';
}
