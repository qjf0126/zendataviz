import React, { useEffect } from 'react';
import '../App.css'; // 新增数据文件
import { ArrowRightCircle } from 'react-bootstrap-icons';

function MapComponent() {
  useEffect(() => {
    const divElement = document.getElementById('viz1717753398069');
    const vizElement = divElement.getElementsByTagName('object')[0];
    const scriptElement = document.createElement('script');
    scriptElement.src = 'https://public.tableau.com/javascripts/api/viz_v1.js';
    vizElement.parentNode.insertBefore(scriptElement, vizElement);
  }, []);

  const scrollToMapSection = () => {
    const mapSection = document.getElementById('mapsection');
    if (mapSection) {
      mapSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div>
      <div style={{ height: '100vh', width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: '#F2F1ED' }}>
        <div id="story-intro-section" className="story-section story-intro-section">
          <div className="story-content">
            <h1>三、禅宗的传播</h1>
            <p>
              禅宗，作为佛教的一大支派，展现了显著的地域传播趋势。它在中国诞生后，通过数个世纪的发展，逐渐向东亚及其他地区扩展。初期，禅宗在中国的长江流域和华南地区广泛传播，形成南禅和北禅两大主要流派。唐代以后，禅宗传入朝鲜半岛，融合了当地的佛教传统，形成了独特的禅修体系。随后，禅宗传播至日本，并在镰仓时代迎来了发展的高峰，成为日本文化的重要组成部分。越南的禅宗也在隋唐时期开始形成，发展出具有本土特色的禅修方法。近现代，禅宗随移民和文化交流进一步传播到欧美国家，受到广泛关注和实践。总体来看，禅宗的传播展现出从中国发源，逐步向东亚扩展，再延伸到全球的地域趋势，反映了其独特的思想和修行方法在不同文化背景下的适应性和影响力。
            </p>
          </div>
          <button className="scroll-down-arrow" onClick={scrollToMapSection}>
            <ArrowRightCircle />
          </button>
        </div>
      </div>
      <div id='mapsection' style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
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
    </div>
  );
}

export { MapComponent as Map };





