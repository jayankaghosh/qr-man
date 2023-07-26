<?php

namespace QrMan\Api\Processor\User;

use QrMan\Api\ApiInterface;
use QrMan\Api\Response;
use QrMan\Api\Util\Request;
use QrMan\Exception\MalformedDataException;
use QrMan\Exception\UnauthorizedException;
use QrMan\Model\User;
use QrMan\Model\UserToken;
use QrMan\Util\Encryption;

class Login implements ApiInterface
{

    public function __construct(
        private readonly User $userModel,
        private readonly Encryption $encryption,
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
            'email',
            'password'
        ]);

        $email = $request['email'];
        $password = $request['password'];

        $model = $this->userModel->load($email, 'email');
        if (!$model->getData('id')) {
            throw new UnauthorizedException('Invalid email or password');
        }
        $isValid = $this->encryption->validate($password, $model->getData('password_hash') ?? '');
        if (!$isValid) {
            throw new UnauthorizedException('Invalid email or password');
        }
        $response->setResponseBody([
            'token' => $this->userTokenModel->generateToken($model->getData('id'))
        ]);
        return $response;
    }
}