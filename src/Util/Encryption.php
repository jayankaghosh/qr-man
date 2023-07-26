<?php

namespace QrMan\Util;

class Encryption
{
    public function hash(string $plainText, string $salt = null): string
    {
        if (!$salt) {
            $salt = $_ENV['ENCRYPTION_KEY'] ?? '';
        }
        $data = $salt . $plainText . $salt;
        return hash('sha256', $data);
    }

    public function validate(string $plainText, string $hash, string $salt = null): bool
    {
        return $hash === $this->hash($plainText, $salt);
    }
}