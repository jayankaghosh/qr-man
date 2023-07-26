<?php

error_reporting(E_ALL);
ini_set('display_errors', 1);

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
$app->run();