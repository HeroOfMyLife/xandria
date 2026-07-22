// src/App.jsx
import { useState } from 'react'
import './App.css'

// Mock ACGN Data with Images
const acgnData = [
  { 
    id: 1, 
    title: 'Vampire Hunter D: Bloodlust', 
    type: 'Anime',
    image: '/vampire-hunter-d.jpg',
    year: 1995
  },
  { 
    id: 2, 
    title: 'Overbleed', 
    type: 'Manga',
    image: '/overbleed.jpg',
    year: 1989
  },
  { 
    id: 3, 
    title: 'Dragon Ball Online', 
    type: 'Game',
    image: '/dragonball-online.jpg',
    year: 2022
  },
  { 
    id: 4, 
    title: 'Mobseka', 
    type: 'Light Novel',
    image: '/Mobuseka.jpg',
    year: 2009
  },
  { 
    id: 5, 
    title: 'Wakfu', 
    type: 'Manfra',
    image: '/wakfu.jpg',
    year: 1998
  },
  { 
    id: 6, 
    title: 'Undertale', 
    type: 'Game',
    image: '/undertale.jpg',
    year: 2017
  },
  { 
    id: 7, 
    title: 'Yongbi the Invincible', 
    type: 'Manhwa',
    image: '/Yongbi.jpg',
    year: 2018
  },
  { 
    id: 8, 
    title: 'Grimgar of Fantasy and Ash', 
    type: 'Light Novel',
    image: '/Grimgar.jpg',
    year: 2012
  },
  { 
    id: 9, 
    title: 'Reverend Insanity', 
    type: 'Webnovel',
    image: '/reverend-insanity.jpg',
    year: 2018
  },
  { 
    id: 10, 
    title: 'World After the fall', 
    type: 'Manhwa',
    image: '/theworldafterthefall.jpg',
    year: 2020
  },
];

function App() {
  const [bookmarks, setBookmarks] = useState([]);
  const [reviews, setReviews] = useState({});
  const [selectedCategory, setSelectedCategory] = useState('All');

  const toggleBookmark = (id) => {
    setBookmarks(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const handleReviewChange = (id, text) => {
    setReviews(prev => ({ ...prev, [id]: text }));
  };

  // Get unique categories
  const categories = ['All', ...new Set(acgnData.map(item => item.type))];

  // Filter items by category
  const filteredData = selectedCategory === 'All' 
    ? acgnData 
    : acgnData.filter(item => item.type === selectedCategory);

  return (
    <div className="container">
      <h1 className="header">📚 Xandria: ACGN Tracker</h1>
      
      {/* Category Filter */}
      <div className="category-filter">
        {categories.map(cat => (
          <button
            key={cat}
            className={`category-btn ${selectedCategory === cat ? 'active' : ''}`}
            onClick={() => setSelectedCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>
      
      <div className="grid-container">
        {filteredData.map(item => (
          <div key={item.id} className="card">
            <div className="card-image">
              <img src={item.image} alt={item.title} onError={(e) => {
                e.target.src = 'https://via.placeholder.com/300x450?text=No+Image';
              }} />
            </div>
            <div className="card-content">
              <div className="card-header">
                <div>
                  <h3>{item.title}</h3>
                  <span className="type-badge">{item.type}</span>
                  <span className="year-badge">{item.year}</span>
                </div>
              </div>
              
              <button 
                className={`btn ${bookmarks.includes(item.id) ? 'btn-bookmarked' : ''}`}
                onClick={() => toggleBookmark(item.id)}
              >
                {bookmarks.includes(item.id) ? '★ Bookmarked' : '☆ Bookmark'}
              </button>
              
              <textarea 
                rows="3"
                placeholder={`Write your review for ${item.title}...`}
                value={reviews[item.id] || ''}
                onChange={(e) => handleReviewChange(item.id, e.target.value)}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default App