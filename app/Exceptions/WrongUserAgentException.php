<?php

namespace App\Exceptions;

/**
 * Throws in case when user agent header is missing or mismatch with logged user
 */
class WrongUserAgentException extends BadRequestException
{
	public string $errorReason = 'wrong_useragent';
}
