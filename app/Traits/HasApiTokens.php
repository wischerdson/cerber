<?php

namespace App\Traits;

use App\Models\EntryPoint;
use Laravel\Sanctum\HasApiTokens as SanctumHasApiTokens;
use Laravel\Sanctum\NewAccessToken;
use Illuminate\Support\Str;

trait HasApiTokens
{
	use SanctumHasApiTokens;

	public function createToken(EntryPoint $entryPoint, array $abilities = ['*'])
	{
		$token = $this->tokens()->make([
			'token' => hash('sha256', $plainTextToken = Str::random(40)),
			'abilities' => $abilities,
		]);

		$entryPoint->tokens()->save($token);

		return new NewAccessToken($token, $token->getKey().'|'.$plainTextToken);
	}
}
