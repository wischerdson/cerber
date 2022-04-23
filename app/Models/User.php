<?php

namespace App\Models;

use App\Traits\HasApiTokens;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

/**
 * @property int $id
 * @property string $name
 * @property string $email
 * @property string $phone
 * @property string $timezone
 * @property int $timezone_offset
 * @property string $created_at
 */
class User extends Model
{
	use HasApiTokens, HasFactory;

	const UPDATED_AT = null;

	protected $table = 'users';

	protected $guarded = ['id', 'created_at'];

	public function entryPoints(): HasMany
	{
		return $this->hasMany(EntryPoint::class);
	}
}
