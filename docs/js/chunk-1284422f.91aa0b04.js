(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-1284422f"],{"4a78":function(t,e,n){"use strict";n.r(e);var a=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("view-container",[!0===t.isSaving?n("app-loading"):t._e(),!1===t.isSaving?n("form",{staticClass:"form",on:{submit:function(e){return e.preventDefault(),t.create(e)}}},[n("view-header",{attrs:{description:"Create a project to save images, links and notes.","on-back":t.onCancel,"section-name":"Project",title:"Create Project"},scopedSlots:t._u([{key:"controls",fn:function(){return[n("a-button",{on:{click:t.onCancel},scopedSlots:t._u([{key:"icon-left",fn:function(){return[n("a-close-icon")]},proxy:!0}],null,!1,2591301193)},[t._v(" Cancel ")]),n("a-button",{attrs:{isPrimary:!0,type:"submit"},scopedSlots:t._u([{key:"icon-left",fn:function(){return[n("a-check-icon")]},proxy:!0}],null,!1,2815218009)},[t._v(" Create ")])]},proxy:!0}],null,!1,888205703)}),n("div",{staticClass:"form"},[n("text-input",{attrs:{label:"Name",name:"name"},model:{value:t.name,callback:function(e){t.name=e},expression:"name"}}),n("text-input",{attrs:{label:"Description",name:"description"},model:{value:t.description,callback:function(e){t.description=e},expression:"description"}})],1)],1):t._e()],1)},c=[],i=(n("a4d3"),n("e01a"),n("b0c0"),n("96cf"),n("c964")),o=n("8086"),r=n("f04a"),s=n("7415"),l=n("29e5"),u=n("446e"),p=n("d75e"),d=n("c9a7"),f={name:"project-edit",components:{ACheckIcon:r["a"],ACloseIcon:s["a"],AButton:o["a"],AppLoading:l["a"],TextInput:u["a"],ViewContainer:p["a"],ViewHeader:d["a"]},data:function(){return{description:"",isSaving:!1,name:""}},methods:{create:function(){var t=this;return Object(i["a"])(regeneratorRuntime.mark((function e(){var n,a;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return t.isSaving=!0,n={description:t.description,name:t.name},e.next=4,t.$store.dispatch("projects/create",n);case 4:a=e.sent,a.success?t.$router.push("/projects/".concat(a.project.id)):console.error(a.message);case 6:case"end":return e.stop()}}),e)})))()},onCancel:function(){this.$router.back()}}},m=f,k=n("2877"),v=Object(k["a"])(m,a,c,!1,null,null,null);e["default"]=v.exports},6432:function(t,e,n){"use strict";var a=n("f8bf"),c=n.n(a);c.a},c9a7:function(t,e,n){"use strict";var a=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("header",{staticClass:"view-header"},[n("div",{staticClass:"main-content"},[t.onBack&&t.isBackFunction?n("a-button",{staticClass:"title-back-btn",on:{click:t.onBack},scopedSlots:t._u([{key:"icon-left",fn:function(){return[n("a-arrow-back-icon")]},proxy:!0}],null,!1,2664932576)},[n("span",[t._v("Back")])]):t._e(),t.onBack&&!t.isBackFunction?n("a-button",{staticClass:"title-back-btn",attrs:{to:t.onBack},scopedSlots:t._u([{key:"icon-left",fn:function(){return[n("a-arrow-back-icon")]},proxy:!0}],null,!1,2664932576)},[n("span",[t._v("Back")])]):t._e(),n("div",{staticClass:"title"},[t.title?n("h2",{staticClass:"title-text"},[t._v(t._s(t.title))]):t._e()]),n("div",{staticClass:"description"},[t.description?n("p",{staticClass:"description-text"},[t._v(t._s(t.description))]):t._e()])],1),n("div",{staticClass:"secondary-content"},[t._t("controls")],2)])},c=[],i=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("a-icon",{attrs:{height:t.height,width:t.width}},[n("path",{attrs:{d:"M11.67 3.87L9.9 2.1 0 12l9.9 9.9 1.77-1.77L3.54 12z"}}),n("path",{attrs:{d:"M0 0h24v24H0z",fill:"none"}})])},o=[],r=n("388d"),s={name:"a-arrow-back-icon",components:{AIcon:r["a"]},props:{height:{default:"20",type:String},width:{default:"20",type:String}}},l=s,u=n("2877"),p=Object(u["a"])(l,i,o,!1,null,"5f5e116f",null),d=p.exports,f=n("8086"),m={name:"view-header",components:{AArrowBackIcon:d,AButton:f["a"]},computed:{isBackFunction:function(){return"function"===typeof this.onBack}},props:{onBack:{type:[Function,Object,String]},description:{type:String},sectionName:{type:String},title:{type:String}}},k=m,v=(n("6432"),Object(u["a"])(k,a,c,!1,null,"acb766fe",null));e["a"]=v.exports},f8bf:function(t,e,n){}}]);
//# sourceMappingURL=chunk-1284422f.91aa0b04.js.map