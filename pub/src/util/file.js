

export const saveFile = async (url, filename) => {
    return new Promise((resolve) => {
        const a = document.createElement('a');
        document.body.appendChild(a);
        a.href = url;
        a.download = filename;
        a.click();
        setTimeout(() => {
            window.URL.revokeObjectURL(url);
            document.body.removeChild(a);
            resolve();
        }, 0)
    });
}