<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Support\Str;

/**
 * @property int $id
 * @property int $entry_point_id
 * @property string $code
 * @property string $token
 * @property int $attemps
 * @property bool $used
 * @property string $created_at
 * @property string $expire_at
 */
class PasswordReset extends Model
{
	use HasFactory;

	const UPDATED_AT = null;

	public $incrementing = false;

	protected $table = 'password_resets';

	protected $keyType = 'string';

	protected $casts = [
		'created_at' => 'timestamp',
		'expire_at' => 'timestamp'
	];

	protected $fillable = ['used'];

	protected $visible = ['id', 'attemps', 'created_at', 'expire_at'];

	public function entryPoint(): BelongsTo
	{
		return $this->belongsTo(EntryPoint::class);
	}

	protected static function booted()
	{
		static::creating(function (self $model) {
			$model->{$model->primaryKey} = (string) Str::uuid();
			$model->token = Str::random(20);
			$model->expire_at = now()->addHour();
		});
	}
}
