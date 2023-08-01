<?php

namespace QrMan\Model;

use QrMan\Db\Connector;

class BucketItem extends AbstractModel
{

    const TYPE_IMAGE = 1;
    const TYPE_TEXT = 2;

    protected function getTableName(): string
    {
        return 'bucket_item';
    }

    protected function getIdField(): string
    {
        return 'id';
    }

    public function getItemsByBucketId(
        int $bucketId,
        int $pageSize = null,
        int $currentPage = null,
        string $sortField = null,
        string $sortDirection = null
    ): array
    {
        $query = 'SELECT * FROM '.$this->getTableName().' WHERE bucket_id=%s';
        if ($sortField && $sortDirection) {
            $query .= " ORDER BY $sortField $sortDirection";
        }
        if ($pageSize && $currentPage) {
            $limit = $pageSize;
            $offset = $pageSize*($currentPage-1);
            $query .= " LIMIT $offset,$limit";
        }
        $items = $this->getConnector()->query($query, [$bucketId]);
        $totalCount = $this->getConnector()->query(
            "SELECT COUNT(*) FROM ".$this->getTableName()." WHERE bucket_id=%s",
            [$bucketId],
            Connector::QUERY_TYPE_FIRST_FIELD
        );
        return [
            'items' => $items,
            'total_count' => $totalCount
        ];
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