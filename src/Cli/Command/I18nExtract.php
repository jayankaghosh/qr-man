<?php

namespace QrMan\Cli\Command;

use Om\DependencyInjection\NonInterceptableInterface;
use QrMan\Util\File;
use Symfony\Component\Console\Command\Command;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Output\OutputInterface;

class I18nExtract extends Command implements NonInterceptableInterface
{

    public function __construct(
        private readonly File $fileUtil,
        $name = null
    )
    {
        parent::__construct($name);
    }

    protected function configure()
    {
        $this->setName('i18n:extract')
            ->setDescription(__('Extract all translation strings into CSV'));
    }

    /**
     * @param InputInterface $input
     * @param OutputInterface $output
     * @return int
     * @throws \Exception
     */
    protected function execute(InputInterface $input, OutputInterface $output): int
    {
        $output->writeln(__('<info>Extracting phrases</info>'));
        $rootDirectory = $this->fileUtil->getRootDirectory();
        $sourceDirectory = $this->fileUtil->getSourceDirectory();
        $files = $this->fileUtil->getAllFilesRecursively($sourceDirectory, ['php']);
        $phrases = [];
        $phraseRegex = [
            '/__\(\'(.+?)\'/',
            '/__\("(.+?)"/'
        ];
        foreach ($files as $file) {
            $content = $this->fileUtil->read($file);
            foreach ($phraseRegex as $regex) {
                if (preg_match_all($regex, $content, $matches)) {
                    $phrases = array_merge($phrases, $matches[1]);
                }
            }
        }
        $phrases = array_values(array_unique($phrases));
        $outputFile = $rootDirectory . '/i18n/en_US.csv';
        $fp = fopen($outputFile,"w");
        foreach ($phrases as $phrase) {
            fputcsv($fp, [$phrase, $phrase]);
        }
        fclose($fp);
        $output->writeln(__('<info>Phrases extracted to %file</info>', ['file' => $outputFile]));
        return 0;
    }
}