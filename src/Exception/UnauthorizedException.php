<?php

namespace QrMan\Exception;

class UnauthorizedException extends ApplicationException implements ClientAwareInterface
{

    /**
     * @inheritDoc
     */
    public function getResponseCode(): int
    {
        return 401;
    }
}