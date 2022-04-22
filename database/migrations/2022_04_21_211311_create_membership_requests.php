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
        Schema::create('membership_requests', function (Blueprint $table) {
            $table->id();
            $table->text('message')->nullable()->default("");
            $table->unsignedBigInteger('user_id');
            $table->boolean('is_accepted')->default(false);
            $table->unsignedBigInteger('contribution_id');
            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
            $table->foreign('contribution_id')->references('id')->on('contributions')->onDelete('cascade');
            $table->timestamps();

            $table->unique(['user_id', 'contribution_id']);
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('membership_requests');
    }
};
