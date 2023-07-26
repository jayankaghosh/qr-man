<?php

namespace QrMan\Api\Processor\User;

use QrMan\Api\ApiInterface;
use QrMan\Api\Response;
use QrMan\Api\Util\User;

class Details implements ApiInterface
{

    public function __construct(
        private readonly User $userUtil
    )
    {
    }

    /**
     * @inheritDoc
     */
    public function process(array $request, Response $response): Response
    {
        $loggedInUser = $this->userUtil->getLoggedInUser();
        $response->setResponseBody($loggedInUser->getData());
        return $response;
    }
}