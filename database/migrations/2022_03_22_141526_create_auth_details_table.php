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
		Schema::create('auth_details', function (Blueprint $table) {
			$table->id();
			$table->foreignId('personal_access_token_id')->constrained()->onUpdate('cascade')->onDelete('cascade');
			$table->boolean('hidden')->default(false);
			$table->text('user_agent')->nullable();
			$table->ipAddress('ip')->nullable();
			$table->string('ip_country_code', 2)->nullable();
			$table->string('ip_region')->nullable();
			$table->string('ip_city')->nullable();
		});
	}

	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::dropIfExists('auth_details');
	}
};
