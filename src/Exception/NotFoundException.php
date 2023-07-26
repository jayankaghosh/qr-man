<?php

namespace QrMan\Exception;

class NotFoundException extends ApplicationException implements ClientAwareInterface
{

    /**
     * @inheritDoc
     */
    public function getResponseCode(): int
    {
        return 404;
    }
}