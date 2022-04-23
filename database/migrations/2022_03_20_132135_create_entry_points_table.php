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
		Schema::create('entry_points', function (Blueprint $table) {
			$table->id();
			$table->foreignId('user_id')->constrained()->onUpdate('cascade')->onDelete('cascade');
			$table->string('provider');
			$table->string('login')->unique();
			$table->text('password')->nullable();
			$table->string('password_hash')->nullable();
			$table->boolean('confirmed')->default(false);
			$table->timestamp('password_changed_at')->nullable();
		});
	}

	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::dropIfExists('entry_points');
	}
};
