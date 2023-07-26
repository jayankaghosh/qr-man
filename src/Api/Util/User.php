<?php

namespace QrMan\Api\Util;

use DataObject\DataObject;
use QrMan\Exception\UnauthorizedException;
use QrMan\Model\UserToken;

class User
{
    public function __construct(
        private readonly UserToken $userTokenModel
    )
    {
    }

    public function getLoggedInUser(): DataObject
    {
        $authorizationHeader = getallheaders()['Authorization'] ?? null;
        if ($authorizationHeader) {
            $bearerToken = str_replace('Bearer ', '', $authorizationHeader);
            $user = $this->userTokenModel->loadUserByToken($bearerToken);
            if ($user) {
                return $user;
            }
        }
        throw new UnauthorizedException('User is not logged in');
    }
}