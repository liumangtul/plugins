/**
 promise
 */

function LiveSearch(opt){
    var opt = opt || {};
    opt.searchBtn = opt.searchBtn || $('#search_btn');
    opt.searchInput = opt.searchInput || $('#search_input');
    opt.searchList = opt.searchList || $('#search_list');
    this.searchUrl = 'https://sp0.baidu.com/5a1Fazu8AA54nxGko9WTAnF6hhy/su';
    this.targethUrl = window.searchUrl || '';
    this.keywords = opt.searchInput.val();
    if(!opt.searchList.length>0){
        $('body').append('<ul id="search_list"></ul>');
        opt.searchList = opt.searchList.length>0 ? opt.searchList : $('#search_list');
    }
    $.extend(true,this,opt);
    this.init();
    return this;
};

LiveSearch.prototype.init = function(){
    this.setListPos();
    this.bindEvent();
};

LiveSearch.prototype.bindEvent = function(){
    var that = this;

    this.searchBtn.on('click',function(){
        that.location();
    });

    this.searchInput.timer = null;
    this.searchInput.on('click input propertychange',function(ev){
        console.log('JsonP');
        clearTimeout(this.timer);
        this.timer = setTimeout(function(){
            that.jsonp();
        },500);
    });
    this.searchInput.on('keyup',function (ev) {
        var oEvent = ev || event;
        var keyCode = oEvent.keyCode;
        that.keyCodeFn(keyCode);
    });

    //热词列表交互
    this.searchList.on('mouseover','li',function (ev) {
        var oEvent = ev || event;
        var target = oEvent.fromElement || oEvent.relatedTarget;
        if($(this)[0].contains(target))return;

        that.searchList.find('li').removeClass('cur');
        $(this).addClass('cur');
    });
    this.searchList.on('mouseout',function (ev) {
        var oEvent = ev || event;
        var target = oEvent.toElement || oEvent.relatedTarget;
        if($(this)[0].contains(target))return;
        that.searchList.find('li').removeClass('cur');
    });
    this.searchInput.on('blur',function () {
        that.clearSearchList();
    });
};

LiveSearch.prototype.clearSearchList = function(){
    var that = this;

    setTimeout(function(){
        that.searchList.html('');
        that.searchList.show();
    },100);
};

LiveSearch.prototype.location = function () {
    var val = this.searchInput.val();
    if(/^\s+$/.test(val) || val === '')return;
    window.location.href = this.targethUrl+val;
};

LiveSearch.prototype.keyCodeFn = function (keyCode) {
    console.log('keycode',keyCode);
    var index = this.searchList.find('li.cur').index();
    var isList = this.searchList.children().length>0;
    //up
    if(keyCode == 38 && isList){
        index--;
        if(index<0)index = this.searchList.children().length-1;
        this.searchInput.val(this.searchList.find('li').eq(index).text());
        //down
    }else if(keyCode == 40 && isList){
        index++;
        if(index>this.searchList.children().length-1)index = 0;
        this.searchInput.val(this.searchList.find('li').eq(index).text());
        //enter
    }else if(keyCode == 13){
        this.clearSearchList();
        this.location();
    }
    console.log(index,'INDEX')
    if(!(index>0 && index<this.searchList.find('li').length))index = 0;
    if((keyCode == 38 || keyCode == 40) && isList){
        this.searchList.attr('index',index);
        this.searchList.find("li").removeClass('cur');
        this.searchList.find("li").eq(index).addClass('cur');
    }

};

LiveSearch.prototype.jsonp = function(){
    var val = this.searchInput.val();
    if(/^\s+$/.test(val) || val === ''){
        this.searchList.html('');
        return;
    }
    //与上次搜索关键词相同 && 有数据
    if(this.keywords === val && this.searchList.find('li').length>0 ){
        console.log('No Change!!');
        return;
    }

    this.keywords = val;
    var that = this;
    var data = {
        wd:this.keywords
    };
    $.ajax({
        url:this.searchUrl,
        data:data,
        dataType:'jsonp',
        jsonp:'cb',
        success:function(res) {
            that.callback(res);
        },
        error:function(err){
            console.log(err,'err')
        }
    });
};

LiveSearch.prototype.callback = function(res) {
    var str = '';
    for(var i=0,length=res.s.length;i<length;i++){
        var href = this.targethUrl+res.s[i];
        var keyword = res.s[i];
        str+='<li><a href="'+href+'">'+keyword+'</a></li>'
    }
    // console.log(this.searchList,str);
    this.searchList.html(str);
};

LiveSearch.prototype.setListPos = function(){
    var left = this.searchInput.offset().left;
    var top = this.searchInput.offset().top+this.searchInput.height();
    var width = this.searchInput.width();
    this.searchList.css({
        width:width+'px',
        position:'absolute',
        left:left+'px',
        top:top+'px'
    });
};

module.exports = LiveSearch;
