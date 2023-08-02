<?php

namespace QrMan\Api\Util;

use chillerlan\QRCode\Data\QRCodeDataException;
use chillerlan\QRCode\Output\QRCodeOutputException;
use chillerlan\QRCode\Output\QROutputInterface;
use chillerlan\QRCode\QROptions;
use DataObject\DataObject;
use QrMan\Util\QrImageWithText;

class QrCode
{
    /**
     * @param DataObject $bucket
     * @param float $scale
     * @return \GdImage|resource|string
     * @throws QRCodeDataException
     * @throws QRCodeOutputException
     * @throws \ErrorException
     */
    public function generateRawQRImage(DataObject $bucket, float $scale = 5)
    {
        $data = $bucket->getData('code');
        $subtext = $bucket->getData('owner_id') . '/' . $bucket->getData('id') . '/' . $bucket->getData('name');
        $options = new QROptions([
            'version'     => 7,
            'outputType'  => QROutputInterface::GDIMAGE_JPG,
            'scale'       => 5,
            'imageBase64' => false,
        ]);
        $qrCode = new \chillerlan\QRCode\QRCode($options);
        $qrCode->addByteSegment($data);
        $qrOutputInterface = new QrImageWithText($options, $qrCode->getQRMatrix());
        return $qrOutputInterface->dump(null, $subtext);
    }
}