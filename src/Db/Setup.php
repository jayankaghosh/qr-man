<?php

namespace QrMan\Db;

use PHPSQLParser\PHPSQLParser;

class Setup
{

    public function __construct(
        private readonly PHPSQLParser $parser,
        private readonly ConnectorFactory $connectorFactory
    )
    {
    }

    public function setup(string $sql): void
    {
        $affectedTables = $this->getAffectedTables($sql);
        if (count($affectedTables)) {
            foreach ($affectedTables as $affectedTable) {
                $this->setupTable($affectedTable);
            }
        }
    }

    public function setupTable(string $table): void
    {
        $setupConfig = require __DIR__ . '/config.php';
        $config = $setupConfig[$table] ?? [];
        $connector = $this->connectorFactory->create([
            'doSetup' => false
        ]);
        foreach ($config as $query) {
            $connector->query($query);
        }
    }

    protected function getAffectedTables(string $sql): array
    {
        $sql = trim($sql, '(');
        $sql = trim($sql, ')');
        $result = $this->parser->parse($sql);
        $affectedTables = array_column($result['FROM'] ?? [], 'table');
        foreach ($result['WHERE'] ?? [] as $whereRow) {
            $expressionType = $whereRow['expr_type'] ?? null;
            $baseExpr = $whereRow['base_expr'] ?? null;
            if ($expressionType === 'subquery' && $baseExpr) {
                $affectedTables = array_merge($affectedTables, $this->getAffectedTables($baseExpr));
            }
        }
        $affectedTables = array_merge($affectedTables, array_column($result['DESCRIBE'] ?? [], 'table'));
        return array_unique($affectedTables);
    }
}