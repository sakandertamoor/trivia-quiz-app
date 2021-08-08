<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\QuestionController;
use App\Http\Controllers\UserManagmentController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::post("register", [AuthController::class, "register"]);
Route::post("login", [AuthController::class, "login"]);
Route::middleware("auth:sanctum")->group(function(){
    Route::get("user", [AuthController::class, 'user']);
    Route::get("users", [AuthController::class, 'users']);
    Route::post("logout", [AuthController::class, 'logout']);

    Route::put("user/{user}/update", [UserManagmentController::class, "updateUser"]);
    Route::post("user/delete/bulk", [UserManagmentController::class, "bulkDeleteUser"]);

    
    Route::get("quiz", [QuestionController::class, 'allQuestions']);
    Route::post("quiz", [QuestionController::class, 'addQuestion']);
    Route::put("quiz/{question}/update", [QuestionController::class, "updateQuestion"]);
    Route::post("quiz/delete/bulk", [QuestionController::class, "bulkDeleteQuiz"]);
});