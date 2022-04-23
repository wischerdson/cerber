<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Support\Facades\Crypt;
use Illuminate\Support\Facades\Hash;

/**
 * @property int $id
 * @property int $user_id
 * @property string $provider
 * @property string $login
 * @property string $password
 * @property string $password_hash
 * @property bool $confirmed
 */
class EntryPoint extends Model
{
	use HasFactory;

	public $timestamps = false;

	protected $table = 'entry_points';

	protected $fillable = [];

	public function user(): BelongsTo
	{
		return $this->belongsTo(User::class);
	}

	public function tokens(): HasMany
	{
		return $this->hasMany(PersonalAccessToken::class);
	}

	public function passwordResets(): HasMany
	{
		return $this->hasMany(PasswordReset::class);
	}

	protected function password(): Attribute
	{
		return Attribute::make(
			get: fn ($value) => Crypt::decryptString($value),
			set: fn ($value) => Crypt::encryptString($value),
		);
	}

	protected static function booted()
	{
		$hashPassword = function (self $model) {
			$model->password_hash = Hash::make($model->password);
		};

		static::creating($hashPassword);

		static::updating(function ($model) use ($hashPassword) {
			if ($model->isDirty('password')) {
				$model->password_changed_at = now();
				$hashPassword($model);
			}
		});
	}
}
