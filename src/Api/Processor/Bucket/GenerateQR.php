<?php

namespace QrMan\Api\Processor\Bucket;

use QrMan\Api\ApiInterface;
use QrMan\Api\Response;
use QrMan\Api\Util\QrCode;
use QrMan\Api\Util\Request;
use QrMan\Api\Util\User;
use QrMan\Exception\UnauthorizedException;
use QrMan\Model\Bucket;

class GenerateQR implements ApiInterface
{

    public function __construct(
        private readonly User $userUtil,
        private readonly Bucket $bucketModel,
        private readonly Request $requestUtil,
        private readonly QrCode $qrCodeUtil
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
        $allowedBuckets = $this->bucketModel->getBucketsByUserId($user->getData('id'))['items'];
        $allowedBucketIds = array_column($allowedBuckets, 'id');
        if (!in_array($bucket->getData('id'), $allowedBucketIds)) {
            throw new UnauthorizedException(__('Bucket does not belong to you'));
        }
        $data = $this->qrCodeUtil->generateRawQRImage($bucket);
        header('Content-type: image/png');
        echo $data;
        exit(0);
    }
}