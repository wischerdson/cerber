<?php

namespace App\Exceptions;

class TooOfterResetPasswordException extends BadRequestException
{
	public string $errorReason = 'too_ofter_reset_password';

	public int $statusCode = 429;
}
