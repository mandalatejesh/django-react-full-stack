import React, { useState, useEffect } from 'react';
import Header from '../components/Header'
import getQuestions from '../api/getQuestions';
import '../styles/list.css'
import QuestionCard from '../components/QuestionCard';
import {useNavigate} from 'react-router-dom'


const QuestionsDisplay = () => {
    const [questions, setQuestions] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchQuestions = async () => {
            try {
                const res = await getQuestions();
                if(res.ok){
                    let data = await res.json();
                    setQuestions(data); // Assuming the data is directly in response.data
                } else if(res.status === 401){
                    console.log("unauthorized");
                    navigate("/login");
                }
            } catch (error) {
                console.error('Error fetching questions:', error);
            }
        };

        fetchQuestions();
    }, [navigate]);

    return (
        <main>
        <Header showProfile={false}/>
        <div className="questions-container">
            {questions.length > 0 && questions.map((question, index) => (
                <QuestionCard key={index} title={question.title} description={question.description} user={question.user}/>
            ))}
            {questions.length === 0 && <h3>No questions yet!</h3>}
        </div>
        </main>
        
    );
};

export default QuestionsDisplay;
