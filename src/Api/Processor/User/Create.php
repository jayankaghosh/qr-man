<?php

namespace QrMan\Api\Processor\User;

use DataObject\DataObject;
use QrMan\Api\ApiInterface;
use QrMan\Api\Response;
use QrMan\Api\Util\Request;
use QrMan\Model\User;
use QrMan\Model\UserToken;

class Create implements ApiInterface
{

    public function __construct(
        private readonly User $userModel,
        private readonly UserToken $userTokenModel,
        private readonly Request $requestUtil
    )
    {
    }

    /**
     * @inheritDoc
     */
    public function process(array $request, Response $response): Response
    {
        $this->requestUtil->validateRequiredFields($request, [
            'name',
            'email',
            'password'
        ]);
        $model = $this->userModel->createAccount($request);
        $response->setResponseBody([
            'token' => $this->userTokenModel->generateToken($model->getData('id'))
        ]);
        return $response;
    }
}