import React from 'react';
import { Relationshipmap } from './components/relationshipmap';
import { Timelinemap } from './components/timeline';
import { Map } from './components/map';
import { Siderbar } from './components/siderbar';

function App() {
  return (
    <div className="App">
      <div id="section-II" className="section" data-section="II">
        <Relationshipmap />
      </div>
      <Timelinemap />
      <div id="section-III" className="section" data-section="III">
        <Map />
      </div>
      <Siderbar />
    </div>
  );
}

export default App;