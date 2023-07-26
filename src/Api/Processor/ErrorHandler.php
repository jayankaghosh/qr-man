<?php

namespace QrMan\Api\Processor;

use QrMan\Api\ApiInterface;
use QrMan\Api\Response;
use QrMan\App\Mode;
use QrMan\Exception\ClientAwareInterface;

class ErrorHandler implements ApiInterface
{

    public function __construct(
        private readonly Mode $mode
    )
    {
    }

    public function process(array $request, Response $response): Response
    {
        /** @var \Throwable $throwable */
        $throwable = $request['exception'];
        $responseData = [];
        if ($throwable instanceof ClientAwareInterface || $this->mode->isDevMode()) {
            $responseData['error'] = $throwable->getMessage();
        } else {
            $responseData['error'] = __('Error processing endpoint');
        }
        if ($this->mode->isDevMode()) {
            $responseData['trace'] = $throwable->getTraceAsString();
        }
        if ($throwable instanceof ClientAwareInterface) {
            $response->setResponseCode($throwable->getResponseCode());
        } else {
            $response->setResponseCode(500);
        }
        $response->setResponseBody($responseData);
        return $response;
    }
}