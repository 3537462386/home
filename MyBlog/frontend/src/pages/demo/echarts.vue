<template>
    <div class="container">
        <header>
            <h1>数据可视化-Echart</h1>
            <div class="showTime">{{ nowTime }}</div>
        </header>

        <section class="mainbox">
            <div class="column">
                <div class="panel bar">
                    <h2>柱形图-就业行业</h2>
                    <div class="chart"></div>
                    <div class="panel-footer"></div>
                </div>
                <div class="panel line">
                    <h2>
                        折线图-人员变化 <a href="javacript:;">2020</a><a href="javascript:;">2021</a>
                    </h2>
                    <div class="chart">图表</div>
                    <div class="panel-footer"></div>
                </div>
                <div class="panel pie">
                    <h2>饼形图-年龄分布</h2>
                    <div class="chart">图表</div>
                    <div class="panel-footer"></div>
                </div>
            </div>
            <div class="column">
                <!-- no模块制作 -->
                <div class="no">
                    <div class="no-hd">
                        <ul>
                            <li>125811</li>
                            <li>100000</li>
                        </ul>
                    </div>
                    <div class="no-bd">
                        <ul>
                            <li>前端需求人数</li>
                            <li>市场供应人数</li>
                        </ul>
                    </div>
                </div>
                <!-- 地图模块 -->
                <div class="map">
                    <div class="map1"></div>
                    <div class="map2"></div>
                    <div class="map3"></div>
                    <div class="chart"></div>
                </div>
            </div>
            <div class="column">
                <div class="panel bar2">
                    <h2>柱形图-就业行业</h2>
                    <div class="chart">图表</div>
                    <div class="panel-footer"></div>
                </div>
                <div class="panel line2">
                    <h2>折线图-播放量</h2>
                    <div class="chart">图表</div>
                    <div class="panel-footer"></div>
                </div>
                <div class="panel pie2">
                    <h2>饼形图-地区分布</h2>
                    <div class="chart">图表</div>
                    <div class="panel-footer"></div>
                </div>
            </div>
        </section>
    </div>
</template>

<script setup>
const nowTime = ref(0);
onMounted(() => {
    responsive();
    getNowTime();
    window.addEventListener('resize', responsive);
    window.addEventListener('pageShow', responsive);
    window.addEventListener('DOMContentLoaded', responsive);
})
const responsive = () => {
    const w = window.innerWidth / 24;
    document.documentElement.style.fontSize = w + 'px';
}
const getNowTime = () => {
    var t = null;
    const time = () => {
        clearTimeout(t);
        const dt = new Date();
        const y = dt.getFullYear();
        const mt = dt.getMonth() + 1;
        const day = dt.getDate();
        const h = dt.getHours();
        const m = dt.getMinutes();
        const s = dt.getSeconds();
        nowTime.value = '当前时间: '
            + y + '年' + mt + '月' + day + '日' + '-' + h + '时' + m + '分' + s + '秒';
        t = setTimeout(time, 1000);
    }
    t = setTimeout(time, 1000);
}
</script>

<style scoped lang="less">
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

.container {
    background: url(@/assets/image/demo/bg.jpg) no-repeat top center;
    line-height: 1.15;
}

li {
    list-style: none;
}

/* 声明字体*/
@font-face {
    font-family: electronicFont;
    src: url(@/assets/image/demo/DS-DIGIT.TTF);
}

header {
    position: relative;
    height: 1.25rem;
    background: url(@/assets/image/demo/head_bg.png) no-repeat;
    background-size: 100% 100%;

    h1 {
        font-size: .475rem;
        color: #fff;
        text-align: center;
        line-height: 1rem;
    }

    .showTime {
        position: absolute;
        top: 0;
        right: 0.375rem;
        line-height: 0.9375rem;
        color: rgba(255, 255, 255, 0.7);
        font-size: 0.25rem;
    }
}

