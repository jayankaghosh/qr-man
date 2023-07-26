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
        $pageSize = $_GET['pageSize'] ?? 10;
        $currentPage = $_GET['currentPage'] ?? 1;
        $sortField = $_GET['sortField'] ?? 'id';
        $sortDirection = $_GET['sortDirection'] ?? 'DESC';
        $data = $this->bucketModel->getBucketsByUserId(
            $user->getData('id'),
            $pageSize,
            $currentPage,
            $sortField,
            $sortDirection
        );
        $response->setResponseBody($data);
        return $response;
    }
}