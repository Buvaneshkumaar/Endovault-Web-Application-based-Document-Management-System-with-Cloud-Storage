import React, { useState ,useEffect} from 'react';
import axios from 'axios';
import Sidebar from '../sidebar2/sidebar2';

const FileUploadForm = () => {
  const [file, setFile] = useState();
  const [keywords, setKeywords] = useState([]);
  const [blinkArrow, setBlinkArrow] = useState(true);

  
  useEffect(() => {
    const intervalId = setInterval(() => {
      setBlinkArrow((prev) => !prev);
    }, 500); // Blink every 500ms

    return () => clearInterval(intervalId);
  }, []);

  const onChangeHandler = (event) => {
    setFile(event.target.files[0]);
  };

  const onClickHandler = () => {
    const formData = new FormData();
    formData.append('file', file);

    axios.post('http://localhost:8080/processfile', formData)
      .then(response => {
        setKeywords(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  };

  return (
    <>
      <div style={{ display: 'flex' }}>
        <Sidebar />
        <div className="main-container">
          <h2>Frequency Extractor</h2>
          <div className="form-container">
            <form>
              <label htmlFor="fileInput">Choose a file:</label>
              <input type="file" id="fileInput" name="file" onChange={onChangeHandler} />
              <button type="button" onClick={onClickHandler}>Extract Keywords</button>
              <h1>Top 10 Occurring Keywords</h1>
              <br></br>

              {keywords && Object.keys(keywords).length > 0 && (
                <div className="result-container">
                  <table>
                    <thead>
                      <tr>
                        <th>Keywords</th>
                        <th>Frequency</th>
                      </tr>
                    </thead>
                    <tbody >
                      {Object.entries(keywords).map(([word, count]) => (
                        <tr key={word}>
                          <td>{word}</td>
                          <td>{count}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>

                  <div style={{ marginTop: '20px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
                      <div style={{ display: 'flex', alignItems: 'center', paddingRight: '10px' }}>
                        <div style={{ fontSize: '150px', color: 'green', marginRight: '5px', visibility: blinkArrow ? 'visible' : 'hidden' }}>
                          &#x2191;
                        </div>
                        <div style={{ fontSize: '16px' }}>Copy and Use these keywords for your file to upload</div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

            </form>
          </div>
        </div>
      </div>
    </>
  );
};
export default FileUploadForm;