.mainbox {
    display: flex;
    min-width: 1024px;
    max-width: 1920px;
    margin: 0 auto;
    padding: 0.125rem 0.125rem 0;

    .column {
        flex: 3;
    }

    .column:nth-child(2) {
        flex: 5;
        margin: 0 0.125rem 0.1875rem;
        overflow: hidden;
    }

    .panel {
        position: relative;
        height: 3.875rem;
        padding: 0 0.1875rem 0.5rem;
        border: 1px solid rgba(25, 186, 139, 0.17);
        margin-bottom: 0.1875rem;
        background: url(@/assets/image/demo/line.png) rgba(255, 255, 255, 0.03);

        &::before {
            position: absolute;
            top: 0;
            left: 0;
            width: 10px;
            height: 10px;
            border-left: 2px solid #02a6b5;
            border-top: 2px solid #02a6b5;
            content: "";
        }

        &::after {
            position: absolute;
            top: 0;
            right: 0;
            width: 10px;
            height: 10px;
            border-right: 2px solid #02a6b5;
            border-top: 2px solid #02a6b5;
            content: "";
        }

        .panel-footer {
            position: absolute;
            bottom: 0;
            left: 0;
            width: 100%;

            &::before {
                position: absolute;
                left: 0;
                bottom: 0;
                width: 10px;
                height: 10px;
                border-left: 2px solid #02a6b5;
                border-bottom: 2px solid #02a6b5;
                content: "";
            }

            &::after {
                position: absolute;
                bottom: 0;
                right: 0;
                width: 10px;
                height: 10px;
                border-right: 2px solid #02a6b5;
                border-bottom: 2px solid #02a6b5;
                content: "";
            }
        }

        h2 {
            height: 0.6rem;
            color: #fff;
            line-height: 0.6rem;
            text-align: center;
            font-size: 0.25rem;
            font-weight: 400;

            a {
                color: #fff;
                text-decoration: none;
                margin: 0 0.125rem;
            }
        }

        .chart {
            height: 3rem;
        }
    }
}

.no {
    background: rgba(101, 132, 226, 0.1);
    padding: 0.1875rem;

    .no-hd {
        position: relative;
        border: 1px solid rgba(25, 186, 139, 0.17);

        &::before {
            position: absolute;
            top: 0;
            left: 0;
            content: "";
            width: 30px;
            height: 10px;
            border-top: 2px solid #02a6b5;
            border-left: 2px solid #02a6b5;
        }

        &::after {
            position: absolute;
            bottom: 0;
            right: 0;
            content: "";
            width: 30px;
            height: 10px;
            border-right: 2px solid #02a6b5;
            border-bottom: 2px solid #02a6b5;
        }

        ul {
            display: flex;

            li {
                position: relative;
                flex: 1;
                line-height: 1rem;
                font-size: 0.875rem;
                color: #ffeb7b;
                text-align: center;
                font-family: "electronicFont";

                &::after {
                    content: "";
                    position: absolute;
                    top: 25%;
                    right: 0;
                    height: 50%;
                    width: 1px;
                    background: rgba(255, 255, 255, 0.2);
                }
            }
        }
    }

    .no-bd {
        ul {
            display: flex;

            li {
                flex: 1;
                text-align: center;
                color: rgba(255, 255, 255, 0.7);
                font-size: 0.225rem;
                height: 0.5rem;
                line-height: 0.5rem;
                padding-top: 0.125rem;
            }
        }
    }
}

.map {
    position: relative;
    height: 10.125rem;

    .map1 {
        width: 6.475rem;
        height: 6.475rem;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: url(@/assets/image/demo/map.png);
        background-size: 100% 100%;
        opacity: 0.3;
    }

    .map2 {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 8.0375rem;
        height: 8.0375rem;
        background: url(@/assets/image/demo/lbx.png);
        animation: rotate1 15s linear infinite;
        opacity: 0.6;
        background-size: 100% 100%;
    }

    .map3 {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 7.075rem;
        height: 7.075rem;
        background: url(@/assets/image/demo/jt.png);
        animation: rotate2 10s linear infinite;
        opacity: 0.6;
        background-size: 100% 100%;
    }

    .chart {
        position: absolute;
        top: 0;
        left: 0;
        // background-color: pink;
        width: 100%;
        height: 10.125rem;
    }

    @keyframes rotate1 {
        form {
            transform: translate(-50%, -50%) rotate(0deg);
        }

        to {
            transform: translate(-50%, -50%) rotate(360deg);
        }
    }

    @keyframes rotate2 {
        form {
            transform: translate(-50%, -50%) rotate(0deg);
        }

        to {
            transform: translate(-50%, -50%) rotate(-360deg);
        }
    }
}

/* 约束屏幕尺寸 */
@media screen and (max-width: 1024px) {
    html {
        font-size: 42px !important;
    }
}

@media screen and (min-width: 1920px) {
    html {
        font-size: 80px !important;
    }
}</style>