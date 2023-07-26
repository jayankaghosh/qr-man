<?php

namespace QrMan\Model;

use DataObject\DataObject;
use QrMan\Db\Connector;
use QrMan\Exception\AlreadyExistsException;
use QrMan\Exception\MalformedDataException;
use QrMan\Util\Encryption;

class User extends AbstractModel
{

    public function __construct(
        Connector $connector,
        private readonly Encryption $encryption
    )
    {
        parent::__construct($connector);
    }

    protected function getTableName(): string
    {
        return 'user';
    }

    protected function getIdField(): string
    {
        return 'id';
    }

    public function createAccount(array $data): DataObject
    {

        $requiredFields = ['name', 'email', 'password'];
        foreach ($requiredFields as $requiredField) {
            if (!isset($data[$requiredField])) {
                throw new MalformedDataException(__('%field is a required field', ['field' => $requiredField]));
            }
        }

        $name = $data['name'];
        $email = $data['email'];
        $password = $data['password'];

        $model = $this->load($email, 'email');
        if ($model->getData('id')) {
            throw new AlreadyExistsException(__('User with email %email already exists', [
                'email' => $email
            ]));
        }

        $passwordHash = $this->encryption->hash($password);

        $model = new DataObject();
        $model->addData([
            'name' => $name,
            'email' => $email,
            'password_hash' => $passwordHash
        ]);
        return $this->save($model);
    }
}