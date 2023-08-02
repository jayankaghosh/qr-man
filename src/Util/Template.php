<?php

namespace QrMan\Util;

use DataObject\DataObject;

class Template
{
    public function load($template, $data = []): string
    {
        $viewRender = \Closure::bind(function () use ($template) {
            ob_start();
            include $template;
            return ob_get_clean();
        }, new DataObject($data));
        return (string)call_user_func($viewRender);
    }
}