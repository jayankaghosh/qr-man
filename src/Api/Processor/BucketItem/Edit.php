<?php

namespace QrMan\Api\Processor\BucketItem;

use QrMan\Api\ApiInterface;
use QrMan\Api\Response;
use QrMan\Api\Util\Request;
use QrMan\Api\Util\User;
use QrMan\Exception\ForbiddenException;
use QrMan\Exception\MalformedDataException;
use QrMan\Exception\UnauthorizedException;
use QrMan\Model\Bucket;
use QrMan\Model\BucketItem;

class Edit implements ApiInterface
{

    public function __construct(
        private readonly Bucket $bucketModel,
        private readonly BucketItem $bucketItemModel,
        private readonly User $userUtil,
        private readonly Request $requestUtil
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
        $model = $this->bucketItemModel->load($bucketItemId);
        $bucket = $this->bucketModel->load((int)$model->getData('bucket_id'));
        if ($bucket->getData('owner_id') != $user->getData('id')) {
            throw new UnauthorizedException(__('Bucket does not belong to you'));
        }
        $forbiddenFields = [
            'bucket_id',
            'created_at',
            'updated_at',
        ];
        foreach ($forbiddenFields as $forbiddenField) {
            if (array_key_exists($forbiddenField, $request)) {
                throw new ForbiddenException(__('Cannot change %field', ['field' => $forbiddenField]));
            }
        }
        if (!$this->bucketItemModel->validateType($request['type'])) {
            throw new MalformedDataException(__('Invalid type'));
        }
        $model->addData($request);
        $model = $this->bucketItemModel->save($model);
        $response->setResponseBody($model->getData());
        return $response;
    }
}