import scrollInit from './scroll-init';
const newScroll = function (id) {
    return scrollInit({
        container: id,
        isLoad: true,
        height: 40,
        loadUp: ()=> {
            document.querySelector('.pullDownName').innerHTML = '释放更新...'
        },
        theLoad: ()=> {
            document.querySelector('.pullDownName').innerHTML = '加载中...';
        },
        loaded: (scrollTo)=> {
            setTimeout(()=> {
                scrollTo()
            }, 1000)
        },
        loadEnd: ()=> {
            document.querySelector('.pullDownName').innerHTML = '下拉刷新...';
        }
    });
};
let scroll = newScroll('#day-wrapper');