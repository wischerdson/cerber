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
		Schema::create('password_resets', function (Blueprint $table) {
			$table->uuid('id')->primary();
			$table->foreignId('entry_point_id')->constrained()->onUpdate('cascade')->onDelete('cascade');
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
	}
};
