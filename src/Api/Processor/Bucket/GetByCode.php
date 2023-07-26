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

class GetByCode implements ApiInterface
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
        $this->requestUtil->validateRequiredFields($_GET, ['code']);
        $user = $this->userUtil->getLoggedInUser();
        $bucket = $this->bucketModel->load($_GET['code'], 'code');
        $allowedBuckets = $this->bucketModel->getBucketsByUserId($user->getData('id'))['items'];
        $allowedBucketCodes = array_column($allowedBuckets, 'code');
        if (!in_array($bucket->getData('code'), $allowedBucketCodes)) {
            throw new UnauthorizedException('Bucket does not belong to you');
        }
        $response->setResponseBody($bucket->getData());
        return $response;
    }
}