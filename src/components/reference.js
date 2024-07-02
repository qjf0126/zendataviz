import React from 'react';
import '../App.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

// 导入文件
import ZenDistribution from '../assets/data/禅宗祖庭分布.xlsx';
import ZenRelations from '../assets/data/禅宗人物关系图谱.xlsx';
import ZenNonMonkFigures from '../assets/data/禅宗相关人物.xlsx';

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
    url: ZenDistribution,
    download: true
  },
  {
    id: 5,
    title: '禅宗人物关系图谱数据',
    url: ZenRelations,
    download: true
  },
  {
    id: 6,
    title: '禅宗相关人物数据',
    url: ZenNonMonkFigures,
    download: true
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
            {ref.download && (
              <a href={ref.url} download className="download-icon">
                <i className="bi bi-download"></i>
              </a>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export { Reference as Referencesection };


