"use strict";
import IScroll from './iscroll-modified-version';
const scroll = function (id,height,load) {
    return new IScroll(id, {
        probeType: 3,
        momentum: true,//关闭惯性滑动
        mouseWheel: true,//鼠标滑轮开启
        scrollbars: false,//滚动条可见
        fadeScrollbars: true,//滚动条渐隐
        interactiveScrollbars: true,//滚动条可拖动
        // shrinkScrollbars: 'scale', // 当滚动边界之外的滚动条是由少量的收缩
        useTransform: true,//CSS转化
        useTransition: true,//CSS过渡
        bounce: true,//反弹
        freeScroll: true,//只能在一个方向上滑动
        click: true,
        load: load,
        loadHeight: height
//        snap: "li",//以 li 为单位
    });
};
export default (options)=> {
    let container = scroll(options.container,options.height, options.isLoad);
    let loadUp = true;
    function positionJudge() {
        if(options.isLoad){
            if (this.y > (options.height + 20) && loadUp) {
                // up为释放加载
                options.loadUp && options.loadUp();
                loadUp = false;
            }
        }

    }

    function action() {
        if(options.isLoad){
            if (this.y === options.height) {
                options.loaded && options.loaded(()=>{
                    this.scrollTo(0, 0, 100);
                });
            } else if (this.y === 0) {
                options.loadEnd && options.loadEnd();
                loadUp = true;
            }
        }
        if(this.y > 0 && loadUp){
            this.scrollTo(0, 0, 0);
        }
    }


    function load(){
        if(options.isLoad){
            options.theLoad && options.theLoad();
        }

    }

    container.on('scroll', positionJudge);
    container.on('scrollEnd', action);
    container.on('scrollLoad', load);
    return container
}
