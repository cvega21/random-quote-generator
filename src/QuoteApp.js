import React, { useState, useEffect } from 'react';
import QuoteBox from './QuoteBox.js';
import './App.css';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTwitter } from '@fortawesome/free-brands-svg-icons'


const QuoteApp = () => {
  const [activeQuote, setQuote] = useState({quote: '', author: ''});
  const [tweetQuery, setTweetQuery] = useState('');

  const getNewQuote = async () => {
    let response = await fetch('https://type.fit/api/quotes');
    let jsonResponse = await response.json();
    let randomNum = Math.floor(Math.random() * jsonResponse.length);
    let tweetQuote = jsonResponse[randomNum].text;
    let tweetAuthor = 'Homer Simpson';
    if (jsonResponse[randomNum].author != null) {
      setQuote({quote: jsonResponse[randomNum].text, author: jsonResponse[randomNum].author});
      tweetAuthor = jsonResponse[randomNum].author;
    } else {
      setQuote({quote: jsonResponse[randomNum].text, author: 'Homer Simpson'})
      //pass
    }
    let tweetText = new URLSearchParams({
      text: (`${tweetQuote} - ${tweetAuthor}`)
    })
    setTweetQuery("https://twitter.com/intent/tweet?" + tweetText.toString());
  }

  useEffect(() => {
    getNewQuote();
  }, [])

  return (
    <div className="container">
      <div className="QuoteApp">
        <div className="Signature">By: Christian Vega-Munguia</div>
          <div className="BoxAndTweet">
            <QuoteBox quote={activeQuote}/>
          </div>
      </div>
        <a href={tweetQuery} rel="noreferrer" target="_blank" id="tweet-quote" className="Twitter">
          <FontAwesomeIcon icon={faTwitter} size="2x" />
          <p>Tweet This</p>
        </a>
        <Button variant="dark" onClick={getNewQuote} id="new-quote">Get New Quote!</Button>
    </div>
  );
}

export default QuoteApp;
