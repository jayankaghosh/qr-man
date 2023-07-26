<?php

namespace QrMan\Model;

class BucketItem extends AbstractModel
{

    const TYPE_TEXT = 0;
    const TYPE_IMAGE = 1;

    protected function getTableName(): string
    {
        return 'bucket_item';
    }

    protected function getIdField(): string
    {
        return 'id';
    }

    public function getItemsByBucketId(int $bucketId): array
    {
        return $this->getConnector()->query('SELECT * FROM '.$this->getTableName().' WHERE bucket_id=%s', [$bucketId]);
    }

    public function validateType(int $type): bool
    {
        $allowedTypes = [
            self::TYPE_TEXT,
            self::TYPE_IMAGE
        ];
        if (!in_array($type, $allowedTypes)) {
            return false;
        }
        return true;
    }
}