<?php

function __(string $text, array $variables = []): string
{
    return \QrMan\Util\I18n::translate($text, $variables);
}