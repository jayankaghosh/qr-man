<?php

namespace QrMan\Api;

interface ApiInterface
{
    /**
     * @param array $request
     * @param Response $response
     * @return Response
     * @throws \Exception
     */
    public function process(array $request, Response $response): Response;
}