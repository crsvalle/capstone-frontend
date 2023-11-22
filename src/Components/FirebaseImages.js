import { storage } from "./firebase";
import { ref, listAll, getDownloadURL } from "firebase/storage";

export function FirebaseImages (path) {
  const images = [];
  const imgListRef = ref(storage, `${path}/`);
  
  listAll(imgListRef).then((res) => res.items.forEach(item => {
    getDownloadURL(item).then(url => images.push(url));
  }));

  return images;
}
