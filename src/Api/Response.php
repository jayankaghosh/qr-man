<?php

namespace QrMan\Api;

use DataObject\DataObject;

class Response
{
    public function __construct(
        private int $responseCode = 200,
        private array $responseHeaders = [],
        private array $responseBody = []
    )
    {
    }

    /**
     * @return int
     */
    public function getResponseCode(): int
    {
        return $this->responseCode;
    }

    /**
     * @param int $responseCode
     */
    public function setResponseCode(int $responseCode): void
    {
        $this->responseCode = $responseCode;
    }

    /**
     * @return array
     */
    public function getResponseHeaders(): array
    {
        return $this->responseHeaders;
    }

    /**
     * @param array $responseHeaders
     */
    public function setResponseHeaders(array $responseHeaders): void
    {
        $this->responseHeaders = $responseHeaders;
    }

    /**
     * @param string $key
     * @param string $value
     * @return void
     */
    public function addResponseHeader(string $key, string $value): void
    {
        $this->responseHeaders[$key] = $value;
    }

    /**
     * @return array
     */
    public function getResponseBody(): array
    {
        return $this->responseBody;
    }

    /**
     * @param array $responseBody
     */
    public function setResponseBody(array $responseBody): void
    {
        $this->responseBody = $responseBody;
    }
}