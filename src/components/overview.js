import React from 'react';
import '../App.css';

// 定义图片路径数组
const images = [
  require('../assets/img/达摩祖师.jpg'),
  require('../assets/img/陆羽.png'),
  require('../assets/img/慧可禅师（二祖）.jpg'),
  require('../assets/img/道信（四祖）.jpg'),
  require('../assets/img/本无树2.png'),
  require('../assets/img/禅宗诗文2.png'),
  require('../assets/img/禅宗诗文3.jpg'),
  require('../assets/img/禅宗绘画1.png'),
  require('../assets/img/禅宗绘画3.png'),
  require('../assets/img/禅宗绘画4.png'),
  require('../assets/img/禅宗绘画5.png'),
  require('../assets/img/禅宗绘画6.png'),
  // 添加更多图片路径
];

const Overview = () => {
  return (
    <div className="overview-container">
      <div className="overview-content">
        <h2>一、项目简介</h2>
        <p>
          禅宗是中国佛教的一个重要流派，始于南北朝时期，由菩提达摩传入中国，经过历代祖师的发展，逐渐形成独特的禅宗思想和修行方法。禅宗强调“直指人心，见性成佛”，通过参禅悟道，超越文字和经典，直接体验佛性。
        </p>
        <p>
          禅宗的发展与传播可视化项目展示了从南北朝到宋朝，禅宗思想对中国历史人物和文化的影响。
          项目通过动态图表和详细介绍，直观地展现了禅宗在不同朝代的传播和各个历史人物之间的关系、禅宗发展历史背景和禅宗思想的渗透过程。
        </p>
      </div>
      <div className="image-matrix">
        {images.map((src, index) => (
          <img key={index} src={src} alt={`img-${index}`} />
        ))}
      </div>
    </div>
  );
};

export { Overview as Overviewsection };

