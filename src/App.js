import React from 'react';
import { Introsection } from './components/intro';
import { Directory } from './components/directory';
import { Overviewsection } from './components/overview';
import { Relationshipmap } from './components/relationshipmap';
import { Influencemap } from './components/influence';
import { Map } from './components/map';
import { Referencesection } from './components/reference';
import { Siderbar } from './components/siderbar';

function App() {

  return (
    <div className="App">
      <Introsection />
      <div id="directory" className="section">
        <Directory />
      </div>
      <div id="section-I" className="section" data-section="I">
        <Overviewsection />
      </div>
      <div id="section-II" className="section" data-section="II" style={{ height: '200vh', width: '100%' }}>
        <Relationshipmap />
      </div>
      <div id="section-III" className="section" data-section="III" style={{ height: '200vh', width: '100%' }}>
        <Map />
      </div>
      <div id="section-IV" className="section" data-section="IV" style={{ height: '200vh', width: '100%' }}>
        <Influencemap />
      </div>
      <div id="section-V" className="section" data-section="V" style={{ height: '100vh', width: '100%' }}>
        <Referencesection />
      </div>
      <Siderbar />
    </div>
  );
}

export default App;



