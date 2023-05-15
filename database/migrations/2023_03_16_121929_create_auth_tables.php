<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('users', function (Blueprint $table) {
			$table->id();
			$table->string('name')->nullable();
			$table->string('login')->unique();
			$table->string('email')->unique();
			$table->string('phone')->nullable();
			$table->string('timezone')->nullable();
			$table->integer('timezone_offset')->nullable();
			$table->timestamp('created_at')->useCurrent();
		});

		Schema::create('entry_points', function (Blueprint $table) {
			$table->id();
			$table->foreignId('user_id')->constrained()->cascadeOnDelete();
			$table->string('provider');
			$table->string('login')->unique();
			$table->text('password')->nullable();
			$table->string('password_hash')->nullable();
			$table->boolean('confirmed')->default(false);
			$table->timestamp('password_changed_at')->nullable();
		});

		Schema::create('personal_access_tokens', function (Blueprint $table) {
			$table->id();
			$table->morphs('tokenable');
			$table->foreignId('entry_point_id')->constrained()->cascadeOnDelete();
			$table->string('token', 64)->unique();
			$table->text('abilities')->nullable();
			$table->timestamp('last_used_at')->useCurrent();
			$table->timestamp('created_at')->useCurrent();
		});

		Schema::create('auth_details', function (Blueprint $table) {
			$table->id();
			$table->foreignId('personal_access_token_id')->constrained('personal_access_tokens')->cascadeOnDelete();
			$table->boolean('hidden')->default(false);
			$table->text('user_agent')->nullable();
			$table->ipAddress('ip')->nullable();
			$table->string('ip_country_code', 2)->nullable();
			$table->string('ip_region')->nullable();
			$table->string('ip_city')->nullable();
		});

		Schema::create('password_resets', function (Blueprint $table) {
			$table->uuid('id')->primary();
			$table->foreignId('entry_point_id')->constrained('entry_points')->cascadeOnDelete();
			$table->string('code', 6);
			$table->string('token', 20);
			$table->tinyInteger('attemps')->unsigned()->default(0);
			$table->boolean('used')->default(false);
			$table->timestamp('created_at');
			$table->timestamp('expire_at')->nullable();
		});
	}

	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::dropIfExists('password_resets');
		Schema::dropIfExists('auth_details');
		Schema::dropIfExists('personal_access_tokens');
		Schema::dropIfExists('entry_points');
		Schema::dropIfExists('users');
	}
};
