import React from 'react';
import { Artist } from './features/artist/Artist';
import { Search } from './features/search/Search';

const App = () => {
  return (
    <div className="container">
      <Search />
      <Artist />
    </div>
  );
}

export default App;
