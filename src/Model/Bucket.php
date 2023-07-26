<?php

namespace QrMan\Model;

use DataObject\DataObject;
use QrMan\Db\Connector;
use QrMan\Util\Encryption;

class Bucket extends AbstractModel
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
        return 'bucket';
    }

    protected function getIdField(): string
    {
        return 'id';
    }

    public function getBucketsByUserId(int $userId)
    {
        $ownedBuckets = $this->getConnector()->query('SELECT * FROM '.$this->getTableName().' WHERE owner_id=%s', [$userId]);
        $sharedBuckets = [];
        $buckets = array_merge($ownedBuckets, $sharedBuckets);
        return $buckets;
    }

    public function save(DataObject $model)
    {
        if (!$model->getData('id')) {
            while (true) {
                $code = $this->encryption->hash(strtotime('now'), strtotime('now'));
                $existingModel = $this->load($code, 'code');
                if (!$existingModel->getData('id')) {
                    break;
                }
            }
            $model->setData('code', $code);
        }
        return parent::save($model);
    }
}