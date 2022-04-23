<?php

namespace App\Events;

use App\Models\PersonalAccessToken;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class LoggedIn
{
	use Dispatchable, SerializesModels;

	public PersonalAccessToken $token;

	/**
	 * Create a new event instance.
	 *
	 * @return void
	 */
	public function __construct(PersonalAccessToken $token)
	{
		$this->token = $token;
	}
}
