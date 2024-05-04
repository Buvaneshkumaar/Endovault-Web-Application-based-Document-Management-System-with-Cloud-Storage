import React, { useState } from 'react';
import './side2.css';
import { ImFolderUpload } from 'react-icons/im';
import { PiFilesFill } from 'react-icons/pi';
import { ImDownload3 } from 'react-icons/im';
import { TbLogout2 } from 'react-icons/tb';
import { CgProfile } from 'react-icons/cg';
import { FaBars } from 'react-icons/fa';
import { AiOutlineCompress } from 'react-icons/ai';
import { AiOutlineLock } from 'react-icons/ai';
import { AiFillCheckCircle } from 'react-icons/ai';
import { AiOutlineSafety } from 'react-icons/ai';
import { AiOutlineTool } from 'react-icons/ai';
import { NavLink } from 'react-router-dom';
import FileUpload from '../fileupload/upload';
import UserDetails from '../profileshown/profile';
import { AiOutlineDelete } from 'react-icons/ai';
import { AiOutlineCheck } from 'react-icons/ai';
import {AiOutlineFilePdf } from 'react-icons/ai';
import { MdShare } from 'react-icons/md';
import { FaDownload } from 'react-icons/fa';
import Encrypt from '../encrypt/encry';

const Sidebar2 = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showFileUpload, setShowFileUpload] = useState(false);
  const [showUserDetails, setShowUserDetails] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  const menuItems = [
 {
      path: '/compfiles',
      name: 'Compress',
      icon: <AiOutlineCompress />,

    },
    {
      path: '/fverify',
      name: 'HashFile',
      icon: < AiOutlineSafety />,
    },
    {
      path: '/fext',
      name: 'Frequency Extract',
      icon: <AiOutlineTool />,

    },
    {
      path: '/encrfile',
      name: 'Hybrid Encryption',
      icon: <AiOutlineLock />,
      // component: <Encrypt/>,
    },
    {
      path: '/supload',
      name: 'Simple Upload',
      icon: <ImFolderUpload />,

    },

    {
      path: '/fileupload',
      name: 'Eupload Files',
      icon: <ImFolderUpload />,
      component: <FileUpload />, // Add the FileUpload component here
    },
    {
      path: '/myfiles',
      name: 'My Files',
      icon: <PiFilesFill />,
    },
    {
      path: '/download',
      name: 'Download',
      icon: < FaDownload/>,
    },

    {
      path: '/removefiles',
      name: 'Remove Files',
      icon: < AiOutlineDelete />,
    },
    {
      path: '/sfile',
      name: 'Share Files',
      icon: < MdShare />,
    },
    // {
    //   path: '/profile',
    //   name: 'My Profile',
    //   icon: <CgProfile />,
    // },
    {
      path:'/original',
      name:'Verify Original',
      icon:<AiOutlineCheck />,
    },
    {
      path:'/rdata',
      name:'Report',
      icon:< AiOutlineFilePdf />,
    },
    {
      path: '/',
      name: 'Logout',
      icon: <TbLogout2 />,
    },
    
  ];

  const handleItemClick = (index) => {
    if (index === 0) {
      setShowFileUpload(true);
    } else {
      setShowFileUpload(false);
    }
  };

  const handleCloseUserDetails = () => {
    setShowUserDetails(false);
  };

  return (


    <div className={`container ${isOpen ? 'open' : ''}`}>
      <div className={`sidebar ${isOpen ? 'open' : ''}`}>
        <div className='top_section'>
          <h1 style={{ display: isOpen ? 'block' : 'none' }} className='logo'>
            Encryovault
          </h1>
          

          <div style={{ marginLeft: isOpen ? '50px' : '0px' }} className='bars'>
            <FaBars onClick={toggle} />
          </div>
        </div>
        {menuItems.map((item, index) => (
          <div key={index} className='link'>
            <NavLink
              to={item.path}
              onClick={() => handleItemClick(index)}
              className='link'
              activeClassName='active'
            >
              <div className='icon'>{item.icon}</div>
              <div style={{ display: isOpen ? 'block' : 'none' }} className='link_text'>
                {item.name}
              </div>
            </NavLink>
            {showFileUpload && index === 0 && (
              <div className='fileUploadContainer'>{item.component}</div>
            )}
          </div>
        ))}
      
      </div>
     



    </div>
   
      
   


  );
};

export default Sidebar2;