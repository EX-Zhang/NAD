/*大屏*/
var geoCoordMap = {'池州远航':[117.55,30.742],'九江': [116.00, 29.70],    '上海': [121.4648, 31.2891],      '丽水': [119.5642, 28.1854],
    '北京': [116.4551, 40.2539],    '北海': [109.314, 21.6211],    '南京': [118.8062, 31.9208],
    '南昌': [116.0046, 28.6633],    '南通': [121.1023, 32.1625],   '厦门': [118.1689, 24.6478],    '合肥': [117.29, 32.0581],
    '嘉兴': [120.9155, 30.6354],
    '大连': [122.2229, 39.4409],
    '天津': [117.4219, 39.4189],
    '太原': [112.3352, 37.9413],
    '威海': [121.9482, 37.1393],
    '宁波': [121.5967, 29.6466],
    '宿迁': [118.5535, 33.7775],
    '常州': [119.4543, 31.5582],
    '广州': [113.5107, 23.2196],
    '徐州': [117.5208, 34.3268],
    '德州': [116.6858, 37.2107],
    '扬州': [119.4653, 32.8162],
    '无锡': [120.3442, 31.5527],
    '杭州': [119.5313, 29.8773],    '武汉': [114.3896, 30.6628],    '汕头': [117.1692, 23.3405],    '江门': [112.6318, 22.1484],
    '沈阳': [123.1238, 42.1216],    '沧州': [116.8286, 38.2104],    '河源': [114.917, 23.9722],    '泉州': [118.3228, 25.1147],
    '海口': [110.3893, 19.8516],
    '淮安': [118.927, 33.4039],
    '温州': [120.498, 27.8119],    '湖州': [119.8608, 30.7782],    '盐城': [120.2234, 33.5577],    '福州': [119.4543, 25.9222],
    '绍兴': [120.564, 29.7565],    '舟山': [122.2559, 30.2234],    '苏州': [120.6519, 31.3989],    '莱芜': [117.6526, 36.2714],
    '菏泽': [115.6201, 35.2057],    '营口': [122.4316, 40.4297],    '衡水': [115.8838, 37.7161],    '衢州': [118.6853, 28.8666],
    '连云港': [119.1248, 34.552],    '金华': [120.0037, 29.1028],    '镇江': [119.4763, 31.9702],    '青岛': [120.4651, 36.3373],
    '安庆': [116.7517, 30.5255],'铜陵': [117.9382, 30.9375],'马鞍山': [118.6304, 31.5363],'芜湖': [118.3557, 31.0858]
};

var SHData = [
    [{name: '池州远航'}, {name: '九江',value: 200 }],  [{name: '南京'}, {name: '池州远航',value: 200 }],
    [{name: '池州'}, {name: '武汉',value: 30  }],      [{name: '池州远航'}, {name: '芜湖', value: 20    }],
    [{name: '池州远航'}, {name: '安庆',value: 70}],    [{name: '池州远航'}, {name: '南京',value: 60}],
	[{name: '池州远航'}, {name: '铜陵',value: 60}],   [{name: '池州远航'}, {name: '马鞍山',value: 60}],
];


var planePath = 'path://M.6,1318.313v-89.254l-319.9-221.799l0.073-208.063c0.521-84.662-26.629-121.796-63.961-121.491c-37.332-0.305-64.482,36.829-63.961,121.491l0.073,208.063l-319.9,221.799v89.254l330.343-157.288l12.238,241.308l-134.449,92.931l0.531,42.034l175.125-42.917l175.125,42.917l0.531-42.034l-134.449-92.931l12.238-241.308L1705';

var convertData = function (data) {
    var res = [];
    for (var i = 0; i < data.length; i++) {
        var dataItem = data[i];
        var fromCoord = geoCoordMap[dataItem[0].name];
        var toCoord = geoCoordMap[dataItem[1].name];
        if (fromCoord && toCoord) {
            res.push([{
                coord: fromCoord
            }, {
                coord: toCoord
            }]);
        }
    }
    return res;
};

var color = ['#3ed4ff', '#ffa022', '#a6c84c'];
var series = [];
[
    
    ['池州', SHData]
].forEach(function (item, i) {
    series.push({
        name: item[0] + ' ',
        type: 'lines',
        zlevel: 1,
        effect: {
            show: true,
            period: 6,
            trailLength: 0.7,
            color: '#fff',
            symbolSize: 3
        },
        lineStyle: {
            normal: {
                color: color[i],
                width: 0,
                curveness: 0.2
            }
        },
        data: convertData(item[1])
    }, {
        name: item[0] + ' ',
        type: 'lines',
        zlevel: 2,
        effect: {
            show: true,
            period: 6,
            trailLength: 0,
            symbol: planePath,
            symbolSize: 15
        },
        lineStyle: {
            normal: {
                color: color[i],
                width: 1,
                opacity: 0.4,
                curveness: 0.2
            }
        },
        data: convertData(item[1])
    }, {
        name: item[0] + ' ',
        type: 'effectScatter',
        coordinateSystem: 'geo',
        zlevel: 2,
        rippleEffect: {
            brushType: 'stroke'
        },
        label: {
            normal: {
                show: true,
                position: 'right',
                formatter: '{b}'
            }
        },
        symbolSize: function (val) {
            return val[2] / 8;
        },
        itemStyle: {
            normal: {
                color: color[i]
            }
        },
        data: item[1].map(function (dataItem) {
            return {
                name: dataItem[1].name,
                value: geoCoordMap[dataItem[1].name].concat([dataItem[1].value])
            };
        })
    });
});

option = {
    //backgroundColor: '#080a20',
    title: {
        left: 'left',
        textStyle: {
            color: '#fff'
        }
    },
    tooltip: {
        trigger: 'item'
    },
    legend: {
        orient: 'vertical',
        top: 'bottom',
        left: 'right',
        data: ['池州远航'],
        textStyle: {
            color: '#fff'
        },
        selectedMode: 'single'
    },
    geo: {
        map: 'china',center: [117.55,30.742],
        zoom: 17.2,
        label: {
            emphasis: {
                show: true
            }
        },
        roam: true,
        itemStyle: {
            normal: {
                areaColor: '#142957',opacity:0.9,
                borderColor: '#0692a4'
            },
            emphasis: {
                areaColor: '#0b1c2d'
            }
        }
    },
    series: series
};
var myecharts = echarts.init($('.map ')[0])
myecharts.setOption(option)