<?php

namespace QrMan\Api\Processor\Bucket;

use chillerlan\QRCode\Output\QROutputInterface;
use chillerlan\QRCode\QRCode;
use chillerlan\QRCode\QROptions;
use QrMan\Api\ApiInterface;
use QrMan\Api\Response;
use QrMan\Api\Util\Request;
use QrMan\Api\Util\User;
use QrMan\Exception\UnauthorizedException;
use QrMan\Model\Bucket;
use QrMan\Util\QrImageWithText;

class GenerateQR implements ApiInterface
{

    public function __construct(
        private readonly User $userUtil,
        private readonly Bucket $bucketModel,
        private readonly Request $requestUtil
    )
    {
    }

    /**
     * @inheritDoc
     */
    public function process(array $request, Response $response): Response
    {
        $this->requestUtil->validateRequiredFields($_GET, ['bucket_id']);
        $user = $this->userUtil->getLoggedInUser();
        $bucket = $this->bucketModel->load($_GET['bucket_id']);
        $allowedBuckets = $this->bucketModel->getBucketsByUserId($user->getData('id'));
        $allowedBucketIds = array_column($allowedBuckets, 'id');
        if (!in_array($bucket->getData('id'), $allowedBucketIds)) {
            throw new UnauthorizedException('Bucket does not belong to you');
        }
        $this->generateRawQRImage(
            $bucket->getData('code'),
            $bucket->getData('owner_id') . '/' . $bucket->getData('id') . '/' . $bucket->getData('name')
        );
    }

    /**
     * @param $data
     * @return void
     * @throws \chillerlan\QRCode\Data\QRCodeDataException
     * @throws \chillerlan\QRCode\Output\QRCodeOutputException
     * @throws \ErrorException
     */
    protected function generateRawQRImage(string $data, string $subtext): void
    {
        $options = new QROptions([
            'version'     => 7,
            'outputType'  => QROutputInterface::GDIMAGE_PNG,
            'scale'       => 5,
            'imageBase64' => false,
        ]);
        $qrCode = new QRCode($options);
        $qrCode->addByteSegment($data);
        $qrOutputInterface = new QrImageWithText($options, $qrCode->getQRMatrix());

        header('Content-type: image/png');
        echo $qrOutputInterface->dump(null, $subtext);
        exit(0);
    }
}