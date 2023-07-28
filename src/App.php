<?php

namespace QrMan;

use QrMan\Api\Processor as ApiProcessor;
use QrMan\App\Mode;
use QrMan\Cli\Processor as CliProcessor;
use QrMan\Util\File;
use QrMan\Util\I18n;

class App
{

    const APP_TYPE_WEB = 0;
    const APP_TYPE_CLI = 1;

    public function __construct(
        private readonly Mode $mode,
        private readonly ApiProcessor $apiProcessor,
        private readonly CliProcessor $cliProcessor,
        private readonly File $fileUtil,
        private readonly string $rootDirectory,
        private readonly array $server
    )
    {
    }

    /**
     * @param int $appType
     * @return void
     * @throws Exception\ApplicationException
     */
    public function run(int $appType = self::APP_TYPE_WEB): void
    {
        $this->fileUtil->initialize($this->rootDirectory);
        $this->loadEnvironmentVariables($this->rootDirectory);
        if ($appType === self::APP_TYPE_WEB) {
            $this->loadI18n($this->rootDirectory);
        }
        $this->loadGlobalFunctions();
        if ($this->mode->isDevMode()) {
            error_reporting(E_ALL);
            ini_set('display_errors', 1);
        }
        if ($appType === self::APP_TYPE_CLI) {
            $this->cliProcessor->process();
        } else {
            $requestUri = $this->getRequestUri();
            $method = $_SERVER['REQUEST_METHOD'] ?? null;
            $this->apiProcessor->process($requestUri, $method);
        }
    }

    protected function getRequestUri(): string
    {
        $apiPrefix = $_ENV['API_PREFIX'] ?? '';
        $requestUri = strtok($this->server['REQUEST_URI'], '?');
        $requestUri = rtrim($requestUri, '/');
        if (str_starts_with($requestUri, $apiPrefix)) {
            $requestUri = substr($requestUri, strlen($apiPrefix));
        }
        return $requestUri;
    }

    protected function loadEnvironmentVariables(string $directory): void
    {
        $dotenv = \Dotenv\Dotenv::createImmutable($directory);
        $dotenv->load();
    }

    protected function loadI18n(string $rootDirectory): void
    {
        $locale = getallheaders()['Locale'] ?? 'en_US';
        $csvPath = $rootDirectory . "/i18n/$locale.csv";
        I18n::setLocale($locale);
        if (file_exists($csvPath)) {
            I18n::setCsvPath($csvPath);
        }
    }

    protected function loadGlobalFunctions(): void
    {
        require_once __DIR__ . '/global_functions.php';
    }
}