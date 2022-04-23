<?php

namespace App\Exceptions;

use Illuminate\Foundation\Exceptions\Handler as ExceptionHandler;
use Illuminate\Validation\ValidationException;
use Illuminate\Support\Str;
use Throwable;

class Handler extends ExceptionHandler
{
	/**
	 * A list of the exception types that are not reported.
	 *
	 * @var array<int, class-string<Throwable>>
	 */
	protected $dontReport = [
		//
	];

	/**
	 * A list of the inputs that are never flashed for validation exceptions.
	 *
	 * @var array<int, string>
	 */
	protected $dontFlash = [
		'current_password',
		'password',
		'password_confirmation',
	];

	/**
	 * Register the exception handling callbacks for the application.
	 *
	 * @return void
	 */
	public function register()
	{
		$this->reportable(function (Throwable $e) {
			//
		});
	}

	protected function invalidJson($request, ValidationException $exception)
    {
		$errors = [];

		foreach ($exception->validator->failed() as $field => $rule) {
			$errors[$field] = array_map(function (string $rule) {
				return Str::lower($rule);
			}, array_keys($rule));
		}

        return response()->json([
			'message' => $exception->getMessage(),
            'reason' => 'validation_failed',
			'details' => $errors
        ], $exception->status);
    }
}
