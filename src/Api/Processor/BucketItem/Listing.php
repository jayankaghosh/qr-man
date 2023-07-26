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
        $allowedBuckets = $this->bucketModel->getBucketsByUserId($user->getData('id'))['items'];
        $allowedBucketIds = array_column($allowedBuckets, 'id');
        if (!in_array($bucket->getData('id'), $allowedBucketIds)) {
            throw new UnauthorizedException('Bucket does not belong to you');
        }
        $pageSize = $_GET['pageSize'] ?? 10;
        $currentPage = $_GET['currentPage'] ?? 1;
        $sortField = $_GET['sortField'] ?? 'id';
        $sortDirection = $_GET['sortDirection'] ?? 'DESC';
        $data = $this->bucketItemModel->getItemsByBucketId(
            $bucket->getData('id'),
            $pageSize,
            $currentPage,
            $sortField,
            $sortDirection
        );
        $response->setResponseBody($data);
        return $response;
    }
}