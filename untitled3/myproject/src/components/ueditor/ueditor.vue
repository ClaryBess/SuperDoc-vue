<template>
  <div>
    <script :id="id" type="text/plain" ></script>
  </div>
</template>

<script>
  import '../../../static/UEditor/jquery-1.10.2.js'
  import '../../../static/UEditor/ueditor.config.js'
  import '../../../static/UEditor/ueditor.all.js'
  import '../../../static/UEditor/lang/zh-cn/zh-cn.js'

  export default {
    name: "UEditor",
    props: {
      id: {
          type: String,
          default: 'editor'
      },
      config: {
          type: Object
      },
      value: {
        type: String
      }
    },
    data() {
      return {
        editor: null
      }
    },
    mounted() {
      //初始化UE
      const that = this;
      this.editor = UE.delEditor(this.id);
      this.editor = UE.getEditor(this.id,this.config);

      if(that.value && that.value != '') {
        that.setUEContent(that.value)
      }
      this.editor.addListener('contentChange', function (e) {
        that.$emit('input', that.getUEContent());
      })
    },
    destoryed() {
      this.editor.destory();
    },
    methods:{
      overrideEnterEvent(){
        let that = this
        this.editor.addListener('keyup', function(event, e){
          if(e.code.toUpperCase() == 'ENTER' && !e.ctrlKey && !e.shiftKey) {
            that.$emit('change', that.getUEContent());
          }else if(e.code.toUpperCase() == 'ENTER' && e.ctrlKey){
            that.editor.execCommand('inserthtml', '<br><br>');
          }
        });
      },
      getUEContent: function(){
       return this.editor.getContent();
      },
      getContentTxt: function(){
        return this.editor.getContentTxt();
      },
      setUEContent: function (content) {
        var that = this;
        that.editor.ready(function () {
          that.editor.setContent(content);
        })
      },
      insertHtml(html){
        this.editor.execCommand('inserthtml', html);
      },
      cleanVal(){
        this.editor.execCommand('cleardoc');
      }
    }
  }
</script>
