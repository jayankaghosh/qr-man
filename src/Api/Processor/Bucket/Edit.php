<?php

namespace QrMan\Api\Processor\Bucket;

use QrMan\Api\ApiInterface;
use QrMan\Api\Response;
use QrMan\Api\Util\Request;
use QrMan\Api\Util\User;
use QrMan\Exception\ForbiddenException;
use QrMan\Exception\UnauthorizedException;
use QrMan\Model\Bucket;

class Edit implements ApiInterface
{

    public function __construct(
        private readonly Bucket $bucketModel,
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
            'bucket_id'
        ]);
        $bucketId = (int)$request['bucket_id'];
        $model = $this->bucketModel->load($bucketId);
        if ($model->getData('owner_id') != $user->getData('id')) {
            throw new UnauthorizedException(__('Bucket does not belong to you'));
        }
        $forbiddenFields = [
            'owner_id',
            'code',
            'created_at',
            'updated_at',
        ];
        foreach ($forbiddenFields as $forbiddenField) {
            if (array_key_exists($forbiddenField, $request)) {
                throw new ForbiddenException(__('Cannot change %field', ['field' => $forbiddenField]));
            }
        }
        $model->addData($request);
        $model = $this->bucketModel->save($model);
        $response->setResponseBody($model->getData());
        return $response;
    }
}