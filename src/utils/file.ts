import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "./firebaseConfig";

/**
 * Uploads a file to a specified folder in Firebase Storage.
 * @param file - The file (Blob or File) to upload.
 * @param folderPath - The folder path in Firebase Storage.
 * @param fileName - The name for the uploaded file.
 * @returns The download URL of the uploaded file.
 */
export async function uploadFileToFirebaseFolder(
  file: Blob | File,
  folderPath: string,
  fileName: string
): Promise<string> {
  // console.log(
  //   "Uploading file:",
  //   file,
  //   "to folder:",
  //   folderPath,
  //   "with name:",
  //   fileName
  // );
  // return "";
  if (!file) {
    return "";
  }
  if (!file || !folderPath || !fileName) {
    throw new Error("File, folderPath, and fileName are required parameters.");
  }
  if (!storage) {
    throw new Error(
      "Firebase storage instance is undefined. Check your firebaseConfig import."
    );
  }
  try {
    const storageRef = ref(storage, `${folderPath}/${fileName}_${Date.now()}`);
    await uploadBytes(storageRef, file);
    return await getDownloadURL(storageRef);
  } catch (error) {
    console.error("Upload error", error);
    throw error;
  }
  return "";
}
