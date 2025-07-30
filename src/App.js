
import { useState } from 'react';
import './App.css';



function App() {
  const [list, setList] = useState([
    {
      id: 1,
      Title: 'React Fundamentals',
      PublishYear: 1999,
      rating: 0

    }, {
      id: 2,
      Title: 'Javascript Fundamentals',
      PublishYear: 2001,
      rating: 0

    }, {
      id: 3,
      Title: 'CSS Mastery',
      PublishYear: 2009,
      rating: 0

    }, {
      id: 4,
      Title: 'C# Fundamentals',
      PublishYear: 2019,
      rating: 0

    },
  ])

  function handleAddBook(Book) {
    setList((list) => [...list, Book])
    console.log(list);

  }
  return (
    <div className="App">
      <BookList list={list} />
      <AddBookForm onAddBook={handleAddBook} />

    </div>
  );
}

function BookList({ list }) {
  return (
    <div>
      {list.map(book => (

        <BookItem key={book.id} book={book} />


      ))}

    </div>
  )
}

function BookItem({ book }) {
  const [Rating, setRating] = useState(book.rating || 0)
  const [temRatig, setTemRating] = useState(0)

  return (
    <div className='book-card'>
      <h4 className='book-title '>Title : {book.Title}</h4>
      <p className='book-info'>year : {book.PublishYear}</p>
      <p> rating : {Rating}</p>
      <StarRating
        rating={Rating}
        temRatig={temRatig}
        onSetRating={setRating}
        onSetTemRating={setTemRating}

      />

    </div>
  )
}

function StarRating({ rating, temRatig, onSetRating, onSetTemRating }) {

  function handleRating(rating) {
    onSetRating(rating);

  }
  return (
    <div>
      <div>
        {Array.from({ length: 5 }, (_, i) =>
          <Stars key={i}
            onRate={() => handleRating(i + 1)}
            full={temRatig ? temRatig >= i + 1 : rating >= i + 1}
            onOVer={() => onSetTemRating(i + 1)}
            onLeave={() => onSetTemRating(0)}

          />
        )}
        <span>
          {temRatig || rating || ''}
        </span>
      </div>
    </div>
  )
}



function Stars({ onRate, full, onOVer, onLeave }) {
  const starStyle = {
    width: '40px',
    height: '40px',
    display: 'inline-block',
    color: '#fcc419',
    cursor: 'pointer'

  }
  return (
    <span style={starStyle} onClick={onRate} onMouseEnter={onOVer} onMouseLeave={onLeave}>
      {full ? <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
        fill='#fcc419'
        stroke='#fcc419'



      >
        <path
          d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg> : <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke='#000'



      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="{2}"
          d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
        />
      </svg>}

    </span>
  )
}

function AddBookForm({ onAddBook }) {
  const [Title, setTitle] = useState('')
  const [PublishYear, setPublishYear] = useState('')
  function handleSubmit(e) {
    e.preventDefault();
    const newBook = { id: Date.now(), Title, PublishYear, rating: 0 }

    if (!Title || !PublishYear) return;
    onAddBook(newBook)
    setTitle('')
    setPublishYear('')
  }


  return (
    <form onSubmit={handleSubmit} className='add-book-form '>
      <input
        type='text'
        value={Title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder='title'
      />

      <input
        type='text'
        value={PublishYear}
        onChange={(e) => setPublishYear(+e.target.value)}
        placeholder='publish year'
      />
      <button type='submit'>Add Book</button>
    </form>
  )
}






export default App;
