<?php

namespace App\Exceptions;

/**
 * Throws in case where "password" field doesn't match with one in \App\Models\EntryPoint
 */
class InvalidPasswordException extends BadRequestException
{
	public string $errorReason = 'invalid_password';
}
