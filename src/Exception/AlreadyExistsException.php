<?php

namespace QrMan\Exception;

class AlreadyExistsException extends ApplicationException implements ClientAwareInterface
{

    /**
     * @inheritDoc
     */
    public function getResponseCode(): int
    {
        return 409;
    }
}