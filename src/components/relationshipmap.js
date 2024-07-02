import React, { useEffect, useRef, useState } from 'react';
import * as echarts from 'echarts';
import '../App.css'; // 新增数据文件
import zenData from './zentree.json'; // 确保数据文件的路径正确
import zentree2Data from './zentree2.json'; // 新增数据文件
import zentree3Data from './zentree3.json'; // 新增数据文件
import { ArrowRightCircle } from 'react-bootstrap-icons';


function ZenTree() {
  const chartRef = useRef(null);
  const [currentDescription, setCurrentDescription] = useState('');
  const [currentTitle, setCurrentTitle] = useState('');
  const [initialTreeDepth, setInitialTreeDepth] = useState(6); // 默认初始展开层级为5

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
        data: zentree3Data, // 使用新的数据文件
        description: '8世纪后期至9世纪中期的一百多年是南宗迅速兴起的时期。在这期间最引人注目的宗教文化现象是南岳怀让－马祖禅系和青原行思－石头希迁禅系从湘、赣两个流域崛起，迅速传播到各地，并且在各地形成很多传法中心。洪州宗与石头宗并列为唐代禅宗两大派系之一，由六祖惠能门下分出。始于南岳怀让禅师，但它的实际建立者，为洪州道一法师。下开临济、沩仰二宗。',
        title: '洪州禅'
      },
      {
        time: '一花五叶（9~10AD）',
        data: zenData, // 初始数据
        description: '“一花五叶”指禅宗宗派的源流。“一花”指禅宗之源——由达摩传入中国的“如来禅”；“五叶”指禅宗之流——六祖慧能门下的五个宗派。语出宋·释道原《景德传灯录》卷二十八：“一花开五叶，结果自然成。惠能（六祖）门下又有南岳怀让、青原行思二支，为唐末以降，禅宗的主流。南岳门下出“沩仰宗”、“临济宗”；青原门下分“曹洞宗”、“云门宗”、“法眼宗”，是为五家。以后的禅学发展，大抵是不出这五家的范围。',
        title: '一花五叶'
      },
      {
        time: '传入日本（12AD）',
        data: zenData, // 初始数据
        description: '隋唐时代是日本主动汲取中国文化的第一个高峰期，从630年到838年的两百余年间，共有16批遣唐使来到中国，他们如饥似渴地学习唐朝文化的方方面面，包括饮茶文化。唐代饮茶习俗已较为普及，780年前后陆羽《茶经》的问世，更是标志着茶文化的确立。饮茶文化被遣唐使们传到了日本，在这其间，僧人发挥了十分重要的作用。到了南宋中后期，为学习禅宗而入宋的日本僧侣数量激增，有名可考者就有近200人，同时，有越来越多的中国禅僧东渡日本，他们不仅将禅宗传到了日本，也将宋代的制茶、饮茶方法及禅林的饮茶习俗带到了日本。',
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
          top: '45%',
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

  const scrollToRelationshipSection = () => {
    const relationshipsection = document.getElementById('relationshipsection');
    if (relationshipsection) {
      relationshipsection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div style={{ justifyContent: 'center', alignItems: 'center', width: '100%' }}>
      <div style={{ height: '100vh', width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: '#F2F1ED'}}>
        <div id="story-intro-section" className="story-section story-intro-section">
            <div className="story-content">
              <h1>二、禅宗的法脉与传承</h1>
              <p>
                禅宗的发展可以追溯到佛教传入中国以及印度禅宗的传播。南朝时期，达摩祖师来到中国传法，禅宗在中国生根发芽；南北朝时期，惠能和神秀分别创立了禅宗的南北两派，禅宗开始在思维的碰撞中丰富发展；唐宋时期，禅宗枝繁叶茂，分化出不同的宗派，代表人物有曹洞宗的五祖洞山，以及临济宗的一祖石头希达。之后禅宗由僧侣最澄和空海等人传入日本，并在日本京都等地发展壮大，形成了日本禅宗的独特体系，并对日本的文化和思想产生了深远影响。这五个阶段构成了禅宗法脉的传承与发展，为禅宗在中国乃至世界的传播奠定了坚实的基础。接下来我们将探索禅宗的法脉与传承，见证这一人类历史上最深刻的哲学体系的发展。
              </p>
            </div>
            <button className="scroll-down-arrow" onClick={scrollToRelationshipSection}>
              <ArrowRightCircle />
            </button>
          </div>
      </div>
      <div id='relationshipsection' style={{display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', height: '100vh'}}>
        <div style={{ width: '75%', height: '100%', position: 'relative', paddingBottom:'320px' }}>
          <div ref={chartRef} style={{ width: '100%', height: '100%' }}></div>
          <div style={{ position: 'absolute', top: '350px', left: '250px' }}>
            <label htmlFor="depth-select">选择展开层级：</label>
            <select
              id="depth-select"
              value={initialTreeDepth}
              onChange={(e) => setInitialTreeDepth(parseInt(e.target.value, 10))}
            >
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
          <div style={{ position: 'absolute', left: '250px', top: '380px', display:'flex' }}>
            <p style={{marginRight:'5px'}}>禅宗宗派：</p>
            <p><span style={{ backgroundColor: 'rgba(156, 117, 95, 0.6)', padding: '2px 10px', margin:'5px', borderRadius: '4px' }}>禅宗</span></p>
            <p><span style={{ backgroundColor: 'rgba(76, 175, 80, 0.6)', padding: '2px 10px', margin:'5px', borderRadius: '4px' }}>洪州宗</span></p>
            <p><span style={{ backgroundColor: 'rgba(78, 121, 167, 0.6)', padding: '2px 10px', margin:'5px', borderRadius: '4px' }}>曹洞宗</span></p>
            <p><span style={{ backgroundColor: 'rgba(118, 183, 178, 0.6)', padding: '2px 10px', margin:'5px', borderRadius: '4px' }}>临济宗</span></p>
            <p><span style={{ backgroundColor: 'rgba(255, 157, 167, 0.6)', padding: '2px 10px', margin:'5px', borderRadius: '4px' }}>法眼宗</span></p>
            <p><span style={{ backgroundColor: 'rgba(186, 176, 172, 0.6)', padding: '2px 10px', margin:'5px', borderRadius: '4px' }}>云门宗</span></p>
            <p><span style={{ backgroundColor: 'rgba(170, 170, 127, 0.6)', padding: '2px 10px', margin:'5px', borderRadius: '4px' }}>伪仰宗</span></p>
          </div>
          <div style={{ position: 'absolute', left: '1040px', top: '885px' }}>
            <p style={{marginRight:'5px', color: 'rgba(156, 117, 95)'}}>点击人物节点可展开图表</p>
          </div>
        </div>
        <div style={{ width: '25%', height: '100%', padding: '20px', overflowY: 'auto', boxSizing: 'border-box', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <h2 style={{color:'#333'}}>{currentTitle}</h2>
          <p style={{paddingRight:'80px', lineHeight:'1.5', fontSize:'18px',color:'#666'}}>{currentDescription}</p>
          <div style={{ color: '#aaa' }}>
            <p>数据来源：维基百科，百度百科</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export { ZenTree as Relationshipmap };





































