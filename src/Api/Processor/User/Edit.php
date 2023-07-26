<?php

namespace QrMan\Api\Processor\User;

use QrMan\Api\ApiInterface;
use QrMan\Api\Response;
use QrMan\Exception\ForbiddenException;
use QrMan\Model\User;

class Edit implements ApiInterface
{

    public function __construct(
        private readonly User $userModel,
        private readonly \QrMan\Api\Util\User $userUtil
    )
    {
    }

    /**
     * @inheritDoc
     */
    public function process(array $request, Response $response): Response
    {
        $user = $this->userUtil->getLoggedInUser();
        $forbiddenFields = [
            'email',
            'password',
            'password_hash',
            'created_at',
            'updated_at',
        ];
        foreach ($forbiddenFields as $forbiddenField) {
            if (array_key_exists($forbiddenField, $request)) {
                throw new ForbiddenException(__('Cannot change %field', ['field' => $forbiddenField]));
            }
        }
        $user->addData($request);
        $user = $this->userModel->save($user);
        $response->setResponseBody($user->getData());
        return $response;
    }
}