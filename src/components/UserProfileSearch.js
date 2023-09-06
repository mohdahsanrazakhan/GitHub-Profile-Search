import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { GoOrganization, GoPeople, GoPersonAdd, GoRepo, GoLink, GoLocation, GoMail, GoBrowser, GoMention } from 'react-icons/go';
import './UserProfileSearch.css';

const UserProfileSearch = () => {
  const [username, setUsername] = useState(localStorage.getItem('previousSearch') || '');
  const [userProfile, setUserProfile] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');

  const fetchUserProfile = async () => {
    try {
      const response = await axios.get(`https://api.github.com/users/${username}`);
      setUserProfile(response.data);
    }
    catch (error) {
      console.error('Error fetching user profile:', error);
      setUserProfile(null);
      setErrorMessage('User not found. Please check the username.');
    }
  };

  const convertURL = inputURL => {
    // Extracting username and tabname using regEx
    const regex = /\/users\/([a-zA-Z]+)\/([a-zA-Z]+)(?:{\/[a-zA-Z_]+})?/;
    const match = inputURL.match(regex);

    if (match) {
      const username = match[1];
      let tabname = match[2];

      if (tabname === 'repos') {
        tabname = 'repositories';
      }
      else {
        tabname = match[2];
      }

      // Construct the desired output URL
      window.location.href = `https://github.com/${username}?tab=${tabname}`;
    }
    else {
      alert('Invalid input URL');
    }
  }

  useEffect(() => {
    // Store the username in localStorage whenever it changes
    localStorage.setItem('previousSearch', username);
  }, [username]); // This effect runs whenever username changes


  const [darkModeToggle, setDarkModeToggle] = useState(false);
  return (
    <>
      <label class="toggleDarkBtn">
        <input type="checkbox" onClick={() => setDarkModeToggle(!darkModeToggle)} />
        <span class="slideBtnTg round">Toggle Mode</span>
      </label>

      <div className='search-bar flex justify-center items-center gap-[10px] m-[20px]'>
        <div className='search flex justify-start items-center gap-[5px] bg-transparent border-[2px] border-[#d0d7de] rounded p-[10px] w-[300px] focus-within:bg-[#ffffff] focus-within:border-[#0969DA]'>
          <GoMention />
          <input
            type='text'
            placeholder='Enter GitHub username'
            className='search-input bg-transparent outline-none w-[100%]'
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>

        <button className='text-[#ffffff] py-[11px] px-[20px] rounded font-inharit bg-gradient-to-b from-[#9d62f3] to-[#644ad1] hover:bg-gradient-to-t' onClick={fetchUserProfile}>Search</button>
      </div>


      {userProfile ? (<section className={`flex justify-center items-center min-h-[80vh] my-0 mx-[1rem] text-[#000000] dark:text-[#ffffff] ${darkModeToggle && "dark"}`}>
        {userProfile && (
          <div div className='card-section flex justify-center items-center gap-[20px]'>
            <div className={`user-info-container relative bg-[#ffffff] dark:bg-slate-700 text-[#000000] dark:text-[#ffffff] border-[1px] border-[#d0d7de] rounded-tr-[10px] rounded-br-[10px] rounded-bl-[10px] p-[30px] max-w-[550px] flex flex-col justify-start items-start gap-[15px] ${darkModeToggle && "dark"}`}>
              <span className={`user-type absolute top-[-38px] left-[-1px] bg-[#ffffff] dark:bg-slate-700 px-[15px] py-[5px] border-[1px] border-[#d0d7de] border-b-0 rounded-tl-[10px] rounded-tr-[10px] font-semibold text-[18px]`}>{userProfile.type}</span>
              <small className='user-created absolute top-[7px] right-[12px] text-[11px]'>Created at: {userProfile.created_at.slice(0, 10)}</small>
              <div className='user-info flex justify-start items-center gap-[15px]'>
                <img className='w-[100px] h-[100px] rounded-full border-[5px] border-[#dddede] dark:border-slate-400' src={userProfile.avatar_url} alt="avatar profile" />
                <div className='user-name'>
                  <h2 className='user-h2-tag'>{userProfile.name}</h2>
                  <div className='user-additional'>
                    <a href={userProfile.html_url} target='__blank' className='user-login user-p-tag'><GoMention />{userProfile.login} <GoBrowser className='user-browser' /></a>
                  </div>
                </div>
              </div>
              <p className='user-p-tag'>{userProfile.bio !== null ? (<p>{userProfile.bio}</p>) : 'Bio not mentioned'}</p>
              <div className='user-additional-container'>
                <div className='user-additional'>
                  <GoOrganization />
                  <p>{userProfile.company !== null ? (<p>{userProfile.company}</p>) : 'Not Mentioned'}</p>
                </div>
                <div className="user-additional">
                  <GoLocation />
                  <p>{userProfile.location !== null ? (<p>{userProfile.location}</p>) : 'Not Mentioned'}</p>
                </div>
                <div className="user-additional">
                  <GoLink />
                  <p>{userProfile.blog !== '' ? (<a href={userProfile.blog} target='__blank'>{userProfile.blog.replace(/https?:\/\//, '')}</a>) : ('Not Mentioned')}</p>
                </div>
                <div className="user-additional">
                  <GoMail />
                  <p>{userProfile.email !== null ? (<p>{userProfile.email}</p>) : ('Not Mentioned')}</p>
                </div>

              </div>
            </div>
            <div className='user-cells-container flex flex-col justify-between gap-[22px]'>
              {/* Repo */}
              {/* display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 15px;
  background-color: var(--white-color);
  padding: 10px;
  border-radius: 10px;
  border: 1px solid var(--border-color);
  width: 200px;
  text-decoration: none;
  color: inherit;
  cursor: pointer; */}
              <buttion onClick={() => convertURL(userProfile.repos_url)} target='__blank' className='user-cell flex justify-start items-center gap-[15px] bg-[#ffffff] dark:bg-slate-700 p-[10px] rounded-[10px] border-[1px] border-[d0d7de] w-[200px] text-[#000000] dark:text-[#ffffff]'>
                <div className='cell-icons'>
                  <GoRepo />
                </div>
                <div className='user-cell-titles'>
                  <h3>{userProfile.public_repos}</h3>
                  <p className='user-p-tag'>Repositories</p>
                </div>
              </buttion>
              {/* Followers */}
              <buttion onClick={() => convertURL(userProfile.followers_url)} target='__blank' className='user-cell flex justify-start items-center gap-[15px] bg-[#ffffff] dark:bg-slate-700 p-[10px] rounded-[10px] border-[1px] border-[d0d7de] w-[200px] text-[#000000] dark:text-[#ffffff]'>
                <div className='cell-icons'>
                  <GoPeople />
                </div>
                <div className='user-cell-titles'>
                  <h3>{userProfile.followers}</h3>
                  <p className='user-p-tag'>Followers</p>
                </div>
              </buttion>
              {/* Following */}
              <buttion onClick={() => convertURL(userProfile.following_url)} target='__blank' className='user-cell flex justify-start items-center gap-[15px] bg-[#ffffff] dark:bg-slate-700 p-[10px] rounded-[10px] border-[1px] border-[d0d7de] w-[200px] text-[#000000] dark:text-[#ffffff]'>
                <div className='cell-icons'>
                  <GoPersonAdd />
                </div>
                <div className='user-cell-titles'>
                  <h3>{userProfile.following}</h3>
                  <p className='user-p-tag'>Following</p>
                </div>
              </buttion>

            </div>
          </div>
        )}
      </section >) : (
        <p className='warning'>{errorMessage || 'Find GitHub Profiles'}</p>)
      }
    </>
  );
};

export default UserProfileSearch