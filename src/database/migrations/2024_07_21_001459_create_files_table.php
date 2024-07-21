<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('files', function (Blueprint $table) {
            $table->id();
            $table->string("name");
            $table->integer('size');
            $table->string("path");
            $table->timestamp('created')->default(now());
            $table->foreignId('user_id')->nullable()->constrained();
            $table->foreignId('folder_id')->nullable()->constrained();
            $table->foreignId('item_action_id')->constrained();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('files');
    }
};
