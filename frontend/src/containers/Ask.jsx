import '../styles/ask.css'
import { useEffect, useState } from 'react';
import Header from '../components/Header';
import { postQuestion } from '../api/postQuestion';
import { useNavigate } from 'react-router-dom';
import { getUsername } from '../api/getUser';

const Question = ()=>{

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [message, setMessage] = useState(''); 
  const [isError, setIsError] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Question Posted:', title, content);
  };

  const submitQuestion = async (e) =>{
    e.preventDefault();
    let res = await postQuestion({'title': title, 'content': content});
    if(res.ok){
      console.log("posted");
      setMessage("Posted!");
      setIsError(false);
    } else if(res.status == 401){
      navigate("/login")
      setMessage("Failed to post");
      setIsError(true)
    }
    else{
      alert("error while posting");
    }
  }
    return <main>
         <Header showProfile={true}/>
    <div className="new-question-container">
    <h3>New Question</h3>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <input
            type="text"
            placeholder="Enter the question title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="title-input"
          />
        </div>
        <div className="form-group">
          <textarea
            placeholder="Write your question here"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="content-textarea"
          />
        </div>
        <div className='row-center'>
        {message && (
        <span style={{ color: isError ? 'red' : 'green', marginTop: '2px', fontFamily: 'Poppins' }}>
          {message}
          <br/>
        </span>
      )}
        <button type="submit" className="post-button" onClick={submitQuestion}><strong>Post</strong></button>
        </div>
      </form>
    </div>
    </main>
}

export default Question;