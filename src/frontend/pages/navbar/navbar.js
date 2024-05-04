import './navbarcss.css';
import {useState} from 'react';
import React from 'react';
import { Link } from 'react-router-dom';
import { BsCloudCheckFill } from 'react-icons/bs';
import {MdSecurity} from 'react-icons/md';
import {TbLockAccess} from 'react-icons/tb';
import {SiEasyeda} from 'react-icons/si';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faPhone } from '@fortawesome/free-solid-svg-icons';
import { faWhatsapp, faInstagram } from '@fortawesome/free-brands-svg-icons';
// import image from '../images/img.png';

const Navbar = () => {
    const[modal,setModal]=useState(false);
    const [filemanagemodal,setFilemanageModal]=useState(false);
    const [keywordsearchmodal,setKeywordsearchModal]=useState(false);
    const[docverimodal,setDocverimodal]=useState(false);
    const[docrankmodal,setDocrankmodal]=useState(false);
    const[doccompmodal,setDoccompmodal]=useState(false);
    const[docsecmodal,setDocsecmodal]=useState(false);
    const[cloudmodal,setCloudmodal]=useState(false);
    const[downmodal,setDownmodal]=useState(false);
    const toggleModal = () => {
        setModal(!modal);
    };

    const toggleFilemanageModal = () => {
        setFilemanageModal(!filemanagemodal);
    };
    const togglekeysearchModal = () => {
        setKeywordsearchModal(!keywordsearchmodal);
    };
    const toggledocveriModal = () => {
        setDocverimodal(!docverimodal);
    };
    const toggledocrankModal = () => {
        setDocrankmodal(!docrankmodal);
    };
    const toggledoccompModal = () => {
        setDoccompmodal(!doccompmodal);
    };
    const toggledocsecModal = () => {
        setDocsecmodal(!docsecmodal);
    };
    const togglecloudModal = () => {
        setCloudmodal(!cloudmodal);
    };
    const toggledownModal = () => {
        setDownmodal(!downmodal);
    };



   
    return (
        <>
        <div className='background-container'></div>
            <nav className='navbar'>
                <div className='container'>
                    <h3 className='logo'><BsCloudCheckFill size={60} />Endovault</h3>
                    <ul className='nav-links'>

                        <li><Link to='/login'>Login</Link></li>
                        <li><Link to='/signup'>Signup</Link></li>


                    </ul>
                </div>

            </nav>

            <div className='bodycontent'>

            </div>

            <div>
                <center>


            
                <div class="animation-container">
        
                    <div class="lightning-container">
                        <div>  <h3 className='typed'>Hi Friends!!!</h3></div>
                    
                    <br></br>
                   

                        <div class="cencontainer">
                            <h1 className='typed'>Welcome to the Vault !!!..</h1>
                        </div>
                        



                        <div class="lightning white"></div>

                        <div class="lightning red"></div>
                    </div>

                    <div class="boom-container">
                        <div class="shape circle big white"></div>
                        <div class="shape circle white"></div>
                        <div class="shape triangle big yellow"></div>
                        <div class="shape disc white"></div>
                        <div class="shape triangle blue"></div>
                    </div>

                    <div class="boom-container second">
                        <div class="shape circle big white"></div>
                        <div class="shape circle white"></div>
                        <div class="shape disc white"></div>
                        <div class="shape triangle blue"></div>
                    </div>
                </div>
                <div>
                    <br></br>
                    <br></br>
                </div>





                <h2>About</h2>
                </center>
                <center>
                
    <br></br>
    <MdSecurity size={60}/><TbLockAccess size={60} /> < SiEasyeda size={60} />
                <h3>Hurray!!</h3><p className='para'>You are in a right place to store your documents.We give you the trust and hope to safely manage your files.</p>
                <br></br>
               <p className='para'>We proivdes an reliable and manageable supports to you</p>
                <br></br>
                <p className='para'>We provides an easy interface for your access and user experience</p>
                
    <br></br>
    </center>
            </div>
   

<div className="image-container">
    <h2>Services</h2>
    <div className="horizontal-line"></div>
    <br></br>

    <div className="image-wrapper">
        <div className="image-item">
            <img src="https://www.canto.com/images/orphan/File-Management.jpg" alt="Image 1" className="image" />
           <button className='btn-modal' onClick={toggleFilemanageModal}>File Management</button>
           
        </div>
      
        {filemanagemodal && (
                                        <div className={filemanagemodal ? 'modal active' : 'modal'}>

                                <div className='overlay'>
                                    <div className='modal-content'>
                                        <h3 className='head'>File Management Service</h3>
                                        <br></br>
                                        <br></br>
                                        <h4 className='quote'>"Organizing is what you do before you do something, so that when you do it, it is not all mixed up."</h4>
                                       <br></br>
                                       <br></br>
                                        <h4 className='para'>Welcome to our file management service! We're excited to have you on board. With our intuitive platform, organizing and managing your files has never been easier. From documents to media files, we provide you with the tools you need to keep everything structured and accessible. Say goodbye to the chaos of scattered files and hello to a streamlined experience. Let's embark on this journey of efficient file management together!</h4>


                                    </div>
                                    <button className='close-modal' onClick={toggleFilemanageModal}>Close</button>
                                </div>
                            </div>
                        )}
       
      

        <div className="image-item">
            <img src="https://sitechecker.pro/wp-content/uploads/2019/02/4.jpg" alt="Image 2" className="image" />
            <button className='btn-modal' onClick={togglekeysearchModal}>Keyword Searching</button>
            </div>
            {keywordsearchmodal && (
                                        <div className={keywordsearchmodal ? 'modal active' : 'modal'}>

                                <div className='overlay'>
                                    <div className='modal-content'>
                                        <h3 className='head'>keyword Extractiong Service</h3>
                                        <br></br>
                                        <br></br>
                                        <h4 className='quote'>"Words are the keys to unlocking understanding and insight." </h4>
                                       <br></br>
                                       <br></br>
                                        <h4 className='para'>Welcome to our keyword extraction service! We're thrilled to have you join us. With our advanced algorithms, we'll help you uncover the essence of your text by extracting the most relevant keywords. Whether you're analyzing documents, improving SEO, or enhancing your content strategy, our service is here to provide valuable insights. Say hello to a smarter approach to text analysis. Let's dive in and discover the power of words together!</h4>


                                    </div>
                                    <button className='close-modal' onClick={togglekeysearchModal}>Close</button>
                                </div>
                            </div>
                        )}
      




        <div className="image-item">
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ0N9sUPh1CCDv67ny_SidLsdv6LHos8WMki9jBImhgM9AzSJRVrraGPX-uPfCH9i6gLqM&usqp=CAU" alt="Image 3" className="image"/>
            <button className='btn-modal' onClick={toggledocveriModal}>Document Verification</button>
            </div>
            {docverimodal && (
                                        <div className={docverimodal ? 'modal active' : 'modal'}>

                                <div className='overlay'>
                                    <div className='modal-content'>
                                        <h3 className='head'>Document verification Service</h3>
                                        <br></br>
                                        <br></br>
                                        <h4 className='quote'>"Trust is built on verification." </h4>
                                       <br></br>
                                       <br></br>
                                        <h4 className='para'>Welcome to our document verification service! We're delighted to have you here. With our cutting-edge technology and meticulous processes, we ensure the authenticity and integrity of your documents. Whether you're verifying identity, validating credentials, or enhancing security measures, our service is your reliable partner. Rest assured, your documents are in safe hands. Let's build trust through verification together!</h4>


                                    </div>
                                    <button className='close-modal' onClick={toggledocveriModal}>Close</button>
                                </div>
                            </div>
                        )}


        

        <div className="image-item">
            <img src="https://www.businessmarketingblog.org/wp-content/uploads/2009/08/organic-ranking-growth.jpg" alt="Image 4" className="image" />
            <button className='btn-modal' onClick={toggledocrankModal}>Document Ranking</button>
            </div>
            {docrankmodal && (
                                        <div className={docrankmodal ? 'modal active' : 'modal'}>

                                <div className='overlay'>
                                    <div className='modal-content'>
                                        <h3 className='head'>Document Ranking Service</h3>
                                        <br></br>
                                        <br></br>
                                        <h4 className='quote'>"Quality is never an accident; it is always the result of high intention, sincere effort, intelligent direction, and skillful execution." </h4>
                                       <br></br>
                                       <br></br>
                                        <h4 className='para'>Welcome to our document ranking service! We're excited to have you on board. With our sophisticated algorithms and meticulous analysis, we empower you to discover the most relevant and valuable documents with ease. Whether you're conducting research, optimizing search results, or improving decision-making processes, our service is designed to elevate your document management experience. Get ready to uncover quality content efficiently and effortlessly. Let's embark on this journey of intelligent document ranking together!</h4>


                                    </div>
                                    <button className='close-modal' onClick={toggledocrankModal }>Close</button>
                                </div>
                            </div>
                        )}


       
   
   
        <div className="image-item">
            <img src="https://images.saasworthy.com/blog_latest/wp-content/uploads/2020/04/topopensourceandfreefilecompressionsoftware_76_featuredimage_1542288651_nvxyf.jpg" alt="Image 5" className="image" />
            <button className='btn-modal' onClick={toggledoccompModal}>Document Compression</button>
            </div>
            {doccompmodal && (
                                        <div className={doccompmodal ? 'modal active' : 'modal'}>

                                <div className='overlay'>
                                    <div className='modal-content'>
                                        <h3 className='head'>Document Compression Service</h3>
                                        <br></br>
                                        <br></br>
                                        <h4 className='quote'>"Simplicity is the ultimate sophistication." </h4>
                                       <br></br>
                                       <br></br>
                                        <h4 className='para'>Welcome to our document compression service! We're thrilled to have you join us. With our innovative compression technology, we simplify the storage and sharing of your documents without compromising quality. Whether you're dealing with large files, optimizing bandwidth, or enhancing workflow efficiency, our service is here to streamline your document management experience. Say goodbye to bulky files and hello to simplicity and sophistication. Let's make document handling effortless together!</h4>

                                    </div>
                                    <button className='close-modal' onClick={toggledoccompModal}>Close</button>
                                </div>
                            </div>
                        )}



   

        <div className="image-item">
            <img src="https://getsmarteye.com/wp-content/uploads/2020/02/53028673_m.jpg" alt="Image 6" className="image" />
            <button className='btn-modal' onClick={toggledocsecModal}>Document Security</button>
            </div>
            {docsecmodal && (
                                        <div className={docsecmodal ? 'modal active' : 'modal'}>

                                <div className='overlay'>
                                    <div className='modal-content'>
                                        <h3 className='head'>Document Security Service</h3>
                                        <br></br>
                                        <br></br>
                                        <h4 className='quote'>Security is not a product, but a process."</h4>
                                       <br></br>
                                       <br></br>
                                        <h4 className='para'>Welcome to our document security service! We're honored to have you as part of our community. With our robust security measures and comprehensive protocols, we ensure the confidentiality, integrity, and availability of your documents. Whether you're safeguarding sensitive information, protecting against unauthorized access, or complying with regulations, our service is your trusted ally in the fight against data breaches. Let's embark on this journey of fortifying your document security together!</h4>

                                    </div>
                                    <button className='close-modal' onClick={toggledocsecModal}>Close</button>
                                </div>
                            </div>
                        )}

   


        <div className="image-item">
            <img src="https://majapahit.id/thumbnail/2021/08/cloud-storage.jpg" alt="Image 7" className="image" />
            <br></br>
            <button className='btn-modal' onClick={togglecloudModal}>Cloud Storage</button>
            </div>
            {cloudmodal && (
                                        <div className={cloudmodal ? 'modal active' : 'modal'}>

                                <div className='overlay'>
                                    <div className='modal-content'>
                                        <h3 className='head'>Cloud Storage Service</h3>
                                        <br></br>
                                        <br></br>
                                        <h4 className='quote'>"Your data is your life; guard it with care." </h4>
                                       <br></br>
                                       <br></br>
                                        <h4 className='para'>Welcome to our cloud storage service! We're thrilled to have you on board. With our secure and reliable platform, you can store, access, and share your data from anywhere, at any time. Whether you're backing up important files, collaborating with team members, or accessing documents on the go, our service offers the flexibility and peace of mind you need. Your data's security and accessibility are our top priorities. Let's safeguard your digital life together in the cloud!</h4>

                                    </div>
                                    <button className='close-modal' onClick={togglecloudModal}>Close</button>
                                </div>
                            </div>
                        )}

  
  
        <div className="image-item">
            <img src="https://threatresearch.ext.hp.com/wp-content/uploads/2018/01/Downloads.png" alt="Image 8" className="image" />
            <button className='btn-modal' onClick={toggledownModal}>Onpremise Download</button>
            </div>
            {downmodal && (
                                        <div className={downmodal ? 'modal active' : 'modal'}>

                                <div className='overlay'>
                                    <div className='modal-content'>
                                        <h3 className='head'>On premise Download Service</h3>
                                        <br></br>
                                        <br></br>
                                        <h4 className='quote'>"Control is the ultimate expression of trust."</h4>
                                       <br></br>
                                       <br></br>
                                        <h4 className='para'>Welcome to our on-premise download service! We're delighted to have you join us. With our secure and efficient platform, you can download and manage your files directly within your own premises, ensuring complete control and confidentiality over your data. Whether you're prioritizing data privacy, complying with regulations, or optimizing network performance, our service empowers you to maintain sovereignty over your digital assets. Let's take control of your data journey together, right where you are!</h4>

                                    </div>
                                    <button className='close-modal' onClick={toggledownModal}>Close</button>
                                </div>
                            </div>
                        )}
    
    </div>
</div>

            <div className='contact-details'>
                    <h2>Contact Us:</h2>
                    
                    <p><FontAwesomeIcon icon={faEnvelope} />Email: buvaneshkumaars@gmail.com</p>
                    <p><FontAwesomeIcon icon={faPhone} />Phone: +91-9943876404</p>
                    <p><FontAwesomeIcon icon={faWhatsapp} />Whats app: +91-9943876404</p>
                    <p><FontAwesomeIcon icon={faInstagram} />instagram: @buvanesh_123</p>
                    
                </div>

               

                <div class="running-person"></div>


        </>
    );
}

export default Navbar;