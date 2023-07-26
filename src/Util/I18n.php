<?php

namespace QrMan\Util;

use Symfony\Component\Translation\Loader\CsvFileLoader;
use Symfony\Component\Translation\Translator;

class I18n
{

    private static ?string $locale = null;
    private static ?string $csvPath = null;

    public static function setLocale(string $locale): void
    {
        self::$locale = $locale;
    }

    public static function getLocale(): ?string
    {
        return self::$locale;
    }

    public static function setCsvPath(string $csvPath): void
    {
        self::$csvPath = $csvPath;
    }

    public static function translate(string $text, array $variables = []): string
    {
        $locale = self::$locale;
        $csvPath = self::$csvPath;
        if ($locale && $csvPath) {
            $translator = new Translator($locale);
            $csvLoader = new CsvFileLoader();
            $csvLoader->setCsvControl(',', '"', '\\');
            $translator->addLoader('csv', $csvLoader);
            $translator->addResource('csv', $csvPath, $locale);
            $text = $translator->trans($text);
        }
        $formattedVariables = [];
        foreach ($variables as $key => $value) {
            $formattedVariables["%$key"] = $value;
        }
        return strtr($text, $formattedVariables);
    }
}