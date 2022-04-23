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
		Schema::create('laravel_failed_jobs', function (Blueprint $table) {
			$table->id();
			$table->string('uuid')->unique();
			$table->text('connection');
			$table->text('queue');
			$table->longText('payload');
			$table->longText('exception');
			$table->timestamp('failed_at')->useCurrent();
		});

		Schema::create('laravel_jobs', function (Blueprint $table) {
			$table->bigIncrements('id');
			$table->string('queue')->index();
			$table->longText('payload');
			$table->unsignedTinyInteger('attempts');
			$table->unsignedInteger('reserved_at')->nullable();
			$table->unsignedInteger('available_at');
			$table->unsignedInteger('created_at');
		});

		Schema::create('laravel_sessions', function (Blueprint $table) {
			$table->string('id')->primary();
			$table->foreignId('user_id')->nullable()->index();
			$table->string('ip_address', 45)->nullable();
			$table->text('user_agent')->nullable();
			$table->text('payload');
			$table->integer('last_activity')->index();
		});

		Schema::create('laravel_cache', function (Blueprint $table) {
			$table->string('key')->primary();
			$table->mediumText('value');
			$table->integer('expiration');
		});
	}

	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::dropIfExists('laravel_failed_jobs');
		Schema::dropIfExists('laravel_jobs');
		Schema::dropIfExists('laravel_sessions');
		Schema::dropIfExists('laravel_cache');
	}
};
