<?php

namespace App\Models;

use App\Events\LoggedIn;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Laravel\Sanctum\PersonalAccessToken as SanctumPersonalAccessToken;

/**
 * @property int $id
 * @property int $token
 * @property string $abilities
 * @property string $last_used_at
 * @property string $created_at
 */
class PersonalAccessToken extends SanctumPersonalAccessToken
{
	const UPDATED_AT = null;

	protected $table = 'personal_access_tokens';

	protected $dispatchesEvents = [
		'created' => LoggedIn::class
	];

	public function authDetails(): HasOne
	{
		return $this->hasOne(AuthDetails::class);
	}
}
