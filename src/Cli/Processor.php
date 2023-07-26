<?php

namespace QrMan\Cli;

use Om\ObjectManager\ObjectManager;
use Symfony\Component\Console\Application;

class Processor
{
    public function process(): void
    {
        $application = new Application();
        $application->setCatchExceptions(true);
        $commandList = require __DIR__ . '/commands.php';
        $commands = [];
        foreach ($commandList as $command) {
            $commands[] = ObjectManager::getInstance()->get($command);
        }
        $application->addCommands($commands);
        $application->run();
    }
}