import React, { useEffect } from 'react';

function MapComponent() {
  useEffect(() => {
    const divElement = document.getElementById('viz1717753398069');
    const vizElement = divElement.getElementsByTagName('object')[0];
    const scriptElement = document.createElement('script');
    scriptElement.src = 'https://public.tableau.com/javascripts/api/viz_v1.js';
    vizElement.parentNode.insertBefore(scriptElement, vizElement);
  }, []);

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh'}}>
      <div
        className='tableauPlaceholder'
        id='viz1717753398069'
        style={{
          width: '71%',
          height: '88%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          border: 'none',
        }}
      >
        <noscript>
          <a href='#'>
            <img
              alt='仪表板 1'
              src='https://public.tableau.com/static/images/_1/_17177477692140/1/1_rss.png'
              style={{ border: 'none' }}
            />
          </a>
        </noscript>
        <object
          className='tableauViz'
          style={{ width: '100%', height: '100%' }}
        >
          <param name='host_url' value='https%3A%2F%2Fpublic.tableau.com%2F' />
          <param name='embed_code_version' value='3' />
          <param name='site_root' value='' />
          <param name='name' value='_17177477692140/1' />
          <param name='tabs' value='no' />
          <param name='toolbar' value='yes' />
          <param
            name='static_image'
            value='https://public.tableau.com/static/images/_1/_17177477692140/1/1.png'
          />
          <param name='animate_transition' value='yes' />
          <param name='display_static_image' value='yes' />
          <param name='display_spinner' value='yes' />
          <param name='display_overlay' value='yes' />
          <param name='display_count' value='yes' />
          <param name='language' value='en-US' />
        </object>
      </div>
    </div>
  );
}

export { MapComponent as Map }


