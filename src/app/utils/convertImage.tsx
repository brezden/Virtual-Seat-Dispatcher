export async function convertBase64ToBlobURL(base64Image: string) {
    const blob = await (await fetch(base64Image)).blob();
    return URL.createObjectURL(blob);
}