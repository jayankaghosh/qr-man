<?php

namespace QrMan\Model;

use DataObject\DataObject;
use QrMan\Db\Connector;

abstract class AbstractModel
{

    public function __construct(
        protected readonly Connector $connector
    )
    {
    }

    abstract protected function getTableName(): string;
    abstract protected function getIdField(): string;

    public function describe()
    {
        return $this->connector->query('DESCRIBE ' . $this->getTableName());
    }

    public function load(string $value, ?string $field = null): DataObject
    {
        if (!$field) {
            $field = $this->getIdField();
        }

        $result = $this->connector->query(
            'SELECT * FROM '.$this->getTableName().' WHERE '.$field.'=%s',
            [$value],
            Connector::QUERY_TYPE_FIRST_ROW);
        $model = new DataObject();
        if ($result) {
            $model->addData($result);
        }
        return $model;
    }

    public function getConnector(): Connector
    {
        return $this->connector;
    }

    public function save(DataObject $model)
    {
        $columns = array_column($this->describe(), 'Field');
        $data = [];
        foreach ($columns as $column) {
            if ($model->getData($column)) {
                $data[$column] = $model->getData($column);
            }
        }
        $id = $this->connector->insert($this->getTableName(), $data);
        $newModel = $this->load($id);
        $model->addData($newModel->getData());
        return $model;
    }

    public function delete(DataObject $model)
    {
        if ($model->getData($this->getIdField())) {
            $this->connector->query('DELETE FROM ' . $this->getTableName() . ' WHERE '.$this->getIdField().'=%s', [
                $model->getData($this->getIdField())
            ]);
        }
        return $this;
    }

    public function deleteById(int $id)
    {
        $model = $this->load($id);
        return $this->delete($model);
    }
}