import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Navbar from './frontend/pages/navbar/navbar';
import Login from './frontend/pages/login/login';
import Signup from './frontend/pages/signup/signup';
import Fileupload from './frontend/pages/fileupload/upload';
import Myfiles from './frontend/pages/myfiles/myfile';
import Removefiles from './frontend/pages/removefiles/remove';
import Profile from './frontend/pages/profileshown/profile';
import Mailverify from './frontend/pages/emailverify/mailverify';
import Compress from './frontend/pages/compress/comp';
import Encryptfile from './frontend/pages/encrypt/encry';
import HashFile from './frontend/pages/fverify/fveri';
import Report from './frontend/pages/report/reportdata';
import Freqext from './frontend/pages/fextract/freqex';
import Simupload from './frontend/pages/supload/simup';
import Sidebar2 from './frontend/pages/sidebar2/sidebar2';
import Original from './frontend/pages/originality/original';
import Origiverify from './frontend/pages/originality/oriveri';
import Sideshow from './frontend/pages/sideshow/sshow';
import Download from './frontend/pages/decrypt/dec';
import Share from './frontend/pages/share/fshare';
import Chat from './frontend/pages/chat/chatapi';


const App = () => {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Navbar />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/mailverify' element={<Mailverify />} />
        <Route path='/removefiles' element={<Removefiles />} />
        <Route path='/fileupload' element={<Fileupload />} />
        <Route path='/encrfile' element={<Encryptfile />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/myfiles' element={<Myfiles />} />
        <Route path='/original' element={<Original />} />
        <Route path='/compfiles' element={<Compress />} />
        <Route path='/fverify' element={<HashFile />} />
        <Route path='/rdata' element={<Report />} />
        <Route path="/vpage" element={<Origiverify />} />
        <Route path='/fext' element={<Freqext />} />
        <Route path='/supload' element={<Simupload />} />
        <Route path='/side2' element={<Sidebar2 />} />
        <Route path='/show' element={<Sideshow/>}/>
        <Route path='/download' element={<Download/>}/>
        <Route path='/sfile' element={<Share/>}/>
        <Route path='/chatapi' element={<Chat/>}/>

      </Routes>
    </Router>
  )
}

export default App;