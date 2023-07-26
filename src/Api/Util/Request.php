<?php

namespace QrMan\Api\Util;

use QrMan\Exception\MalformedDataException;

class Request
{
    public function validateRequiredFields(array $request, array $requiredFields): void
    {
        foreach ($requiredFields as $field) {
            $value = $request[$field] ?? null;
            if (!$value) {
                throw new MalformedDataException(__('%field is a required field', ['field' => $field]));
            }
        }
    }
}