<?php

namespace App\Http\Middleware;

use App\Exceptions\WrongUserAgentException;
use Closure;
use Illuminate\Http\Request;

class ValidateUserAgent
{
	/**
	 * Handle an incoming request.
	 *
	 * @param  \Illuminate\Http\Request  $request
	 * @param  \Closure(\Illuminate\Http\Request): (\Illuminate\Http\Response|\Illuminate\Http\RedirectResponse)  $next
	 * @return \Illuminate\Http\Response|\Illuminate\Http\RedirectResponse
	 */
	public function handle(Request $request, Closure $next)
	{
		$userAgent = $request->header('user-agent');

		if ($userAgent) {
			return $next($request);
		}

		throw new WrongUserAgentException();
	}
}
