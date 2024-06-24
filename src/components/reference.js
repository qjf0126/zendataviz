import React from 'react';
import '../App.css';

const references = [
  {
    id: 1,
    title: '维基百科',
    url: 'https://zh.wikipedia.org/wiki/Wikipedia'
  },
  {
    id: 2,
    title: '百度百科',
    url: 'https://baike.baidu.com/'
  },
  {
    id: 3,
    title: 'Google Scholar',
    url: 'https://scholar.google.com/'
  },
  {
    id: 4,
    title: '禅宗祖庭分布数据',
    url: '/assets/data/table1.xlsx'
  },
  {
    id: 5,
    title: '禅宗人物关系图谱数据',
    url: '/assets/data/table2.xlsx'
  },
  {
    id: 6,
    title: '禅宗相关非僧侣人物数据',
    url: '/assets/data/table3.xlsx'
  }
];

const Reference = () => {
  return (
    <div className="reference-container">
      <h2>五、数据来源，数据下载</h2>
      <ul className="reference-list">
        {references.map((ref) => (
          <li key={ref.id} className="reference-item">
            <a href={ref.url} target="_blank" rel="noopener noreferrer">{ref.title}</a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export {Reference as Referencesection};
