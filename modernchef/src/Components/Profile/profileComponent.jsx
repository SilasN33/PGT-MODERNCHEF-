import React, { useEffect, useState } from 'react';
import { useAuth, logout } from '../../firebase';
import { storage } from '../../firebase'; // Importando o storage
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { updateProfile } from 'firebase/auth';
import styled from 'styled-components';
import AddItem from '../AddItem';
import DeleteItem from '../DeleteItem';
import GetItem from '../GetItem'; // Importando o componente GetItem
import './profileComponent.css';

const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    background-color: #f8f9fa;
`;

const Card = styled.div`
    background: #fff;
    border-radius: 10px;
    padding: 20px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    max-width: 1000px;
    display: flex;
    font-family: 'Sora', sans-serif;
`;

const ProfileSection = styled.div`
    flex: 1;
    border-right: 1px solid #eaeaea;
    padding-right: 20px;
    text-align: center;
`;

const DetailsSection = styled.div`
    flex: 2;
    padding-left: 20px;
`;

const ProfileImage = styled.img`
    height: 150px;
    width: 150px;
    border-radius: 50%;
    object-fit: cover;
`;

const ProfileInfo = styled.div`
    margin-top: 20px;
    text-align: center;
`;

const ProfileName = styled.h1`
    font-size: 1.8rem;
    margin: 0;
    color: #333;
`;

const ProfileEmail = styled.p`
    font-size: 1rem;
    color: #666;
    margin: 5px 0;
`;

const ProfileStatus = styled.p`
    font-size: 1rem;
    color: #666;
    margin: 5px 0;
`;

const Button = styled.button`
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    font-size: 1rem;
    cursor: pointer;
    margin: 5px;

    &:hover {
        opacity: 0.8;
    }
`;

const UploadButton = styled(Button)`
    background-color: #ff7f50;

    margin-top:20px;

    &:hover {
        background-color: #e06666;
    }
`;

const LogoutButton = styled(Button)`
    background-color: #dc3545;

    &:hover {
        background-color: #c82333;
    }
`;

const CrudButtons = styled.div`
    display: flex;
    justify-content: space-around;
    margin-top: 20px;
`;

const RecipeButton = styled(Button)`
    background-color: #ff7f50;

    &:hover {
        background-color: #e06666;
    }
`;

const UploadSection = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 10px;
`;

function ProfilePage() {
    const { user } = useAuth();
    const [userData, setUserData] = useState(null);
    const [view, setView] = useState('');
    const [image, setImage] = useState(null);
    const [url, setUrl] = useState("");

    useEffect(() => {
        if (user) {
            setUserData({
                name: user.displayName,
                email: user.email,
                photoURL: user.photoURL,
            });
        }
    }, [user]);

    const handleImageChange = (e) => {
        if (e.target.files[0]) {
            setImage(e.target.files[0]);
        }
    };

    const handleUpload = () => {
        if (image && user) {
            const imageRef = ref(storage, `profileImages/${user.uid}/${image.name}`);
            uploadBytes(imageRef, image).then((snapshot) => {
                getDownloadURL(snapshot.ref).then((url) => {
                    setUrl(url);
                    updateProfile(user, { photoURL: url }).then(() => {
                        setUserData({
                            ...userData,
                            photoURL: url,
                        });
                        console.log('Profile updated successfully!');
                    }).catch((error) => {
                    });
                });
            });
        }
    };

    const handleLogout = async () => {
        try {
            await logout(); // Certifique-se de que `logout` é exportado corretamente de 'firebase.js'
        } catch (error) {
            console.error('Error logging out:', error);
        }
    };

    return (
        <Container>
            <Card>
                {userData ? (
                    <>
                        <ProfileSection>
                            <ProfileImage src={userData.photoURL} alt="Profile" />
                            <ProfileInfo>
                                <ProfileName>{userData.name}</ProfileName>
                                <ProfileEmail>{userData.email}</ProfileEmail>
                                <ProfileStatus>Status: Adoro a culinária japonesa</ProfileStatus>
                                <ProfileStatus>Social: +11 1929-1920</ProfileStatus>
                                <ProfileStatus>País: Brasil</ProfileStatus>
                                <UploadSection>
                            </UploadSection>
                            <input type="file" onChange={handleImageChange} />
                            <UploadButton onClick={handleUpload} className="botao-upload"> Upload</UploadButton>
                            <LogoutButton onClick={handleLogout}>Logout</LogoutButton>
                            </ProfileInfo>
                            
                        </ProfileSection>
                        <DetailsSection>
                            <h2>Receitas:</h2>
                            <CrudButtons>
                                <RecipeButton onClick={() => setView('ADD')}>Criar Receita</RecipeButton>
                                <RecipeButton onClick={() => setView('VIEW')}>Consultar Receitas</RecipeButton>
                                <RecipeButton onClick={() => setView('DELETE')}>Remover Receita</RecipeButton>
                            </CrudButtons>
                            {view === 'ADD' && <AddItem />}
                            {view === 'VIEW' && <GetItem />}
                            {view === 'DELETE' && <DeleteItem />}
                        </DetailsSection>
                    </>
                ) : (
                    <div className="text-center">Loading...</div>
                )}
            </Card>
        </Container>
    );
}

export default ProfilePage;