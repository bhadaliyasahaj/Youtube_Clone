import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Comment from "./Comment";
import axios from "axios";
import { useSelector } from "react-redux";
import { Button } from "@mui/material";

const Container = styled.div``;

const NewComment = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;



const Avatar = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
`;

const Input = styled.input`
  border: none;
  border-bottom: 1px solid ${({ theme }) => theme.soft};
  color: ${({ theme }) => theme.text};
  background-color: transparent;
  outline: none;
  padding: 5px;
  width: 80%;
`;

const Notice = styled.h2`
  color: ${({theme})=> theme.text};
`

const Comments = ({videoId}) => {
  const [comments,setComments] = useState([]);
  const {currentUser} = useSelector(state=>state.user)
  const [focus,setFocus] = useState(false)
  const [newcomm,setNewComm] = useState("")

  const handleButton = ()=>{
    setFocus(true)
  }

  const handlePostButton = async ()=>{
    console.log("hello");
    const res = await axios.post("/comments/",{desc:newcomm,videoID:videoId})
    setNewComm("")
    setComments((prev)=>[...prev,res.data])
    console.log(comments);
    setFocus(false)
  }

  const handleDeletedComment = (commentId)=>{
    setComments(comments.filter((comment)=>comment._id !== commentId))
  }


  useEffect(()=>{
    const fetchComments = async ()=>{
      try {
        const res = await axios.get(`/comments/${videoId}`);
        setComments(res.data)
      } catch (error) {
        console.log(error);
      }
    }
    fetchComments()
  },[videoId])

  return (
    <Container>
      {currentUser ? <NewComment>
        <Avatar src={currentUser.img} />
        <Input placeholder="Add a comment..." value={newcomm} onFocus={handleButton} onChange={(e)=>setNewComm(e.target.value)}/>
        {focus && <Button onClick={handlePostButton}>POST</Button>}
      </NewComment> : (<Notice>Sign In To Comment, Like And Subscribe</Notice>)}
      {(comments != [])? (
        comments.map((comment)=>(
          <Comment key={comment._id} comment={comment} onDelete={handleDeletedComment}/>
        ))) : (<h2>Loading</h2>)
      }
    </Container>
  );
};

export default Comments;
