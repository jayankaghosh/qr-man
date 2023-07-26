<?php

namespace QrMan\Exception;

interface ClientAwareInterface
{
    /**
     * @return int
     */
    public function getResponseCode(): int;
}