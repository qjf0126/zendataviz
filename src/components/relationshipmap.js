import React, { useEffect, useRef, useState } from 'react';
import * as echarts from 'echarts';
import '../App.css'; // 新增数据文件
import zenData from './zentree.json'; // 确保数据文件的路径正确
import zentree2Data from './zentree2.json'; // 新增数据文件

function ZenTree() {
  const chartRef = useRef(null);
  const [currentDescription, setCurrentDescription] = useState('');
  const [currentTitle, setCurrentTitle] = useState('');
  const [initialTreeDepth, setInitialTreeDepth] = useState(5); // 默认初始展开层级为5

  useEffect(() => {
    const chart = echarts.init(chartRef.current);

    const categoryColorMap = {
      '禅宗': 'rgba(156, 117, 95, 0.6)',
      '禅宗（洪州宗）': 'rgba(76, 175, 80, 0.6)',
      '曹洞宗': 'rgba(78, 121, 167, 0.6)',
      '临济宗': 'rgba(118, 183, 178, 0.6)',
      '法眼宗': 'rgba(255, 157, 167, 0.6)',
      '云门宗': 'rgba(186, 176, 172, 0.6)',
      '伪仰宗': 'rgba(170, 170, 127, 0.6)',
      '禅宗（临济宗）': 'rgba(103, 58, 183, 0.6)'
    };

    const stages = [
      {
        time: '禅宗人物关系图',
        data: zenData, // 初始数据
        description: '中国禅宗的出现是与菩提达摩来中国弘传禅法联系在一起的。南印度的菩提达摩于刘宋末或齐梁时代来华传“南天竺一乘宗”之禅法，被奉为中国禅宗的东土初祖。其传承则一直上溯至传佛心印的摩诃迦叶。据说昔日在灵山法会上，大梵天王向释迦牟尼佛献上了一枝金色波罗花，世尊即“拈花示众”。大众不解其意，皆默然无语。唯有佛陀的大弟子摩诃迦叶心领神会“破颜微笑”。世尊便将“不立文字、教外别传、正法眼藏”的微妙法门传给了摩诃迦叶。这就是禅门著名的“拈花微笑”的典故。',
        title: '禅宗人物关系图'
      },
      {
        time: '南能北秀（7AD）',
        data: zentree2Data, // 使用新的数据文件
        description: '南能北秀，又称南顿北渐，为中国禅宗五祖弘忍门下的神秀与惠能二大弟子见处各异，因而发展成的不同系统禅学。因为开悟观的区别，两派差异则以“南顿北渐”分别。神秀以长安与洛邑为中心教化北方，以循序渐进的方法指导门徒，令其逐渐了解佛法，称为“渐悟”，即北宗禅。惠能以岭南曹溪为中心教化南方，称“曹溪禅”，又称南宗禅，不分阶段、顿速觉悟，则为“顿悟”。惠能之徒神会在滑台大会中与北宗禅辩论胜利，使南宗后来居上，成为了中国禅宗的主流，后世禅宗大多出自此系统。',
        title: '南能北秀'
      },
      {
        time: '洪州禅（8AD）',
        data: zenData, // 初始数据
        description: '洪州宗阶段的描述文本。',
        title: '洪州宗'
      },
      {
        time: '一花五叶（9~10AD）',
        data: zenData, // 初始数据
        description: '一花五叶阶段的描述文本。',
        title: '一花五叶'
      },
      {
        time: '传入日本（12AD）',
        data: zenData, // 初始数据
        description: '传入日本阶段的描述文本。',
        title: '传入日本'
      }
    ];

    const getLineStyle = (category, depth) => {
      const maxLineWidth = 12; // 最大路径宽度
      const minLineWidth = 3; // 最小路径宽度
      const lineWidth = Math.max(maxLineWidth - depth, minLineWidth);
      return {
        color: categoryColorMap[category] || 'rgba(0, 0, 0, 0.6)', // 根据宗派设置路径颜色
        width: lineWidth, // 根据深度设置路径宽度
        opacity: 0.5 // 设置路径透明度
      };
    };

    const transformData = (data, depth = 0) => {
      const result = {
        name: data.name,
        birth_year: data.birth_year,
        death_year: data.death_year,
        category: data.category,
        symbol: data.image ? `image://${data.image}` : 'circle', // 使用图片作为节点
        symbolSize: data.image ? 50 : 7, // 设置图片大小，如果没有图片则使用默认大小
        label: {
          position: 'bottom', // 将文字放在节点下方
          verticalAlign: 'top', // 垂直对齐方式
          align: 'center' // 水平对齐方式
        },
        lineStyle: getLineStyle(data.category, depth),
        emphasis: {
          focus: 'ancestor' // 鼠标悬停时高亮祖先节点
        },
        children: (data.children || []).map(child => transformData(child, depth + 1))
      };
      return result;
    };

    const getOption = (data, description, treeDepth) => ({
      tooltip: {
        trigger: 'item',
        triggerOn: 'mousemove',
        formatter: (params) => {
          const { data } = params;
          const birthYear = data.birth_year ? `生年: ${data.birth_year}` : '生年: 不详';
          const deathYear = data.death_year ? `卒年: ${data.death_year}` : '卒年: 不详';
          const category = data.category ? `宗派: ${data.category}` : '宗派: 不详';
          return `
            <div>
              <strong>${data.name}</strong><br/>
              ${birthYear}<br/>
              ${deathYear}<br/>
              ${category}
            </div>
          `;
        }
      },
      series: [
        {
          type: 'tree',
          data: [transformData(data)],
          left: '20%',
          right: '10%',
          top: '40%',
          initialTreeDepth: treeDepth, // 使用动态的初始展开层级
          label: {
            position: 'bottom', // 将文字放在节点下方
            verticalAlign: 'top', // 垂直对齐方式
            align: 'center' // 水平对齐方式
          },
          leaves: {
            label: {
              position: 'bottom', // 将叶子节点的文字放在节点下方
              verticalAlign: 'top', // 垂直对齐方式
              align: 'center' // 水平对齐方式
            }
          },
          emphasis: {
            focus: 'ancestor', // 鼠标悬停时高亮祖先节点
            itemStyle: {
              borderColor: 'red', // 高亮时的节点边框颜色
              borderWidth: 2
            },
            lineStyle: {
              opacity: 1
            }
          },
          blur: {
            itemStyle: {
              opacity: 0.1 // 鼠标悬停时其他节点变淡
            },
            lineStyle: {
              opacity: 0.1 // 鼠标悬停时其他连线变淡
            }
          },
          expandAndCollapse: true,
          roam: true, // 启用拖拽和平移
          animationDuration: 550,
          animationDurationUpdate: 750,
          layout: 'orthogonal',
          orient: 'LR' // 从左到右布局
        }
      ]
    });

    const timelineOption = {
      baseOption: {
        timeline: {
          axisType: 'category',
          data: stages.map(stage => stage.time),
          autoPlay: false,
          playInterval: 5000,
          currentIndex: 0,
          tooltip: {
            trigger: 'item',
            formatter: function (params) {
              return params.name;
            }
          },
          lineStyle: {
            color: '#C3E5E3' // 设置时间轴的颜色
          },
          itemStyle: {
            color: '#8FCCC7', // 设置时间轴上节点的颜色
            borderColor: '#4D9993', // 设置时间轴上节点的边框颜色
          },
          checkpointStyle: {
            color: '#4D9993', // 设置时间轴当前点的颜色
            borderColor: '#4D9993', // 设置时间轴当前点的边框颜色
          },
          controlStyle: {
            show: true,
            itemSize: 20,
            itemGap: 8,
            normal: {
              color: '#8FCCC7', // 设置时间轴控制按钮的颜色
              borderColor: '#8FCCC7',
            },
            emphasis: {
              color: '#76B7B2', // 设置时间轴控制按钮在鼠标悬停时的颜色
              borderColor: '#76B7B2',
            }
          },
        },
        tooltip: {
          trigger: 'item',
          triggerOn: 'mousemove'
        },
        series: []
      },
      options: stages.map(stage => getOption(stage.data, stage.description, initialTreeDepth))
    };

    chart.setOption(timelineOption);

    // 设置初始值
    const initialStage = stages[0];
    setCurrentDescription(initialStage.description);
    setCurrentTitle(initialStage.title);

    chart.on('timelinechanged', function (params) {
      const currentStage = stages[params.currentIndex];
      setCurrentDescription(currentStage.description);
      setCurrentTitle(currentStage.title);
    });

    // 监听树状图层级改变
    chart.on('updateOption', function () {
      const currentStage = stages[0];
      chart.setOption(getOption(currentStage.data, currentStage.description, initialTreeDepth));
    });

    // 确保在组件卸载时销毁图表实例
    return () => {
      chart.dispose();
    };
  }, [initialTreeDepth]);

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', width: '100%' }}>
      <div style={{ width: '75%', height: '100%', position: 'relative', paddingBottom:'400px' }}>
        <div ref={chartRef} style={{ width: '100%', height: '100%' }}></div>
        <div style={{ position: 'absolute', top: '400px', left: '250px' }}>
          <label htmlFor="depth-select">选择展开层级: </label>
          <select
            id="depth-select"
            value={initialTreeDepth}
            onChange={(e) => setInitialTreeDepth(parseInt(e.target.value, 10))}
          >
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
            <option value="8">8</option>
            <option value="9">9</option>
            <option value="10">10</option>
            <option value="11">11</option>
            <option value="12">12</option>
            <option value="13">13</option>
            <option value="14">14</option>
            <option value="15">15</option>
            <option value="16">16</option>
          </select>
        </div>
      </div>
      <div style={{ width: '25%', height: '100%', padding: '20px', overflowY: 'auto', boxSizing: 'border-box', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <h2>{currentTitle}</h2>
        <p style={{paddingRight:'80px', lineHeight:'1.5', fontSize:'18px'}}>{currentDescription}</p>
      </div>
    </div>
  );
}

export { ZenTree as Relationshipmap };





































