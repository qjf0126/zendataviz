import React from 'react';
import '../App.css'; // 引入自定义的CSS文件
import { ArrowRightCircle } from 'react-bootstrap-icons';

const scrollToDirectory = () => {
  const directory = document.getElementById('directory');
  if (directory) {
    directory.scrollIntoView({ behavior: 'smooth' });
  }
};

const Intro = () => {
  return (
    <div className="intro-container">
      <main className="intro-main">
        <h2>禅宗的发展与传播</h2>
        <p>Data visualization of the development of Zen Buddhism</p>
        <footer className="intro-footer">
          <p>By <a href="https://qianjinfan.netlify.app/">Jinfan Qian</a></p>
        </footer>
        <div className="intro-buttons">
          <button className="quiz-button">什么是禅宗</button>
        </div>
      </main>
      <button className="scroll-down-arrow" onClick={scrollToDirectory}>
        <ArrowRightCircle />
      </button>
    </div>
  );
}

export { Intro as Introsection };
