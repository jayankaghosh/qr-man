<?php

namespace QrMan\Api;

use Om\ObjectManager\ObjectManager;
use QrMan\Api\Processor\ErrorHandler;
use QrMan\Exception\MalformedDataException;
use QrMan\Exception\NotFoundException;

class Processor
{

    public function __construct(
        private readonly ResponseFactory $responseFactory
    )
    {
    }

    public function process(string $uri, string $method): void
    {
        $response = $this->responseFactory->create();
        try {
            $config = $this->getApiConfig();
            $processor = null;
            foreach ($config as $node) {
                $nodeUri = $node['uri'] ?? null;
                $nodeMethod = $node['method'] ?? null;
                $nodeProcessor = $node['processor'] ?? null;
                if ($nodeUri === $uri && $nodeMethod === $method && $nodeProcessor) {
                    $processor = $nodeProcessor;
                }
            }
            if (!$processor) {
                throw new NotFoundException(__('Processor not found'));
            }
            $processor = ObjectManager::getInstance()->get($processor);
            if ($processor instanceof ApiInterface) {
                $response = $processor->process($this->getPostData($method), $response);
            }
            $this->processResponse($response);
        } catch (\Throwable $throwable) {
            $processor = ObjectManager::getInstance()->get(ErrorHandler::class);
            $response = $processor->process([
                'exception' => $throwable
            ], $response);
            $this->processResponse($response);
        }
    }

    /**
     * @param string $method
     * @return array
     * @throws MalformedDataException
     */
    protected function getPostData(string $method): array
    {
        $allowedMethods = ['POST', 'PUT'];
        if (in_array($method, $allowedMethods)) {
            $json = file_get_contents('php://input');
            $data = json_decode($json, true);
            if (!$data) {
                throw new MalformedDataException(__('Malformed JSON POST data'));
            }
        } else {
            $data = [];
        }
        return (array)$data;
    }

    protected function processResponse(Response $response)
    {
        http_response_code($response->getResponseCode());
        header('Content-Type: application/json');
        foreach ($response->getResponseHeaders() as $key => $value) {
            header(sprintf('%s: %s', $key, $value));
        }
        echo \json_encode($response->getResponseBody());
        exit(0);
    }

    private function getApiConfig(): array
    {
        return require __DIR__ . '/config.php';
    }
}