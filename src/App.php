<?php

namespace QrMan;

use QrMan\Api\Processor;
use QrMan\App\Mode;

class App
{

    public function __construct(
        private readonly Mode $mode,
        private readonly Processor $processor,
        private readonly string $rootDirectory,
        private readonly array $server
    )
    {
    }

    public function run(): void
    {
        $this->loadEnvironmentVariables($this->rootDirectory);
        if ($this->mode->isDevMode()) {
            error_reporting(E_ALL);
            ini_set('display_errors', 1);
        }
        $requestUri = strtok($this->server['REQUEST_URI'], '?');
        $requestUri = rtrim($requestUri, '/');
        $method = $_SERVER['REQUEST_METHOD'] ?? null;
        $this->processor->process($requestUri, $method);
    }

    protected function loadEnvironmentVariables(string $directory): void
    {
        $dotenv = \Dotenv\Dotenv::createImmutable($directory);
        $dotenv->load();
    }
}