import React from 'react'

const QuoteBox = ({quote}) => {
  return (
    <div className="QuoteBox" id="quote-box">
        <div className="QuoteText" id="text">{quote.quote}</div>
        <div className="QuoteAuthor" id="author">{quote.author}</div>
    </div>
  )
}

export default QuoteBox;
