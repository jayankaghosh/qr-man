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

    public function getBucketsByUserId(
        int $userId,
        int $pageSize = null,
        int $currentPage = null,
        string $sortField = null,
        string $sortDirection = null
    )
    {
        $query = "SELECT * FROM " . $this->getTableName() . " WHERE owner_id=%s";
        if ($sortField && $sortDirection) {
            $query .= " ORDER BY $sortField $sortDirection";
        }
        if ($pageSize && $currentPage) {
            $limit = $pageSize;
            $offset = $pageSize*($currentPage-1);
            $query .= " LIMIT $offset,$limit";
        }
        $ownedBuckets = $this->getConnector()->query(
            $query,
            [$userId]
        );
        $sharedBuckets = [];
        $items = array_merge($ownedBuckets, $sharedBuckets);
        $totalCount = $this->getConnector()->query(
            "SELECT COUNT(*) FROM ".$this->getTableName()." WHERE owner_id=%s",
            [$userId],
            Connector::QUERY_TYPE_FIRST_FIELD
        );
        return [
            'items' => $items,
            'total_count' => $totalCount
        ];
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