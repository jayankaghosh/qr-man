<?php

namespace QrMan\Api\Processor\Bucket;

use DataObject\DataObject;
use QrMan\Api\ApiInterface;
use QrMan\Api\Response;
use QrMan\Api\Util\Request;
use QrMan\Api\Util\User;
use QrMan\Model\Bucket;

class Add implements ApiInterface
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
            'name',
            'description'
        ]);
        $model = new DataObject([
            'owner_id' => $user->getData('id'),
            'name' => $request['name'],
            'description' => $request['description']
        ]);
        $model = $this->bucketModel->save($model);
        $response->setResponseBody($model->getData());
        return $response;
    }
}