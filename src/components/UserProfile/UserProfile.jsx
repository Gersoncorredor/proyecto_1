import { useEffect, useState } from "react";
import { UserRoundPen } from "lucide-react";

const UseProfile = () => {
  const [imagePreview, setImagePreview] = useState(null);

  useEffect(() => {
    const foto = localStorage.getItem("foto");
    setImagePreview(`/Avatares/id1.jpg`);
  }, []);
  return (
    <>
      {imagePreview ? (
        <img src={imagePreview} alt="Preview" />
      ) : (
        <UserRoundPen size={100} />
      )}
    </>
  );
};

export default UseProfile;
