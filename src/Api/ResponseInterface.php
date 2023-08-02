<?php

namespace QrMan\Api;

interface ResponseInterface
{
    public function process(string $uri, string $method): void;
}