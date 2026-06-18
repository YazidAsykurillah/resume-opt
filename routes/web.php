<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

use App\Http\Controllers\ResumeController;
use App\Http\Controllers\JobController;
use App\Http\Controllers\AnalysisController;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
    ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    Route::resource('resumes', ResumeController::class)->only(['index', 'show', 'store', 'destroy']);
    Route::resource('jobs', JobController::class)->only(['store', 'destroy']);
    Route::resource('analyses', AnalysisController::class)->only(['index', 'create', 'store']);
});

require __DIR__.'/auth.php';
