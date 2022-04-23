<?php

namespace App\Listeners;

use App\Events\LoggedIn;
use App\Models\AuthDetails;

class CreateAuthDetails
{
	/**
	 * Handle the event.
	 */
	public function handle(LoggedIn $event): void
	{
		$request = request();

		$authDetails = new AuthDetails();
		$authDetails->user_agent = $request->user_agent;
		$authDetails->ip = $request->ip();
		$event->token->authDetails()->save($authDetails);
	}
}
