<?php

namespace QrMan\Api\Processor\Bucket;

use QrMan\Api\ApiInterface;
use QrMan\Api\Response;
use QrMan\Api\Util\User;
use QrMan\Model\Bucket;

class Listing implements ApiInterface
{

    public function __construct(
        private readonly User $userUtil,
        private readonly Bucket $bucketModel
    )
    {
    }

    /**
     * @inheritDoc
     */
    public function process(array $request, Response $response): Response
    {
        $user = $this->userUtil->getLoggedInUser();
        $buckets = $this->bucketModel->getBucketsByUserId($user->getData('id'));
        $response->setResponseBody([
            'buckets' => $buckets
        ]);
        return $response;
    }
}