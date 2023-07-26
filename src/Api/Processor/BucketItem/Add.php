<?php

namespace QrMan\Api\Processor\BucketItem;

use DataObject\DataObject;
use QrMan\Api\ApiInterface;
use QrMan\Api\Response;
use QrMan\Api\Util\Request;
use QrMan\Api\Util\User;
use QrMan\Exception\MalformedDataException;
use QrMan\Exception\UnauthorizedException;
use QrMan\Model\Bucket;
use QrMan\Model\BucketItem;

class Add implements ApiInterface
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
            'bucket_id',
            'name',
            'type',
            'value'
        ]);
        $bucket = $this->bucketModel->load($request['bucket_id']);
        $allowedBuckets = $this->bucketModel->getBucketsByUserId($user->getData('id'))['items'];
        $allowedBucketIds = array_column($allowedBuckets, 'id');
        if (!in_array($bucket->getData('id'), $allowedBucketIds)) {
            throw new UnauthorizedException(__('Bucket does not belong to you'));
        }
        if (!$this->bucketItemModel->validateType($request['type'])) {
            throw new MalformedDataException(__('Invalid type'));
        }
        $model = new DataObject([
            'bucket_id' => $bucket->getData('id'),
            'name' => $request['name'],
            'type' => $request['type'],
            'value' => $request['value']
        ]);
        $model = $this->bucketItemModel->save($model);
        $response->setResponseBody($model->getData());
        return $response;
    }
}