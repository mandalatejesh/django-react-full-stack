import '../styles/header.css'
import { profilePicture } from '../api/getProfilePicture';
import { getUsername } from '../api/getUser';
import { useEffect } from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Profile = ({email}) => {
    const [imageUrl, setImageUrl] = useState("");
    const [username, setUsername] = useState("");
    const navigate = useNavigate();
    useEffect(() => {
        const fetchProfilePicture = async () => {
          try {
            const imageBlob = await profilePicture({"email": email});
            const imageUrl = URL.createObjectURL(imageBlob);
            setImageUrl(imageUrl);
          } catch (error) {
            console.error("Error fetching profile picture:", error);
          }
        };

        const fetchUsername = async () => {
            try{
                const name = await getUsername({"email": email});
                setUsername(name);
            } catch (error){
                console.error("Error fetching username: ", error);
                navigate('/login');
            }
        }
    
        fetchProfilePicture();
        fetchUsername();
      }, [email]);
    return <div className="user-profile">
      <img src={imageUrl} alt="User profile" />
      <span>{username}</span>
    </div>
};

export default Profile;