(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-53112f3e"],{"0674":function(t,e,i){"use strict";var a=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"picture-wrapper",style:{height:t.height,width:t.width}},[t.src&&""===t.imageUrl?i("app-loading"):t.imageUrl?i("img",{staticClass:"picture-image",class:t.fillType,style:{height:t.height,width:t.width},attrs:{src:t.imageUrl}}):t._e()],1)},n=[],r=(i("caad"),i("2532"),i("29e5")),s={FILL:"fill",FIT:"fit"},c={name:"app-picture",components:{AppLoading:r["a"]},data:function(){return{image:void 0,imageUrl:""}},destroyed:function(){this.image&&this.image.removeEventListener("load",this.onImageLoaded,!1)},methods:{onImageLoaded:function(){this.imageUrl=this.image.src,this.image.removeEventListener("load",this.onImageLoaded,!1)}},mounted:function(){this.src&&(this.image=new Image(this.width,this.height),this.image.addEventListener("load",this.onImageLoaded,!1),this.image.src=this.src)},props:{fillType:{default:s.FILL,type:String,validator:function(t){return[s.FILL,s.FIT].includes(t)}},height:{default:"100%",type:String},src:{type:String},width:{default:"100%",type:String}}},o=c,l=(i("35bd"),i("2877"));i.d(e,"a",(function(){return s}));var p=Object(l["a"])(o,a,n,!1,null,"36d9a2a2",null);e["b"]=p.exports},"06b7":function(t,e,i){},"35bd":function(t,e,i){"use strict";var a=i("e693"),n=i.n(a);n.a},"63f0":function(t,e,i){"use strict";var a=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("router-link",{staticClass:"a-image-link",attrs:{to:t.to}},[i("a-picture",{staticClass:"a-image-link-picture",attrs:{height:t.imageHeight,src:t.imageUrl}}),t.title?i("h3",{staticClass:"a-image-link-title"},[t._v(t._s(t.title))]):t._e()],1)},n=[],r=i("0674"),s={name:"a-image-link",components:{APicture:r["b"]},props:{imageHeight:{default:"200px",type:String},imageUrl:{type:String},title:{type:String},to:{type:[Object,String]}}},c=s,o=(i("dfe7"),i("2877")),l=Object(o["a"])(c,a,n,!1,null,"66bff3ae",null);e["a"]=l.exports},"6cc0":function(t,e,i){},cf86:function(t,e,i){"use strict";var a=i("06b7"),n=i.n(a);n.a},db05:function(t,e,i){"use strict";i.r(e);var a=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"view-wrapper"},[i("view-header",{attrs:{options:t.options,title:"Projects"}}),void 0===t.projects?i("app-loading"):t._e(),t.projects&&0===t.projects.length?i("div",[t._v("No Projects")]):t._e(),t.projects&&t.projects.length>0?i("div",t._l(t.projects,(function(t){return i("div",{key:t.id},[i("a-image-link",{attrs:{title:t.name,to:{name:"project",params:{id:t.id}}}})],1)})),0):t._e()],1)},n=[],r=i("c9a7"),s=i("63f0"),c=i("29e5"),o={name:"projects",components:{AImageLink:s["a"],AppLoading:c["a"],ViewHeader:r["a"]},computed:{projects:function(){return this.$store.getters["projects/projects"]}},data:function(){return{options:[{callback:this.onCreateProject,id:"create-project",label:"New"}]}},methods:{onCreateProject:function(){this.$router.push("/projects/create")}}},l=o,p=(i("cf86"),i("2877")),u=Object(p["a"])(l,a,n,!1,null,null,null);e["default"]=u.exports},dfe7:function(t,e,i){"use strict";var a=i("6cc0"),n=i.n(a);n.a},e693:function(t,e,i){}}]);
//# sourceMappingURL=chunk-53112f3e.6866dff7.js.map