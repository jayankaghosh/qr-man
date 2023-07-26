<?php

namespace QrMan\Api\Processor\BucketItem;

use DataObject\DataObject;
use QrMan\Api\ApiInterface;
use QrMan\Api\Response;
use QrMan\Api\Util\Request;
use QrMan\Api\Util\User;
use QrMan\Exception\UnauthorizedException;
use QrMan\Model\Bucket;
use QrMan\Model\BucketItem;

class Delete implements ApiInterface
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
        $this->requestUtil->validateRequiredFields($request, [
            'bucket_item_id'
        ]);
        $bucketItemId = (int)$request['bucket_item_id'];
        $bucketItem = $this->bucketItemModel->load($bucketItemId);
        $bucket = $this->bucketModel->load((string)$bucketItem->getData('bucket_id'));
        if ($bucket->getData('owner_id') != $user->getData('id')) {
            throw new UnauthorizedException('Bucket does not belong to you');
        }
        $this->bucketItemModel->delete($bucketItem);
        $response->setResponseBody([
            'success' => true
        ]);
        return $response;
    }
}