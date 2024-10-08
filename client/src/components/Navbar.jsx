import React, { useState } from "react";
import styled from "styled-components";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchRounded.js";
import VideoCallOutlinedIcon from "@mui/icons-material/VideoCallOutlined";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/userSlice";
import Person from "@mui/icons-material/Person4";
import axiosInstance from "../utils/axiosInstance.js";
import nProgress from "nprogress";

// import { Avatar } from "@mui/material";

const Container = styled.div`
  position: sticky;
  top: 0;
  background-color: ${({ theme }) => theme.bgLighter};
  height: 50px;
  z-index: 10;
  width: 100%;
`;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  height: 100%;
  padding: 0px 20px;
  position: relative;
`;

const Search = styled.div`
  width: 40%;
  position: absolute;
  left: 0px;
  right: 0px;
  margin: auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 5px;
  border: 1px solid #ccc;
  border-radius: 3px;

  @media (max-width: 768px) {
    right: auto;
    left: 10%;
  }
`;

const Input = styled.input`
  border: none;
  width: 93%;
  height: 100%;
  background-color: transparent;
  outline: none;
  color: ${({ theme }) => theme.text};
  border-right:1px solid gray;  
`;

const Button = styled.button`
  padding: 5px 15px;
  background-color: transparent;
  border: 1px solid #3ea6ff;
  color: #3ea6ff;
  border-radius: 3px;
  font-weight: 500;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 5px;
`;

const User = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  font-weight: 500;
  color: ${({ theme }) => theme.text};
`;

// const Avatar = styled.img`
//   width: 32px;
//   height: 32px;
//   border-radius: 50%;
//   background-color: #999;
//   cursor: pointer;
// `;

const Cuser = styled.img`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background-color: #999;
  cursor: pointer;
`;

const Name = styled.text`
  cursor: pointer;
  @media (max-width:768px) {
    display: none;
  }
`;

const Dropdown = styled.div`
  position: absolute;
  top: 55px;
  right: 5px;
  background-color: ${({ theme }) => theme.bgLighter};
  border: 1px solid ${({ theme }) => theme.soft};
  box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.1);
  border-radius: 5px;
  overflow: hidden;
  z-index: 10;
`;

const DropdownItem = styled.div`
  padding: 10px 20px;
  color: ${({ theme }) => theme.text};
  cursor: pointer;
  &:hover {
    background-color: ${({ theme }) => theme.soft};
  }
`;

const Navbar = () => {
  const navigate = useNavigate();
  const { currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [q, setQ] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleAvatarClick = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleLogout = async () => {
    nProgress.start()
    try {
      // Implement logout logic here
      await axiosInstance.post(`/users/logout/${currentUser._id}`).then((res) => {
        console.log(res.data);
        dispatch(logout());
      });
      setDropdownOpen(false);
      navigate("/");
    } catch (err) {
      console.log(err);
    }
    finally {
      nProgress.done()
    }
  };

  const handleVideoButton = () => {
    navigate("/upload")
  };

  return (
    <>
      <Container>
        <Wrapper>
          <Search>
            <Input
              placeholder="Search Title..."
              value={q}
              onChange={(e) => setQ(e.target.value)}
              onKeyDown={(e)=>{e.key==="Enter"&&navigate(`/search/?q=${q}`);}}
            />
            <SearchOutlinedIcon
              onClick={() => {
                navigate(`/search/?q=${q}`);
              }}
              style={{color:"red",margin:"0 0px 0 10px"}}
            />
          </Search>
          {currentUser ? (
            <User>
              <VideoCallOutlinedIcon
                onClick={handleVideoButton}
                style={{ cursor: "pointer", fontSize: "35px" }}
              />
              {currentUser.img ? (
                <Cuser src={currentUser.img} onClick={handleAvatarClick} />
              ) : (
                <Person
                  onClick={handleAvatarClick}
                  style={{
                    width: "32px",
                    height: "32px",
                    borderRadius: "50%",
                    border: "1px solid #999",
                    cursor: "pointer",
                  }}
                />
              )}
              {dropdownOpen && (
                <Dropdown>
                  <DropdownItem
                    onClick={() => {
                      navigate("/profile");
                      setDropdownOpen(false);
                    }}
                  >
                    Profile
                  </DropdownItem>
                  <DropdownItem onClick={handleLogout}>Logout</DropdownItem>
                </Dropdown>
              )}
              <Name onClick={handleAvatarClick}>
                {currentUser.name.split(" ")[0]}
              </Name>
            </User>
          ) : (
            <Link to="signin" style={{ textDecoration: "none" }}>
              <Button>
                <AccountCircleOutlinedIcon />
                SIGN IN
              </Button>
            </Link>
          )}
        </Wrapper>
      </Container>
    </>
  );
};

export default Navbar;
