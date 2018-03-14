/**
 promise
 * @Desc:
 *      简单垂直滚动
 * @Demo:
 * new SimpleScroll({
        wrap:'wrap',//包裹容器id
        ul:'ul',//内容容器 .class tagName
        bar:'.class',//bar .class tagName
        start:function () {

        },
        end:function () {

        }
    });
    simpleScroll.reload();
    simpleScroll.scrollToEle();
 */

function SimpleScroll(opt) {
    this.speed = opt.speed || 20;
    //最外层包裹容器
    this.wrapDOM = _$(document,opt.wrap);
    //实际内容
    this.ulDOM = _$(this.wrapDOM,opt.ul);
    //实际内容的包裹容器 如果没设置ul的父元素，则取最外层容器
    this.ulParDOM = opt.ulPar ? _$(this.wrapDOM,opt.ulPar) : this.wrapDOM;
    //拖动区域
    this.barDOM = _$(this.wrapDOM,opt.bar);
    this.barChildDOM = this.barDOM.children[0];

    this.top = this.ulDOM.offsetTop;
    this.ulDOM.style.position = 'absolute';

    $.extend(true,this,opt);
    this.init();
};

SimpleScroll.prototype.init = function () {
    this.initScroll();
    this.dargBar();
};

//mouse wheel
SimpleScroll.prototype.mousewheel = function(wheelFn){
    if (window.navigator.userAgent.indexOf('Firefox') != -1){
        this.wrapDOM.addEventListener('DOMMouseScroll', fn, false);
    }else{
        _bindEvent(this.wrapDOM,'mousewheel',fn);
    }
    function fn(ev){
        var oEvent = ev || event;
        var isDown;
        if (oEvent.wheelDelta){
            if(oEvent.wheelDelta < 0){
                isDown = true;
            }else{
                isDown = false;
            }
        }else{
            if(oEvent.detail > 0){
                isDown = true;
            }else{
                isDown = false;
            }
        }
        wheelFn && wheelFn(isDown);
        ev && ev.preventDefault();
        return false;
    };
};

//drag bar
SimpleScroll.prototype.dargBar = function () {
    var that = this;
    this.barChildDOM.onmousedown=function(ev){
        var oEvent=ev||event;
        var disY=oEvent.clientY-this.offsetTop;
        document.onmousemove=function(ev){
            var oEvent=ev||event;
            var t=oEvent.clientY-disY;
            that.setPos(t);
        };
        document.onmouseup=function()
        {
            document.onmousemove=document.onmouseup=null;
        };
        return false;
    };
};

//reload
SimpleScroll.prototype.reload = function () {

};

//init scroll
SimpleScroll.prototype.initScroll = function () {
    if(this.ulDOM.offsetHeight<=this.ulParDOM.offsetHeight){
        this.barDOM.style.display='none';
    }else{
        this.barChildDOM.style.height=this.ulParDOM.offsetHeight/this.ulDOM.offsetHeight*(this.barDOM.offsetHeight)+'px';
        var that = this;
        this.mousewheel(function(isDown){
            var top = isDown ? that.barChildDOM.offsetTop+that.speed : that.barChildDOM.offsetTop-that.speed;
            that.setPos(top);
        });
    }
};

//设置内容区top值 spanFn
SimpleScroll.prototype.setPos = function(t){
    if(t<0)t=0;
    if(t>this.barDOM.offsetHeight-this.barChildDOM.offsetHeight)t=this.barDOM.offsetHeight-this.barChildDOM.offsetHeight;
    this.barChildDOM.style.top=t+'px';
    var bili=(t)/(this.barDOM.offsetHeight-this.barChildDOM.offsetHeight);
    this.ulDOM.style.top=(this.ulParDOM.offsetHeight-this.ulDOM.offsetHeight)*bili+'px';
};


function _bindEvent(obj,e,fn) {
    return obj.addEventListener ? obj.addEventListener(e,fn,false) : obj.attachEvent('on'+e,fn);
}

//获取元素 type #id .class tagName
function _$(par,element) {
    var el = element;
    if (/^\.\S+$/.test(element)){
        el = el.replace(/^\./,'');
        return _getClass(par,el)[0];
    }else if(/^\#\S+$/.test(element)) {
        el = el.replace(/^#/,'');
        return document.getElementById(el);
    }else {
        return par.getElementsByTagName(element)[0];
    }
};
function _getClass(par,cls) {
    if(par.getElementsByClassName) {
        return par.getElementsByClassName(cls);
    }else{
        var aEle=par.getElementsByTagName('*');
        var re=new RegExp('\\b'+cls+'\\b');
        var result=[];
        for(var i=0;i<aEle.length;i++){
            if(re.test(aEle[i].className))result.push(aEle[i]);
        }
        return result;
    }
};

module.exports = SimpleScroll;
