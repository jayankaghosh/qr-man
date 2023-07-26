<?php

namespace QrMan\Exception;

class MalformedDataException extends ApplicationException implements ClientAwareInterface
{

    /**
     * @inheritDoc
     */
    public function getResponseCode(): int
    {
        return 400;
    }
}