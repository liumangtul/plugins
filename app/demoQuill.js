import Quill from 'Quill';


export default function demoQuill() {
    var quill = new Quill('#editor', {
        theme:'snow'
    });

    //delete内容
    // => deleteText(index: Number, length: Number, source: String = 'api'): Delta 返回
    // quill.deleteText(0,quill.getLength());//删除所有内容
    // var del = quill.deleteText(2,4,'api');//api,user,silent
    // console.log(del);//{ops:[{retain:2},{delete:4}]}  retain -删除起始index delete -删除个数

    //get内容
    // var contents = quill.getContents([3[,4]]);//index,length
    // console.log(contents);//{ops:[insert:'截取内容']} default 全部内容

    //get内容length 即使内容为空，仍有一个\n ,length是1
    // console.log(quill.getLength());

    //get字符串内容（忽略非string）即使为空，返回\n；
    // var  text = quill.getText(4,2);//index默认0，length默认剩余长度
    // console.log(text);

    //insert多媒体 image,video
    /*var embedIndex = 1;
    var embedType = 'video';
    var embedValue = 'https://n6-pl-agv.autohome.com.cn/video-43/E3BD4E39114FD258/2018-03-14/D9FF84D57F5C4E84-300.mp4';
    var embedSource = 'api';//api user,slient
    var embed = quill.insertEmbed(embedIndex,embedType,embedValue,embedSource);

    var embedIndex = 8;
    var embedType = 'image';
    var embedValue = 'http://src.leju.com/imp/imp/deal/03/4d/7/5541f60030c5fdfffc3b083290b_p43_mk42_s290X163.jpg';
    var embedSource = 'api';//api user,slient
    var embed = quill.insertEmbed(embedIndex,embedType,embedValue,embedSource);
    console.log(embed);*/

    //insert内容
    // insertText(index: Number, text: String, source: String = 'api'): Delta
    // insertText(index: Number, text: String, format: String, value: any, source: String = 'api'): Delta
    // insertText(index: Number, text: String, formats: { [String]: any },source: String = 'api'): Delta
    // quill.insertText(3,'_INSERT_','bold',true);

    //pasteHTML 将在2.0 removed ,into Clipboard and renamed
    // Clipboard Module -> https://quilljs.com/docs/modules/clipboard/#dangerouslypastehtml

    //设置内容
    //setContents(delta: Delta, source: String = 'api'): Delta
    /*var content = quill.setContents([
        {insert:'WangYan'},
        {insert:'\n'},
        {insert:'WY',attributes:{bold:true}},
        {insert:'\n'}
    ],'api');
    console.log(content);*/

    //setText
    // setText(text: String, source: String = 'api'): Delta
    // quill.setText('ABC','api');

    //updateContents ??? ??? new Delta----------------???
    //updateContents(delta: Delta, source: String = 'api'): Delta
    /*var update_contents = quill.updateContents(new Delta()
        .retain(1)
        .delete(2)
        .insert('Insert__>>')
        .retain(1,{bold:true})
    );*/

    //格式化文本
    //format(name: String, value: any, source: String = 'api'): Delta
    // quill.format('color','red');
    // quill.format('align', 'right');

    //格式化指定行
    // formatLine(index: Number, length: Number, source: String = 'api'): Delta
    // formatLine(index: Number, length: Number, format: String, value: any, source: String = 'api'): Delta
    // formatLine(index: Number, length: Number, formats: { [String]: any },source: String = 'api'): Delta
    /*quill.formatLine(0,2,{
        'align':'right'
    });*/

    //格式化文本
    // formatText(index: Number, length: Number, source: String = 'api'): Delta
    // formatText(index: Number, length: Number, format: String, value: any, source: String = 'api'): Delta
    // formatText(index: Number, length: Number, formats: { [String]: any },source: String = 'api'): Delta
    /*quill.formatText(4,2,{
        'bold':true,
        'color':'red'
    });*/

    //getFormat
    // getFormat(range: Range = current): { [String]: any }
    // getFormat(index: Number, length: Number = 0): { [String]: any }
    // console.log(quill.getFormat());

    //removeFormat(index: Number, length: Number, source: String = 'api'): Delta
    // var clearFormat = quill.removeFormat(5,6);//清楚格式

    //获取指定文本位置所在position
    //getBounds(index: Number, length: Number = 0): { left: Number, top: Number, height: Number, width: Number }
    /*var pos = quill.getBounds(6,3);//length 经测试没用
    console.log(pos);
    var oTip = document.createElement('div');
    oTip.innerHTML = '_TIP_';
    document.getElementById('editor').appendChild(oTip);
    oTip.style.cssText = 'border:1px solid #000;width:100px;height:100px;position:absolute;left:'+(pos.left)+'px;top:'+(pos.top)+'px'*/

    //返回所选内容信息 index length 如果没有焦点，返回null
    //getSelection(focus = false): { index: Number, length: Number }
    /*setTimeout(function () {
        var range = quill.getSelection();
        console.log(range);
    },3000)*/

    //set选择区域
    // setSelection(index: Number, length: Number, source: String = 'api')
    // setSelection(range: { index: Number, length: Number },souce: String = 'api')
    /*var count = 0;
    var timer = null;
    setRange();
    timer = setInterval(function () {
        setRange()
    },60);
    function setRange() {
        if(count>quill.getLength()){
            clearInterval(timer);
            count = quill.getLength();
            return;
        }
        quill.setSelection(0,count++);
    }*/

    /*setTimeout(function () {
        quill.blur();
    },2000);*/

    // quill.enable(false)

    // console.log(quill.hasFocus());
    // quill.focus();
    // console.log(quill.hasFocus());

    //带？？？
    /*setTimeout(function () {
        console.log(quill.update())
    },3000)*/

    //Events
    /*
    * handler(
    *           range: { index: Number, length: Number },
                oldRange: { index: Number, length: Number },
                source: String
              )

     on(name: String, handler: Function): Quill
     once(name: String, handler: Function): Quill
     off(name: String, handler: Function): Quill
    * */
    quill.on('text-change',function (delta,oldDelta,source) {
        // console.log(delta,oldDelta,source);
    });

    quill.on('selection-change',function (range,oldRange,source) {
       // console.log(range,oldRange,source);
    });

    quill.on('editor-change',function (eventName,...args) {
        console.log('editor',eventName,...args)
    })

}