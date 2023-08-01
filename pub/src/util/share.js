
const blobToFile = (blob, filename) => {
    if (!blob instanceof Blob) {
        throw 'Invalid blob';
    }
    let extension = blob.type.split('/')[1]
    if (!extension) {
        extension = '';
    }
    return new File([blob], `${filename}.${extension}`, {type: blob.type});
}

export const canShareBlob = (blob) => {
    const data = {
        files: [blobToFile(blob, 'test')]
    }
    return typeof window.navigator.share === 'function' && window.navigator.canShare(data);
}

export const shareBlob = async (blob, filename) => {
    if (canShareBlob(blob)) {
        const data = {
            files: [blobToFile(blob, filename)]
        };
        await navigator.share(data);
    }
}