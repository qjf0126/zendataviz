import React, { useState, useEffect } from 'react';
import ReactEcharts from 'echarts-for-react';
import influence from './influence.json';
import influence2 from './influence2.json';
import { ArrowRightCircle } from 'react-bootstrap-icons';

const Influence = () => {
  const [selectedPerson, setSelectedPerson] = useState({
    name: '梁武帝',
    year: '464-549',
    dynasty: '南朝',
    position: '皇帝',
    description: '佛教支持者，达摩祖师与梁武帝的对话成为了禅宗著名的公案。尔时武帝问：“如何是圣谛第一义?”师日：“廓然无圣。”帝日：“对联者谁?”师日：“不识。”又问：“朕自登九五已来，度人造寺，写经造像，有何功德?”师日：“无功德。”帝日：“何以无功德?”师曰：“此是人天小果，有漏之因，如影随形。虽有善因，非是实相。”武帝问：“如何是真功德?”师曰：“净智妙圆，体自空寂。如是功德，不以世求。”武帝不了达摩所言，变容不言。达摩其年十月十九日，自知机不契，则潜过江北，入于魏邦。（据《祖堂集》卷二）',
    avatar: 'img/梁武帝像.png'
  }); // 默认选中梁武帝
  const [dataSource, setDataSource] = useState('朝代'); // 用于存储当前选择的数据来源
  const [data, setData] = useState(influence); // 默认使用 influence.json 作为数据来源
  const [selectedDynasty, setSelectedDynasty] = useState(null); // 存储当前选中的朝代
  const [barColor, setBarColor] = useState('#B2A78F'); // 默认条形图颜色

  useEffect(() => {
    // 根据数据来源选择不同的 JSON 文件
    if (dataSource === '朝代') {
      setData(influence);
    } else {
      setData(influence2);
    }
    setSelectedDynasty(null); // 重置选中的朝代或职业组
    setBarColor('#B2A78F'); // 重置条形图颜色
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
        radius: [0, '80%'], // 调整圆盘图的尺寸
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

  const getBarOption = () => {
    let barData;
    if (dataSource === '朝代') {
      let occupationData;
      if (selectedDynasty) {
        const dynastyData = data.children.find(dynasty => dynasty.name === selectedDynasty);
        occupationData = dynastyData ? dynastyData.children.map(person => person.position) : [];
      } else {
        occupationData = data.children.flatMap(dynasty =>
          dynasty.children.map(person => person.position)
        );
      }

      const occupationCount = occupationData.reduce((acc, occupation) => {
        acc[occupation] = (acc[occupation] || 0) + 1;
        return acc;
      }, {});

      barData = {
        xAxis: {
          type: 'category',
          data: Object.keys(occupationCount)
        },
        yAxis: {
          type: 'value'
        },
        series: [{
          data: Object.values(occupationCount),
          type: 'bar',
          itemStyle: {
            color: barColor // 使用动态颜色
          }
        }]
      };
    } else {
      let dynastyData;
      if (selectedDynasty) {
        const occupationGroup = data.children.find(group => group.name === selectedDynasty);
        dynastyData = occupationGroup ? occupationGroup.children.map(person => person.dynasty) : [];
      } else {
        dynastyData = data.children.flatMap(group =>
          group.children.map(person => person.dynasty)
        );
      }

      const dynastyCount = dynastyData.reduce((acc, dynasty) => {
        acc[dynasty] = (acc[dynasty] || 0) + 1;
        return acc;
      }, {});

      barData = {
        xAxis: {
          type: 'category',
          data: Object.keys(dynastyCount)
        },
        yAxis: {
          type: 'value'
        },
        series: [{
          data: Object.values(dynastyCount),
          type: 'bar',
          itemStyle: {
            color: barColor // 使用动态颜色
          }
        }]
      };
    }

    return barData;
  };

  const handleChartClick = (params) => {
    if (params.data) {
      if (params.data.children && params.data.name) {
        setSelectedDynasty(params.data.name); // 设置选中的朝代或职业组
        setBarColor(params.data.itemStyle.color); // 设置条形图颜色为选中组的颜色
      }
      if (params.data.avatar && params.data.description) {
        setSelectedPerson(params.data); // 设置选中的人物信息
      }
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

      <div id='influencesection' style={{ display: 'flex', alignItems: 'flex-start', width: '100%', height: '100vh', position: 'relative' }}>
        <div style={{ position: 'absolute', top: '80px', left: '850px', zIndex: 1 }}>
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
        <div style={{ textAlign: 'center', color: '#aaa', position: 'absolute', top: '800px', left: '880px', zIndex: 1 }}>
          <p>点击人物查看详细信息</p>
        </div>
        <div style={{ width: '75%', height: '100%' }}>
          <ReactEcharts
            option={getOption()}
            style={{ height: '80%', width: '100%', marginBottom: '-60px' }}
            onEvents={{ 'click': handleChartClick }} // 注册点击事件处理函数
            onChartReady={onChartReady} // 注册图表加载完成事件
          />
          <ReactEcharts
            option={getBarOption()}
            style={{ height: '22%', width: '65%', margin: 'auto' }}
          />
        </div>
        <div style={{ width: '25%', height: '80%', padding: '20px 140px 40px 80px', overflowY: 'auto', borderLeft: '1px solid #ccc', margin: 'auto' }}>
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


















