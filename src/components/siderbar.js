import React, { useState, useEffect } from 'react';
import '../App.css'; // 导入样式文件


function Sidebar() {
    const [activeButton, setActiveButton] = useState('I');
  
    const handleScroll = () => {
      const sections = document.querySelectorAll('.section');
      sections.forEach((section) => {
        const top = section.getBoundingClientRect().top;
        if (top >= 0 && top < window.innerHeight / 2) {
          setActiveButton(section.getAttribute('data-section'));
        }
      });
    };
  
    const handleClick = (sectionId) => {
      document.getElementById(sectionId).scrollIntoView({ behavior: 'smooth' });
    };
  
    useEffect(() => {
      window.addEventListener('scroll', handleScroll);
      return () => {
        window.removeEventListener('scroll', handleScroll);
      };
    }, []);

  return (
    <div className="sidebar">
      <button className={`nav-button ${activeButton === 'I' ? 'active' : ''}`} onClick={() => document.getElementById('section-I').scrollIntoView({ behavior: 'smooth' })}>I</button>
      <button className={`nav-button ${activeButton === 'II' ? 'active' : ''}`} onClick={() => document.getElementById('section-II').scrollIntoView({ behavior: 'smooth' })}>II</button>
      <button className={`nav-button ${activeButton === 'III' ? 'active' : ''}`} onClick={() => document.getElementById('section-III').scrollIntoView({ behavior: 'smooth' })}>III</button>
      <button className={`nav-button ${activeButton === 'IV' ? 'active' : ''}`} onClick={() => document.getElementById('section-IV').scrollIntoView({ behavior: 'smooth' })}>IV</button>
      <button className={`nav-button ${activeButton === 'V' ? 'active' : ''}`} onClick={() => document.getElementById('section-V').scrollIntoView({ behavior: 'smooth' })}>V</button>
    </div>
  );
}

export default Sidebar;


export { Sidebar as Siderbar };
