(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-30920639"],{"3e06":function(t,e,n){},5592:function(t,e,n){"use strict";var a=n("3e06"),i=n.n(a);i.a},6432:function(t,e,n){"use strict";var a=n("f8bf"),i=n.n(a);i.a},c425:function(t,e,n){"use strict";n.r(e);var a=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("view-container",[n("add-image-form",{attrs:{"back-url":t.backUrl,"sub-title":t.description,title:t.title}})],1)},i=[],c=n("dd83"),r=n("d75e"),o={name:"images-add-image",components:{AddImageForm:c["a"],ViewContainer:r["a"]},computed:{backUrl:function(){return"/images"},description:function(){return"Create and add an image."},title:function(){return"Add Image"}}},s=o,l=n("2877"),u=Object(l["a"])(s,a,i,!1,null,null,null);e["default"]=u.exports},c9a7:function(t,e,n){"use strict";var a=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("header",{staticClass:"view-header"},[n("div",{staticClass:"main-content"},[t.onBack&&t.isBackFunction?n("a-button",{staticClass:"title-back-btn",on:{click:t.onBack},scopedSlots:t._u([{key:"icon-left",fn:function(){return[n("a-arrow-back-icon")]},proxy:!0}],null,!1,2664932576)},[n("span",[t._v("Back")])]):t._e(),t.onBack&&!t.isBackFunction?n("a-button",{staticClass:"title-back-btn",attrs:{to:t.onBack},scopedSlots:t._u([{key:"icon-left",fn:function(){return[n("a-arrow-back-icon")]},proxy:!0}],null,!1,2664932576)},[n("span",[t._v("Back")])]):t._e(),n("div",{staticClass:"title"},[t.title?n("h2",{staticClass:"title-text"},[t._v(t._s(t.title))]):t._e()]),n("div",{staticClass:"description"},[t.description?n("p",{staticClass:"description-text"},[t._v(t._s(t.description))]):t._e()])],1),n("div",{staticClass:"secondary-content"},[t._t("controls")],2)])},i=[],c=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("a-icon",{attrs:{height:t.height,width:t.width}},[n("path",{attrs:{d:"M11.67 3.87L9.9 2.1 0 12l9.9 9.9 1.77-1.77L3.54 12z"}}),n("path",{attrs:{d:"M0 0h24v24H0z",fill:"none"}})])},r=[],o=n("388d"),s={name:"a-arrow-back-icon",components:{AIcon:o["a"]},props:{height:{default:"20",type:String},width:{default:"20",type:String}}},l=s,u=n("2877"),d=Object(u["a"])(l,c,r,!1,null,"5f5e116f",null),p=d.exports,f=n("8086"),m={name:"view-header",components:{AArrowBackIcon:p,AButton:f["a"]},computed:{isBackFunction:function(){return"function"===typeof this.onBack}},props:{onBack:{type:[Function,Object,String]},description:{type:String},sectionName:{type:String},title:{type:String}}},b=m,k=(n("6432"),Object(u["a"])(b,a,i,!1,null,"acb766fe",null));e["a"]=k.exports},dd83:function(t,e,n){"use strict";var a=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"add-image-form content"},[n("form",{staticClass:"content",on:{submit:function(e){return e.preventDefault(),t.create(e)}}},[n("view-header",{attrs:{description:t.subTitle,"on-back":t.backUrl,title:t.title},scopedSlots:t._u([{key:"controls",fn:function(){return[n("a-button",{attrs:{to:t.backUrl},scopedSlots:t._u([{key:"icon-left",fn:function(){return[n("a-close-icon")]},proxy:!0}])},[t._v(" Cancel ")]),n("a-button",{attrs:{isPrimary:!0,type:"submit"},scopedSlots:t._u([{key:"icon-left",fn:function(){return[n("a-check-icon")]},proxy:!0}])},[t._v(" Add Image ")])]},proxy:!0}])}),n("div",{staticClass:"content"},[t.isSaving?n("app-loading"):t._e(),t.isSaving?t._e():n("div",{staticClass:"content"},[n("text-input",{attrs:{label:"Name",name:"name"},model:{value:t.name,callback:function(e){t.name=e},expression:"name"}}),n("text-input",{attrs:{label:"Description",name:"description"},model:{value:t.description,callback:function(e){t.description=e},expression:"description"}}),n("text-input",{attrs:{label:"Url",name:"url"},model:{value:t.url,callback:function(e){t.url=e},expression:"url"}})],1)],1)],1)])},i=[],c=(n("a4d3"),n("e01a"),n("b0c0"),n("96cf"),n("c964")),r=n("8086"),o=n("f04a"),s=n("7415"),l=n("29e5"),u=n("ec06"),d=n("446e"),p=n("c9a7"),f={name:"add-image-form",components:{AButton:r["a"],ACheckIcon:o["a"],ACloseIcon:s["a"],AppLoading:l["a"],TextInput:d["a"],ViewHeader:p["a"]},data:function(){return{description:"",isSaving:!1,name:"",url:""}},methods:{create:function(){var t=this;return Object(c["a"])(regeneratorRuntime.mark((function e(){var n,a;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return t.isSaving=!0,n={description:t.description,name:t.name,url:t.url},t.project&&(n.projectId=t.project.id),e.next=5,t.$store.dispatch("images/create",n);case 5:a=e.sent,a.success?(t.$store.dispatch("toasts/add",{text:'"'.concat(n.name,'" was created.'),timeout:3e3,title:"Image Created",type:u["a"].SUCCESS}),t.$router.push(t.backUrl)):(t.isSaving=!1,t.$store.dispatch("toasts/add",{text:'"'.concat(n.name,"\" couldn't be created."),title:"Error",type:u["a"].ERROR}),console.error(a.message));case 7:case"end":return e.stop()}}),e)})))()}},props:{backUrl:{type:[Object,String]},project:{type:Object},subTitle:{type:String},title:{type:String}}},m=f,b=(n("5592"),n("2877")),k=Object(b["a"])(m,a,i,!1,null,"ce10a60a",null);e["a"]=k.exports},f8bf:function(t,e,n){}}]);
//# sourceMappingURL=chunk-30920639.11691c68.js.map