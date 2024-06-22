import React, { useState, useEffect } from 'react';
import ReactEcharts from 'echarts-for-react';
import influence from './influence.json';
import influence2 from './influence2.json';
import { ArrowRightCircle } from 'react-bootstrap-icons';

const Influence = () => {
  const [selectedPerson, setSelectedPerson] = useState(null); // 用于存储当前选中的人物信息
  const [dataSource, setDataSource] = useState('朝代'); // 用于存储当前选择的数据来源
  const [data, setData] = useState(influence); // 默认使用 influence.json 作为数据来源

  useEffect(() => {
    // 根据数据来源选择不同的 JSON 文件
    if (dataSource === '朝代') {
      setData(influence);
    } else {
      setData(influence2);
    }
  }, [dataSource]);

  const getOption = () => {
    const processedData = {
      ...data,
      children: data.children.map(dynasty => ({
        ...dynasty,
        children: dynasty.children.map(person => ({
          ...person,
          label: {
            formatter: person.name
          }
        }))
      }))
    };

    return {
      tooltip: {
        trigger: 'item',
        triggerOn: 'mousemove',
        formatter: (params) => {
          const { data } = params;
          const year = data.year ? `生卒年: ${data.year}` : '生卒年: 不详';
          const position = data.position ? `职业: ${data.position}` : '职业: 不详';
          const dynasty = data.dynasty ? `朝代: ${data.dynasty}` : '朝代: 不详';
          return `
            <div>
              <strong>${data.name}</strong><br/>
              ${year}<br/>
              ${position}<br/>
              ${dynasty}<br/>
            </div>
          `;
        }
      },
      series: {
        type: 'sunburst',
        data: [processedData],
        radius: [0, '100%'],
        label: {
          rotate: 'radial'
        },
        emphasis: {
          focus: 'ancestor'
        },
        itemStyle: {
          borderColor: '#fff',
          borderWidth: 2
        },
        levels: [{}, {
          r0: '15%',
          r: '35%',
          label: {
            rotate: 'tangential'
          }
        }, {
          r0: '35%',
          r: '70%',
          label: {
            align: 'center',
            fontSize: 20, // 调整朝代文字大小
            fontFamily: 'MaShanZheng, sans-serif', // 修改字体
            color: "#665347"
          }
        }, {
          r0: '70%',
          r: '72%',
          label: {
            position: 'outside',
            padding: 3,
            silent: false
          },
          itemStyle: {
            borderWidth: 3
          }
        }],
        nodeClick: 'link'
      }
    };
  };

  // 处理点击事件并设置选中的人物信息
  const handleChartClick = (params) => {
    console.log('Event triggered'); // 调试输出，确认事件触发
    console.log('Event params:', params); // 调试输出，查看事件参数
    if (params.data) {
      console.log('Clicked node data:', params.data); // 调试输出，查看点击的节点数据
      if (params.data.avatar && params.data.description) {
        setSelectedPerson(params.data); // 设置选中的人物信息
      } else {
        console.log('Missing avatar or description:', params.data); // 调试输出，缺少 avatar 或 description
      }
    } else {
      console.log('Event data is missing'); // 调试输出，查看数据类型
    }
  };

  const onChartReady = () => {
    console.log('Chart is ready'); // 调试输出，确认图表加载完成
  };

  const scrollToInfluenceSection = () => {
    const influencesection = document.getElementById('influencesection');
    if (influencesection) {
      influencesection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div>
      <div style={{ height: '100vh', width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: '#F2F1ED'}}>
        <div id="story-intro-section" className="story-section story-intro-section">
          <div className="story-content">
            <h1>四、禅宗思想的影响</h1>
            <p>
              禅宗思想的流传如同一条无形的河流，滋养着中国古代社会的方方面面。禅宗的发展的过程中，无数文人墨客参与其中并丰富了禅宗思想。同时，禅宗思想也渗透到了文学、哲学和政治等诸多方面。南北朝时期，禅宗在中国生根发芽，梁武帝与达摩祖师的对话便成为了禅宗著名的公案；唐朝时期，禅宗的影响力迅速扩大，许多文人和官员受到了禅宗思想的熏陶，他们在文学作品中融入了禅宗的哲理，使禅宗思想得以广泛传播；宋朝则是禅宗与世俗相互融合的重要时期，推动了宋代理学、茶文化的发展。从南朝到唐，再到宋，禅宗悄然影响着一代又一代的文人墨客，丰富了他们的思想，提升了他们的心灵。让我们翻开这幅禅宗思想与历史人物交织的画卷，感受禅宗在中国历史中的深刻印记。
            </p>
          </div>
          <button className="scroll-down-arrow" onClick={scrollToInfluenceSection}>
            <ArrowRightCircle />
          </button>
        </div>
      </div>

      <div id='influencesection' style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', height: '100vh', position: 'relative' }}>
        <div style={{ position: 'absolute', top: '150px', left: '850px', zIndex: 1 }}>
          <div style={{ marginBottom: '20px', fontSize:'18px', color:'#666' }}>
            禅宗相关的非僧侣人物
          </div>
          <div style={{ marginBottom: '10px', fontSize:'16px', color:'#666' }}>
            <label>
              <input
                type="radio"
                value="朝代"
                checked={dataSource === '朝代'}
                onChange={(e) => setDataSource(e.target.value)}
              />
              按照朝代划分
            </label>
          </div>
          <div style={{ marginBottom: '10px', fontSize:'16px', color:'#666' }}>
            <label>
              <input
                type="radio"
                value="职业"
                checked={dataSource === '职业'}
                onChange={(e) => setDataSource(e.target.value)}
              />
              按照职业划分
            </label>
          </div>
        </div>
        <div style={{ width: '70%' }}>
          <ReactEcharts
            option={getOption()}
            style={{ height: '800px', width: '100%' }}
            onEvents={{ 'click': handleChartClick }} // 注册点击事件处理函数
            onChartReady={onChartReady} // 注册图表加载完成事件
          />
        </div>
        <div style={{ width: '25%', height: '70%', padding: '20px 140px 40px 80px', overflowY: 'auto', borderLeft: '1px solid #ccc' }}>
          {selectedPerson ? (
            <div>
              <img src={selectedPerson.avatar} alt={selectedPerson.name} style={{ width: '60%', borderRadius: '8px', marginTop:'40px' }} /> {/* 显示人物头像 */}
              <div style={{ marginTop: '40px' }}>
                <h2 style={{color:'#333'}}>{selectedPerson.name}</h2> {/* 显示人物名称 */}
                <p style={{lineHeight:'1.5',fontSize:'18px',color:'#666'}}>{selectedPerson.description}</p> {/* 显示人物描述 */}
              </div>
            </div>
          ) : (
            <div style={{ textAlign: 'center', color: '#aaa' }}>
              <p>点击左侧图表中的人物以查看详细信息</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export { Influence as Influencemap };
















