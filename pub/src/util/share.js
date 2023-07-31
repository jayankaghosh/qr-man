
export const canShare = () => {
    return typeof window.navigator.share === 'function' && window.navigator.canShare();
}

export const shareBlob = async (blob, filename) => {
    if (canShare()) {
        if (!blob instanceof Blob) {
            throw 'Invalid blob';
        }
        let extension = blob.type.split('/')[1]
        if (!extension) {
            extension = '';
        }
        const file = new File([blob], `${filename}.${extension}`, {type: blob.type});
        await navigator.share({
            files: [file]
        });
    }
}