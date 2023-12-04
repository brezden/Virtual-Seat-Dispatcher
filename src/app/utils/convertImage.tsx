export async function convertBase64ToBlob(base64: string): Promise<Buffer> {
  const dataPart = base64.split(",")[1];
  if (!dataPart) {
    throw new Error("Invalid base64 data");
  }
  try {
    const buffer = Buffer.from(dataPart, "base64");
    return buffer;
  } catch (error) {
    console.error("Error in convertBase64ToBlob:", error);
    throw error;
  }
}
