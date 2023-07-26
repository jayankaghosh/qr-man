<?php

namespace QrMan\Util;

use QrMan\Exception\ApplicationException;

class File
{
    private bool $isInitialised = false;
    private string $rootDirectory;

    public function initialize(string $rootDirectory)
    {
        if ($this->isInitialised) {
            throw new ApplicationException(__('Util already initialized'));
        }
        $this->rootDirectory = $rootDirectory;
        $this->isInitialised = true;
    }

    /**
     * @return string
     */
    public function getRootDirectory(): string
    {
        if (!$this->isInitialised) {
            throw new ApplicationException(__('Util not initialized'));
        }
        return $this->rootDirectory;
    }

    public function getSourceDirectory(): string
    {
        return $this->getRootDirectory() . '/src';
    }

    public function getAllFilesRecursively(string $parentDirectory, ?array $extensions = null): array
    {
        $files = [];
        $iterator = new \RecursiveDirectoryIterator($parentDirectory);
        /** @var \SplFileInfo $file */
        foreach (new \RecursiveIteratorIterator($iterator) as $file) {
            if ($file->getFilename() === '.' || $file->getFilename() === '..') {
                continue;
            }
            if ($extensions && !in_array(strtolower($file->getExtension()), $extensions)) {
                continue;
            }
            $files[] = $file->getPath() . DIRECTORY_SEPARATOR . $file->getFilename();
        }
        return $files;
    }

    public function read(string $filePath): string
    {
        if (!file_exists($filePath)) {
            throw new ApplicationException(__('File does not exist'));
        }
        $fp = fopen($filePath, 'r');
        $content = fread($fp, filesize($filePath));
        fclose($fp);
        return $content;
    }

}