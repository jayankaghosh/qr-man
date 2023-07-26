<?php

namespace QrMan\Util;

use chillerlan\QRCode\Output\QRGdImage;
use chillerlan\QRCode\Output\QROutputInterface;

class QrImageWithText extends QRGdImage
{
    /**
     * @inheritDoc
     */
    public function dump(string $file = null, string $text = null):string{
        // set returnResource to true to skip further processing for now
        $this->options->returnResource = true;

        // there's no need to save the result of dump() into $this->image here
        parent::dump($file);

        // render text output if a string is given
        if($text !== null){
            $this->addText($text);
        }

        $imageData = $this->dumpImage();

        $this->saveToFile($imageData, $file);

        if($this->options->imageBase64){
            $imageData = $this->toBase64DataURI($imageData, 'image/'.$this->options->outputType);
        }

        return $imageData;
    }

    protected function addText(string $text):void{
        // save the qrcode image
        $qrcode = $this->image;

        // options things
        $textSize  = 3; // see imagefontheight() and imagefontwidth()
        $textBG    = [200, 200, 200];
        $textColor = [50, 50, 50];

        $bgWidth  = $this->length;
        $bgHeight = ($bgWidth + 20); // 20px extra space

        // create a new image with additional space
        $this->image = imagecreatetruecolor($bgWidth, $bgHeight);
        $background  = imagecolorallocate($this->image, ...$textBG);

        // allow transparency
        if($this->options->imageTransparent && $this->options->outputType !== QROutputInterface::GDIMAGE_JPG){
            imagecolortransparent($this->image, $background);
        }

        // fill the background
        imagefilledrectangle($this->image, 0, 0, $bgWidth, $bgHeight, $background);

        // copy over the qrcode
        imagecopymerge($this->image, $qrcode, 0, 0, 0, 0, $this->length, $this->length, 100);
        imagedestroy($qrcode);

        $fontColor = imagecolorallocate($this->image, ...$textColor);
        $w         = imagefontwidth($textSize);
        $x         = round(($bgWidth - strlen($text) * $w) / 2);

        // loop through the string and draw the letters
        foreach(str_split($text) as $i => $chr){
            imagechar($this->image, $textSize, (int)($i * $w + $x), $this->length, $chr, $fontColor);
        }
    }
}