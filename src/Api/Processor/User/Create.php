<?php

namespace QrMan\Api\Processor\User;

use DataObject\DataObject;
use QrMan\Api\ApiInterface;
use QrMan\Api\Response;
use QrMan\Api\Util\Request;
use QrMan\Exception\AlreadyExistsException;
use QrMan\Exception\MalformedDataException;
use QrMan\Model\User;
use QrMan\Model\UserToken;
use QrMan\Util\Encryption;

class Create implements ApiInterface
{

    public function __construct(
        private readonly Encryption $encryption,
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
        $name = $request['name'];
        $email = $request['email'];
        $password = $request['password'];

        $model = $this->userModel->load($email, 'email');
        if ($model->getData('id')) {
            throw new AlreadyExistsException(sprintf('User with email %s already exists', $email));
        }

        $passwordHash = $this->encryption->hash($password);

        $model = new DataObject();
        $model->addData([
            'name' => $name,
            'email' => $email,
            'password_hash' => $passwordHash
        ]);
        $model = $this->userModel->save($model);

        $response->setResponseBody([
            'token' => $this->userTokenModel->generateToken($model->getData('id'))
        ]);
        return $response;
    }
}