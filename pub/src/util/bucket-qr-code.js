import {sendRequest} from "util/request";
import {saveFile} from "util/file";
import {canShareBlob, shareBlob} from "util/share";

export const exportAllBucketQrs = async () => {
    const response = await sendRequest('/bucket/printAllQr', 'GET', null, {}, true);
    const blob = await response.blob();
    let extension = blob.type.split('/')[1]
    if (!extension) {
        extension = '';
    }
    const filename = `bucket-qr-codes.${extension}`;
    const objectUrl = URL.createObjectURL(blob);
    if (canShareBlob(blob)) {
        await shareBlob(blob, filename);
    } else {
        await saveFile(objectUrl, filename);
    }
}