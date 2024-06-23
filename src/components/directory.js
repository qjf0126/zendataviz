import React from 'react';
import '../App.css';
import { ArrowRightCircle } from 'react-bootstrap-icons';

const scrollToOverview = () => {
  const Overview = document.getElementById('section-I');
  if (Overview) {
    Overview.scrollIntoView({ behavior: 'smooth' });
  }
};

const DirectoryPage = () => {
  return (
    <div style={{background:'#F2F1ED', height:'100vh'}}>
      <div className="directory-container">
        <div className="vertical-text">
          <div style={{fontSize:'64px', color:'#333'}}>目录</div>
          <div>一、项目简介</div>
          <div>二、禅宗的法脉与传承</div>
          <div>三、禅宗的传播</div>
          <div>四、禅宗思想的影响</div>
          <div>五、数据来源</div>
        </div>
      </div>
      <button className="scroll-down-arrow" onClick={scrollToOverview} style={{marginLeft:'48%', marginRight:'48%', marginTop:'0'}}>
        <ArrowRightCircle />
      </button>
    </div>
  );
};

export { DirectoryPage as Directory};
