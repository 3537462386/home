<template>
    <div>
        <div class="w-full myhead z-200 bg-white flex justify-center items-center" :class="{ 'show': showButton }">
            <audio src="https:\/\/api.wuenci.com\/meting\/api\/?server=netease&type=url&id=1441758494" controls></audio>
        </div>
        <div class="w-full myfoot z-200 bg-white flex justify-center items-center" :class="{ 'show': !showButton }">
            <div class="lrc">
                <ul>
                    <li v-for="item in lrcData" :key="item.index">{{ item.words }}</li>
                </ul>
            </div>
        </div>
    </div>
</template>
  
<script>
export default {
    data() {
        return {
            showButton: true,
            lastScrollPosition: 0,
            lrcData:[]
        }
    },
    mounted() {
        // 头栏和脚栏出现事件监听
        this.lastScrollPosition = window.scrollY
        window.addEventListener('scroll', this.handleScroll)
        //得到初始歌数据
        this.getSong()
        //监听歌曲
        document.querySelector('audio').addEventListener('timeupdate',
        this.setOffset);

    },
    beforeDestroy() {
        window.removeEventListener('scroll', this.handleScroll)
    },
    methods: {
        handleScroll() {
            const currentScrollPosition = window.scrollY
            if (currentScrollPosition > this.lastScrollPosition && this.showButton === true) {
                this.showButton = false
            } else if (currentScrollPosition < this.lastScrollPosition && this.showButton === false) {
                this.showButton = true
            }
            this.lastScrollPosition = currentScrollPosition
        },
        backToTop() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            })
        },
        changeTheme() {
            this.$store.commit('setTheme')
        },
        //请求歌数据
        async getSong() {
            try {
                const data = await this.$axios.$get('https://api.wuenci.com/meting/api/?server=netease&type=lrc&id=1441758494');
                this.lrcData = this.parseLrc(data);
                console.log(this.lrcData)
            } catch (error) {
                console.error(error);
            }
        },
        // 解析歌词，格式化
        parseLrc(lrc) {
            const lines = lrc.split('\n');
            const result = [];
            for (let i = 0; i < lines.length; i++) {
                const str = lines[i];
                const parts = str.split(']');
                const timeStr = parts[0].substring(1);
                const obj = {
                    time: this.parseTime(timeStr),
                    words: parts[1]
                };
                result.push(obj);
            }
            return result;
        },
        parseTime(timeStr) {
            const parts = timeStr.split(':');
            return +parts[0] * 60 + +parts[1];
        },
        // 得到now 歌词
        findIndex() {
            const audio = document.querySelector('audio')
            const curTime = audio.currentTime;
            for (let i = 0; i < this.lrcData.length; i++) {
                if (curTime < this.lrcData[i].time) {
                    return i - 1;
                }
            }
            //最后一句
            return this.lrcData.length - 1;
        },
        //移动歌词
        setOffset() {
            const ul = document.querySelector('.lrc ul');
            const container = document.querySelector('.lrc');
            const containerHeight = container.clientHeight;
            const liHeight = ul.children[0].clientHeight;
            const maxOffset = ul.clientHeight - containerHeight;
            // 偏移量
            const index = this.findIndex();
            var offset = liHeight * index + liHeight / 2
            - containerHeight / 2;
            if(offset < 0) {
                offset = 0;
            }
            if(offset > maxOffset) {
                offset = maxOffset;
            }
            ul.style.transform = `translateY(-${offset}px)`;
            const li = ul.children[index];
            if(li) {
                li.classList.add('active');
            }
        }

    }
}
</script>
  
<style>
.myhead {
    margin: 0;
    padding: 0;
    position: fixed;
    top: 0;
    right: 0;
    height: 0;
    transition: all 0.5s ease-in-out;
    overflow: hidden;
    border-bottom: 1px solid #ccc;  /* 设置上边框 */
    box-shadow: inset 0px -1px 2px rgba(0, 0, 0, 0.3); /* 添加内阴影 */
}

.myfoot {
    margin: 0;
    padding: 0;
    position: fixed;
    bottom: 0;
    right: 0;
    height: 0;
    transition: all 0.5s ease-in-out;
    overflow: hidden;
    border-top: 1px solid #ccc;  /* 设置上边框 */
    box-shadow: inset 0px 1px 2px rgba(0, 0, 0, 0.3); /* 添加内阴影 */
}

.myhead.show {
    height: 40px;
}

.myfoot.show {
    height: 40px;
}


audio {
    width: 350px;
    height: 35px;
}

.lrc {
    text-align: center;
    overflow: hidden;
    height: 35px;
    width: 350px;
}

.lrc ul {
    transition: 0.6s;
    list-style: none;
}

.lrc li {
    height: 35px;
    line-height: 35px;
}

.lrc li.active {
    color: #000000;
    transform: scale(1.2);
    transition: 0.2s;
}</style>