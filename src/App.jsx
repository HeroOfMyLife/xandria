// src/App.jsx
import { useState } from 'react'
import './App.css'

// Mock ACGN Data
const acgnData = [
  { id: 1, title: 'FLCL', type: 'Anime' },
  { id: 2, title: 'Berserk', type: 'Manga' },
  { id: 3, title: 'Elden Ring', type: 'Game' },
  { id: 4, title: 'A Will Eternal', type: 'Xianxia-Novel' },
  { id: 5, title: 'Cowboy Bebop', type: 'Anime' },
  { id: 6, title: 'Hollow Knight', type: 'Game' },
];

function App() {
  const [bookmarks, setBookmarks] = useState([]);
  const [reviews, setReviews] = useState({});

  const toggleBookmark = (id) => {
    setBookmarks(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const handleReviewChange = (id, text) => {
    setReviews(prev => ({ ...prev, [id]: text }));
  };

  return (
    <div className="container">
      <h1 className="header"> Xandria: ACGN Tracker</h1>
      
      {acgnData.map(item => (
        <div key={item.id} className="card">
          <div className="card-header">
            <div>
              <h2 style={{ margin: 0 }}>{item.title}</h2>
              <span className="type-badge">{item.type}</span>
            </div>
            <button 
              className={`btn ${bookmarks.includes(item.id) ? 'btn-bookmarked' : ''}`}
              onClick={() => toggleBookmark(item.id)}
            >
              {bookmarks.includes(item.id) ? '★ Bookmarked' : '☆ Bookmark'}
            </button>
          </div>
          
          <textarea 
            rows="3"
            placeholder={`Write your review for ${item.title}...`}
            value={reviews[item.id] || ''}
            onChange={(e) => handleReviewChange(item.id, e.target.value)}
          />
        </div>
      ))}
    </div>
  )
}

export default App
