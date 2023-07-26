<?php

namespace QrMan\Api\Processor\Bucket;

use DataObject\DataObject;
use QrMan\Api\ApiInterface;
use QrMan\Api\Response;
use QrMan\Api\Util\Request;
use QrMan\Api\Util\User;
use QrMan\Exception\UnauthorizedException;
use QrMan\Model\Bucket;

class Delete implements ApiInterface
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
            throw new UnauthorizedException('Bucket does not belong to you');
        }
        $this->bucketModel->delete($model);
        $response->setResponseBody([
            'success' => true
        ]);
        return $response;
    }
}