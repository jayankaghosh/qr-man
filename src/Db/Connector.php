<?php

namespace QrMan\Db;

class Connector
{

    const QUERY_TYPE_DEFAULT = 0;
    const QUERY_TYPE_FIRST_ROW = 1;
    const QUERY_TYPE_FIRST_FIELD = 2;

    public function __construct(
        private readonly \DB $Db,
        private readonly Setup $setup,
        private readonly bool $doSetup = true
    )
    {
        $this->Db::$host = $_ENV['DB_HOST'];
        $this->Db::$user = $_ENV['DB_USERNAME'];
        $this->Db::$password = $_ENV['DB_PASSWORD'];
        $this->Db::$dbName = $_ENV['DB_NAME'];
    }

    /**
     * @param string $sql
     * @return mixed
     */
    public function query(string $sql, array $variables = [], int $queryType = self::QUERY_TYPE_DEFAULT)
    {
        if ($this->doSetup) {
            $this->setup->setup($sql);
        }
        if ($queryType === self::QUERY_TYPE_FIRST_ROW) {
            $queryType = 'queryFirstRow';
        } elseif ($queryType === self::QUERY_TYPE_FIRST_FIELD) {
            $queryType = 'queryFirstField';
        } else {
            $queryType = 'query';
        }
        return $this->Db::{$queryType}($sql, ...$variables);
    }

    public function insert(string $table, array $data)
    {
        if ($this->doSetup) {
            $this->setup->setupTable($table);
        }
        $this->Db::insert($table, $data);
        return $this->Db::insertId();
    }
}