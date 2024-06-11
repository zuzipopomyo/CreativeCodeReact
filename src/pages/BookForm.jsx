import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { db, storage } from "../assets/firebase";
import useFireStore from "../hooks/useFireStore";
import { AuthContext } from "../Contexts/AuthContext";
import useTheme from "../hooks/useTheme";

const BookForm = () => {
  let { id } = useParams();
  let [title, setTitle] = useState("");
  let [description, setDescription] = useState("");
  let [newCategory, setNewCategory] = useState("");
  let [categories, setCategories] = useState([]);
  let [isEdit, setIsEdit] = useState(false);
  let [file, setFile] = useState('');
  let [preview, setPreview] = useState("");

  let { addCollection, updateDocument } = useFireStore();
  let { user } = useContext(AuthContext);
  let navigate = useNavigate();
  let { isDark } = useTheme();

  useEffect(() => {
    if (id) {
      setIsEdit(true);
      let ref = doc(db, 'books', id);
      getDoc(ref).then(doc => {
        if (doc.exists()) {
          let { title, description, categories } = doc.data();
          setTitle(title);
          setDescription(description);
          setCategories(categories);
        }
      }).catch(error => {
        console.error("Error fetching document:", error);
      });
    } else {
      setIsEdit(false);
      setTitle('');
      setDescription('');
      setCategories([]);
    }
  }, [id]);

  const addCategory = () => {
    if (newCategory && !categories.includes(newCategory)) {
      setCategories((prev) => [newCategory, ...prev]);
      setNewCategory("");
    }
  };

  const handlePhotoChange = (e) => {
    const selectedFile = e.target.files[0];
    console.log("Selected file:", selectedFile); // Debugging statement
    setFile(selectedFile); // Correctly update the file state
  };

  useEffect(() => {
    if (file) {
      let reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        setPreview(reader.result);
      };
    }
  }, [file]);

  const uploadToFirebase = async (file) => {
    if (!user) {
      throw new Error('User not authenticated');
    }

    let uniqueFileName = Date.now().toString() + '_' + file.name;
    let path = `covers/${user.uid}/${uniqueFileName}`;
    let storageRef = ref(storage, path);

    await uploadBytes(storageRef, file);
    return await getDownloadURL(storageRef);
  };

  const addBook = async (e) => {
    e.preventDefault();
    if (!file) {
      console.error('No file selected');
      return;
    }

    try {
      let url = await uploadToFirebase(file);
      let data = {
        title,
        description,
        categories,
        uid: user.uid,
        cover: url
      };

      if (isEdit) {
        await updateDocument('books', id, data);
      } else {
        await addCollection('books', data);
      }

      navigate('/');
    } catch (error) {
      // console.error('Error adding book:', error);
    }
  };

  return (
    <div className="h-screen">
      <form className="w-full max-w-lg mx-auto my-5" onSubmit={addBook}>
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full px-3">
            <label
              className={`block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 ${isDark ? "text-white" : ""}`}
              htmlFor="grid-title"
            >
              Book Title
            </label>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="grid-title"
              type="text"
              placeholder="Book title"
            />
            <p className="text-gray-600 text-xs italic">
              Make it as long and as crazy as you'd like
            </p>
          </div>
        </div>

        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full px-3">
            <label
              className={`block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 ${isDark ? "text-white" : ""}`}
              htmlFor="grid-description"
            >
              Book Description
            </label>
            <input
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="grid-description"
              type="text"
              placeholder="Book Description"
            />
            <p className="text-gray-600 text-xs italic">
              Make it as long and as crazy as you'd like
            </p>
          </div>
        </div>

        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full px-3">
            <label
              className={`block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 ${isDark ? "text-white" : ""}`}
              htmlFor="grid-category"
            >
              Categories
            </label>
            <div className="flex justify-center items-center space-x-2">
              <input
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value)}
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="grid-category"
                type="text"
                placeholder="Categories"
              />
              <button
                type="button"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                onClick={addCategory}
              >
                Add
              </button>
            </div>
            <ul className="flex space-x-2">
              {categories.map((item) => (
                <li key={item} className="bg-gray-200 p-2 rounded">
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full px-3">
            <label
              className={`block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 ${isDark ? "text-white" : ""}`}
              htmlFor="grid-photo"
            >
              Book Cover
            </label>
            <input
              onChange={handlePhotoChange}
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="grid-photo"
              type="file"
            />
            {preview && <img src={preview} className="w-full h-40 object-cover" alt="Book Cover Preview"/>}
          </div>
        </div>

        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full px-3">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              {isEdit ? "Update Book" : "Add Book"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default BookForm;
