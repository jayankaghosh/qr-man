<?php

namespace QrMan\Model;

use DataObject\DataObject;
use QrMan\Db\Connector;
use QrMan\Exception\ApplicationException;
use QrMan\Util\Encryption;

class UserToken extends AbstractModel
{

    public function __construct(
        Connector $connector,
        private readonly User $user,
        private readonly Encryption $encryption
    )
    {
        parent::__construct($connector);
    }

    protected function getTableName(): string
    {
        return 'user_token';
    }

    protected function getIdField(): string
    {
        return 'id';
    }

    public function loadUserByToken(string $token): ?DataObject
    {
        $userTokenModel = $this->load($token, 'token');
        if ($userTokenModel->getData('id')) {
            $userModel = $this->user->load($userTokenModel->getData('user_id'));
            if ($userModel->getData('id')) {
                return $userModel;
            }
        }
        return null;
    }

    public function generateToken(int $userId): string
    {
        $userModel = $this->user->load($userId);
        if (!$userModel->getData('id')) {
            throw new ApplicationException(sprintf('User with ID %s does not exist', $userId));
        }
        while (true) {
            $token = $this->encryption->hash(strtotime('now'));
            $existingModel = $this->load($token, 'token');
            if (!$existingModel->getData('id')) {
                break;
            }
        }
        $tokenModel = new DataObject();
        $tokenModel->addData([
            'user_id' => $userId,
            'token' => $token
        ]);
        $this->save($tokenModel);
        return $tokenModel->getData('token');
    }
}