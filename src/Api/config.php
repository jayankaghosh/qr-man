<?php

return [
    [
        'uri' => '/user/create',
        'method' => 'POST',
        'processor' => \QrMan\Api\Processor\User\Create::class
    ],
    [
        'uri' => '/user/login',
        'method' => 'POST',
        'processor' => \QrMan\Api\Processor\User\Login::class
    ],
    [
        'uri' => '/user',
        'method' => 'GET',
        'processor' => \QrMan\Api\Processor\User\Details::class
    ],
    [
        'uri' => '/user/edit',
        'method' => 'POST',
        'processor' => \QrMan\Api\Processor\User\Edit::class
    ],
    [
        'uri' => '/bucket/list',
        'method' => 'GET',
        'processor' => \QrMan\Api\Processor\Bucket\Listing::class
    ],
    [
        'uri' => '/bucket/add',
        'method' => 'POST',
        'processor' => \QrMan\Api\Processor\Bucket\Add::class
    ],
    [
        'uri' => '/bucket/delete',
        'method' => 'POST',
        'processor' => \QrMan\Api\Processor\Bucket\Delete::class
    ],
    [
        'uri' => '/bucket/edit',
        'method' => 'POST',
        'processor' => \QrMan\Api\Processor\Bucket\Edit::class
    ],
    [
        'uri' => '/bucket/generateQR',
        'method' => 'GET',
        'processor' => \QrMan\Api\Processor\Bucket\GenerateQR::class
    ],
    [
        'uri' => '/bucket/getByCode',
        'method' => 'GET',
        'processor' => \QrMan\Api\Processor\Bucket\GetByCode::class
    ],
    [
        'uri' => '/bucket/printAllQr',
        'method' => 'GET',
        'processor' => \QrMan\Api\Processor\Bucket\PrintAllQr::class
    ],
    [
        'uri' => '/bucket/item/list',
        'method' => 'GET',
        'processor' => \QrMan\Api\Processor\BucketItem\Listing::class
    ],
    [
        'uri' => '/bucket/item/add',
        'method' => 'POST',
        'processor' => \QrMan\Api\Processor\BucketItem\Add::class
    ],
    [
        'uri' => '/bucket/item/delete',
        'method' => 'POST',
        'processor' => \QrMan\Api\Processor\BucketItem\Delete::class
    ],
    [
        'uri' => '/bucket/item/edit',
        'method' => 'POST',
        'processor' => \QrMan\Api\Processor\BucketItem\Edit::class
    ],
];