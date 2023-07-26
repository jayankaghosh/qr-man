<?php

namespace QrMan\Api\Processor\BucketItem;

use QrMan\Api\ApiInterface;
use QrMan\Api\Response;
use QrMan\Api\Util\Request;
use QrMan\Api\Util\User;
use QrMan\Exception\UnauthorizedException;
use QrMan\Model\Bucket;
use QrMan\Model\BucketItem;

class Listing implements ApiInterface
{

    public function __construct(
        private readonly User $userUtil,
        private readonly Request $requestUtil,
        private readonly Bucket $bucketModel,
        private readonly BucketItem $bucketItemModel
    )
    {
    }

    /**
     * @inheritDoc
     */
    public function process(array $request, Response $response): Response
    {
        $user = $this->userUtil->getLoggedInUser();
        $this->requestUtil->validateRequiredFields($_GET, ['bucket_id']);
        $bucket = $this->bucketModel->load($_GET['bucket_id']);
        $allowedBuckets = $this->bucketModel->getBucketsByUserId($user->getData('id'));
        $allowedBucketIds = array_column($allowedBuckets, 'id');
        if (!in_array($bucket->getData('id'), $allowedBucketIds)) {
            throw new UnauthorizedException('Bucket does not belong to you');
        }
        $items = $this->bucketItemModel->getItemsByBucketId($bucket->getData('id'));
        $response->setResponseBody([
            'items' => $items
        ]);
        return $response;
    }
}