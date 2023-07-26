<?php

namespace QrMan\Model;

class User extends AbstractModel
{

    protected function getTableName(): string
    {
        return 'user';
    }

    protected function getIdField(): string
    {
        return 'id';
    }
}