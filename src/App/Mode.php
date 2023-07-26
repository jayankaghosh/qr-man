<?php

namespace QrMan\App;

class Mode
{
    const MODE_DEV = 'dev';
    const MODE_PROD = 'prod';

    public function getMode(): string
    {
        $mode = strtolower($_ENV['MODE'] ?? '');
        if ($mode === static::MODE_PROD) {
            return static::MODE_PROD;
        } else {
            return self::MODE_DEV;
        }
    }

    public function isDevMode(): bool
    {
        return $this->getMode() === static::MODE_DEV;
    }

    public function isProdMode(): bool
    {
        return $this->getMode() === static::MODE_PROD;
    }
}