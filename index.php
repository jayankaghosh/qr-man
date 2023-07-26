<?php

require_once __DIR__ . '/vendor/autoload.php';

$objectManagerFactory = new \Om\OmFactory(
    null,
    __DIR__ . '/generated'
);
$objectManager = $objectManagerFactory->getInstance();

/** @var \QrMan\App $app */
$app = $objectManager->create(\QrMan\App::class, [
    'rootDirectory' => __DIR__,
    'server' => $_SERVER
]);

if (php_sapi_name() == "cli") {
    $appType = \QrMan\App::APP_TYPE_CLI;
} else {
    $appType = \QrMan\App::APP_TYPE_WEB;
}

$app->run($appType);