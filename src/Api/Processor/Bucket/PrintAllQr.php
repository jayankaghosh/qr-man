<?php

namespace QrMan\Api\Processor\Bucket;

use DataObject\DataObject;
use QrMan\Api\ResponseInterface;
use QrMan\Api\Util\QrCode;
use QrMan\Api\Util\User;
use QrMan\Model\Bucket;
use Dompdf\Dompdf;
use QrMan\Util\File;
use QrMan\Util\Template;

class PrintAllQr implements ResponseInterface
{

    public function __construct(
        private readonly User $userUtil,
        private readonly Bucket $bucketModel,
        private readonly QrCode $qrCodeUtil,
        private readonly File $fileUtil,
        private readonly Template $templateUtil
    )
    {
    }

    public function process(string $uri, string $method): void
    {
        $user = $this->userUtil->getLoggedInUser();
        $buckets = $this->bucketModel->getBucketsByUserId($user->getData('id'))['items'] ?? [];
        $qrCodes = [];
        foreach ($buckets as $bucket) {
            $bucket = new DataObject($bucket);
            $imageData = base64_encode($this->qrCodeUtil->generateRawQRImage($bucket, 2.5));
            $qrCodes[] = 'data:image/png;base64,' . $imageData;
        }
        $template = $this->fileUtil->getRootDirectory() . '/src/templates/all_qr_pdf.phtml';
        $html = $this->templateUtil->load($template, [
            'qr_codes' => $qrCodes
        ]);

        $dompdf = new Dompdf();
        $dompdf->loadHtml($html);
        $dompdf->setPaper('A4', 'portrait');
        $dompdf->render();
        $pdf = $dompdf->output();
        header('Content-Type: application/pdf');
        echo $pdf;
        exit(0);
    }
}