<?php

namespace QrMan\Exception;

class ForbiddenException extends ApplicationException implements ClientAwareInterface
{

    /**
     * @inheritDoc
     */
    public function getResponseCode(): int
    {
        return 403;
    }
}