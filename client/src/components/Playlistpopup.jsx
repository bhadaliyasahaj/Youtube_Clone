import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import axiosInstance from '../utils/axiosInstance.js';
import { useLocation } from 'react-router-dom';

const PlaylistPopup = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #00000037;
  z-index: 1000;
`;

const CenterBox = styled.div`
position: relative;
  width: 30%;
  padding: 50px 20px;
  /* height: 40%; */
  background-color: ${({ theme }) => theme.soft};
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
`;

const Title = styled.h2`
  margin-bottom: 20px;
  color: ${({ theme }) => theme.text};
`;

const PlaylistList = styled.ul`
  list-style: none;
  padding: 0;
  margin-bottom: 20px;
  overflow-y: auto;
  max-height: 50%;
`;

const PlaylistItem = styled.li`
  padding: 10px;
  margin-bottom: 10px;
  background-color: ${({ theme, active }) => active ? "#3a9a3d" : theme.bg};
  color: ${({ theme }) => theme.text};
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: ${({ theme }) => theme.hover};
  }
`;

const CreatePlaylistInput = styled.input`
  padding: 10px;
  border: none;
  border-radius: 5px;
  margin-bottom: 10px;
  background-color: ${({ theme }) => theme.bg};
  color: ${({ theme }) => theme.text};
`;

const Button = styled.button`
  padding: 10px;
  background-color: ${({ theme }) => theme.bg};
  color: ${({ theme }) => theme.text};
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: ${({ theme }) => theme.primaryHover};
  }
`;

const Close = styled.button`
width: fit-content;
cursor: pointer;
position: absolute;
top: 20px;
font-size:20px;
right: 20px;
background-color: transparent;
color: ${({ theme }) => theme.text};
border: none;
`

function Playlistpopup({ setSave,setResp,setVisible,vidId }) {
    const [playlists, setPlaylists] = useState([]);
    const [newPlaylist, setNewPlaylist] = useState('');
    const [active, setActive] = useState([]);
    

    useEffect(() => {
        const getPlaylists = async () => {
            try {
                const res = await axiosInstance.get("/playlist/get")
                console.log(res.data);
                setPlaylists(res.data.playlists);
            } catch (err) {
                console.log(err);
            }

        }
        getPlaylists()
    }, [newPlaylist])

    const handleCreatePlaylist = async () => {
        try {
            if (active.length > 0) {
                const res = await axiosInstance.put(`/playlist/add/${vidId}`, active)
                console.log(res);
                setResp("Playlist Updated")
                setVisible(true)
                setSave(false)
            } else {
                const res = await axiosInstance.post("/playlist/create", { name: newPlaylist })
                console.log(res);
                // setPlaylists([...playlists,{name:newPlaylist}])
                setNewPlaylist('')
                setResp("Playlist Created")
                setVisible(true)
            }
        } catch (err) {
            console.log(err);
        }
    };

    const handleSelection = async (playlistId) => {
        if (active.includes(playlistId)) {
            setActive(active.filter((id) => id !== playlistId))
        } else {
            setActive([...active, playlistId])
        }
    }

    return (
        <PlaylistPopup>
            <CenterBox>
                <Close onClick={() => setSave(false)}>X</Close>
                <Title>Select or Create Playlist</Title>
                <PlaylistList>

                    {playlists.length>0 && playlists.map((playlist, index) => (
                        <PlaylistItem key={index} onClick={() => handleSelection(playlist._id)} active={active.includes(playlist._id)}>{playlist.name}</PlaylistItem>
                    ))}
                </PlaylistList>
                <CreatePlaylistInput
                    type="text"
                    placeholder="Create new playlist"
                    value={newPlaylist}
                    onChange={(e) => setNewPlaylist(e.target.value)}
                    onFocus={()=>setActive([])}
                />
                <Button onClick={handleCreatePlaylist}>{active.length > 0 ? "Add To Playlist" : "Create Playlist"}</Button>
            </CenterBox>
        </PlaylistPopup>
    );
}

export default Playlistpopup;
