import React, { useState } from 'react';
import '../App.css'; // 引入自定义的CSS文件
import { ArrowRightCircle } from 'react-bootstrap-icons';

// List of image paths
const images = [
  { src: require('../assets/img/黑白1.png'), id: 'img1' },
  { src: require('../assets/img/黑白2.png'), id: 'img2' },
  { src: require('../assets/img/黑白3.png'), id: 'img3' },
  { src: require('../assets/img/黑白4.png'), id: 'img4' },
  { src: require('../assets/img/黑白5.png'), id: 'img5' },
  { src: require('../assets/img/黑白6.png'), id: 'img6' },
  { src: require('../assets/img/黑白7.png'), id: 'img7' },
  { src: require('../assets/img/黑白8.png'), id: 'img8' },
];

const scrollToDirectory = () => {
  const directory = document.getElementById('directory');
  if (directory) {
    directory.scrollIntoView({ behavior: 'smooth' });
  }
};

const Intro = () => {
  const [showDialog, setShowDialog] = useState(false);

  const handleButtonClick = () => {
    setShowDialog(true);
  };

  const handleCloseDialog = () => {
    setShowDialog(false);
  };

  return (
    <div className="intro-container">
      <a href="https://github.com/yourusername/yourrepository" className="github-link" target="_blank" rel="noopener noreferrer">
        <p>view the project in github</p>
        <img src="https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png" alt="GitHub" className="github-icon" />
      </a>
      <div className="image-background">
        {images.map((image) => (
          <img src={image.src} id={image.id} key={image.id} className="background-image" alt="background" />
        ))}
      </div>
      <main className="intro-main">
        <h2>禅宗的发展与传播</h2>
        <p>Data visualization of the development of Zen Buddhism</p>
        <footer className="intro-footer">
          <p>By <a href="https://qianjinfan.netlify.app/">Jinfan Qian</a></p>
        </footer>
        <div className="intro-buttons">
          <button className="quiz-button" onClick={handleButtonClick}>什么是禅宗</button>
        </div>
      </main>
      {showDialog && (
        <div className="dialog-overlay">
          <div className="dialog">
            <p style={{fontSize:'20px', color:'#666'}}>禅宗是中国佛教的重要宗派，始于南朝，盛于唐宋。禅宗强调通过打坐和悟性来直接体验佛法真谛，其特点在于“教外别传，不立文字，直指人心，见性成佛”。</p>
            <button onClick={handleCloseDialog}>关闭</button>
          </div>
        </div>
      )}
      <button className="scroll-down-arrow" onClick={scrollToDirectory}>
        <ArrowRightCircle />
      </button>
    </div>
  );
}

export { Intro as Introsection };






