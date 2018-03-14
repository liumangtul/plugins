/**
 promise
 * @Desc:关键词搜索 jsonp url 接口待确定，跳转url接口待确定
 * @Demo:
 */

function LiveSearch(opt){
    var opt = opt || {};
    opt.searchBtn = opt.searchBtn || $('#search_btn');
    opt.searchInput = opt.searchInput || $('#search_input');
    opt.searchList = opt.searchList || $('#search_list');
    this.searchUrl = '';//
    this.targethUrl = '?words=';
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
        window.location.href = that.targethUrl+that.searchInput.val();
    });

    this.searchInput.timer = null;
    this.searchInput.on('keyup click input propertychange',function(){
        clearTimeout(this.timer);
        this.timer = setTimeout(function(){
            that.jsonp();
        },500);
    });
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
