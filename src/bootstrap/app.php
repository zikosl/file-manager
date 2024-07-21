<?php

use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;

use App\Http\Middleware\HandleInertiaRequests;
use App\Providers\AppServiceProvider;
use Illuminate\Http\Request;

return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        web: __DIR__.'/../routes/web.php',
        // api: __DIR__.'/../routes/api.php',
        commands: __DIR__.'/../routes/console.php',
        health: '/up',
    )
    ->withMiddleware(function (Middleware $middleware) {
        $middleware->redirectGuestsTo(fn () => route('login'));
        $middleware->redirectUsersTo(function (Request $request)  {
            $user = Auth::user();
            if($user->admin){
                return AppServiceProvider::ADMIN_HOME;
            }
            return AppServiceProvider::CLIENT_HOME;
        });
        // $middleware->redirectUsersTo(AppServiceProvider::ADMIN_HOME);
        // $middleware->redirectUsersTo(AppServiceProvider::CLIENT_HOME);
        $middleware->web(HandleInertiaRequests::class);
        $middleware->throttleApi();
        $middleware->replace(\Illuminate\Http\Middleware\TrustProxies::class, \App\Http\Middleware\TrustProxies::class);
    })
    ->withExceptions(function (Exceptions $exceptions) {
        //
    })->create();
