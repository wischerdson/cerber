<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 * @property int $id
 * @property int $personal_access_token_id
 * @property bool $hidden
 * @property string $user_agent
 * @property string $ip
 * @property string $ip_country_code
 * @property string $ip_region
 * @property string $ip_city
 */
class AuthDetails extends Model
{
	use HasFactory;

	public $timestamps = false;

	protected $table = 'auth_details';

	protected $fillable = ['user_agent'];
}
