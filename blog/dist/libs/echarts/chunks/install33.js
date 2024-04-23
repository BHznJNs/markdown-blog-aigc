import{_ as t,ci as e,bE as i,ca as a,bG as n,bV as o,bt as r,A as s,cH as l,cI as c,X as d,db as g,aY as u,E as h,d as p,e as y,cL as x,cO as f,cK as v,m as A,bh as m,B as M,d2 as T,as as b,d3 as S,$ as w,N as L,aJ as C,a9 as k,a0 as P,g as E,v as D,G as _,cP as I,b6 as B,bk as W,aQ as R,bU as G,b9 as V,x as z}from"./index.js";import{A as O}from"./AxisView.js";import{b as j,a as N,B as F,m as H,c as K,i as q}from"./install23.js";import{A as J}from"./AxisBuilder.js";import{a as Q}from"./axisModelCreator.js";import"./labelLayoutHelper.js";import"./axisDefault.js";var U=function(o){function r(){return null!==o&&o.apply(this,arguments)||this}return t(r,o),r.prototype.makeElOption=function(t,o,r,s,l){var c=r.axis;"angle"===c.dim&&(this.animationThreshold=Math.PI/18);var d=c.polar,g=d.getOtherAxis(c).getExtent(),u=c.dataToCoord(o),h=s.get("type");if(h&&"none"!==h){var p=j(s),y=X[h](c,d,u,g);y.style=p,t.graphicKey=y.type,t.pointer=y}var x=function(t,o,r,s,l){var c=o.axis,d=c.dataToCoord(t),g=s.getAngleAxis().getExtent()[0];g=g/180*Math.PI;var u,h,p,y=s.getRadiusAxis().getExtent();if("radius"===c.dim){var x=n();e(x,x,g),i(x,x,[s.cx,s.cy]),u=a([d,-l],x);var f=o.getModel("axisLabel").get("rotate")||0,v=J.innerTextLayout(g,f*Math.PI/180,-1);h=v.textAlign,p=v.textVerticalAlign}else{var A=y[1];u=s.coordToPoint([A+l,d]);var m=s.cx,M=s.cy;h=Math.abs(u[0]-m)/A<.3?"center":u[0]>m?"left":"right",p=Math.abs(u[1]-M)/A<.3?"middle":u[1]>M?"top":"bottom"}return{position:u,align:h,verticalAlign:p}}(o,r,0,d,s.get(["label","margin"]));N(t,r,s,l,x)},r}(F);var X={line:function(t,e,i,a){return"angle"===t.dim?{type:"Line",shape:H(e.coordToPoint([a[0],i]),e.coordToPoint([a[1],i]))}:{type:"Circle",shape:{cx:e.cx,cy:e.cy,r:i}}},shadow:function(t,e,i,a){var n=Math.max(1,t.getBandWidth()),o=Math.PI/180;return"angle"===t.dim?{type:"Sector",shape:K(e.cx,e.cy,a[0],a[1],(-i-n/2)*o,(n/2-i)*o)}:{type:"Sector",shape:K(e.cx,e.cy,i-n/2,i+n/2,0,2*Math.PI)}}},Y=U,$=function(e){function i(){var t=null!==e&&e.apply(this,arguments)||this;return t.type=i.type,t}return t(i,e),i.prototype.findAxisModel=function(t){var e;return this.ecModel.eachComponent(t,(function(t){t.getCoordSysModel()===this&&(e=t)}),this),e},i.type="polar",i.dependencies=["radiusAxis","angleAxis"],i.defaultOption={z:0,center:["50%","50%"],radius:"80%"},i}(o),Z=function(e){function i(){return null!==e&&e.apply(this,arguments)||this}return t(i,e),i.prototype.getCoordSysModel=function(){return this.getReferringComponents("polar",r).models[0]},i.type="polarAxis",i}(o);s(Z,l);var tt=function(e){function i(){var t=null!==e&&e.apply(this,arguments)||this;return t.type=i.type,t}return t(i,e),i.type="angleAxis",i}(Z),et=function(e){function i(){var t=null!==e&&e.apply(this,arguments)||this;return t.type=i.type,t}return t(i,e),i.type="radiusAxis",i}(Z),it=function(e){function i(t,i){return e.call(this,"radius",t,i)||this}return t(i,e),i.prototype.pointToData=function(t,e){return this.polar.pointToData(t,e)["radius"===this.dim?0:1]},i}(c);it.prototype.dataToRadius=c.prototype.dataToCoord,it.prototype.radiusToData=c.prototype.coordToData;var at=d(),nt=function(e){function i(t,i){return e.call(this,"angle",t,i||[0,360])||this}return t(i,e),i.prototype.pointToData=function(t,e){return this.polar.pointToData(t,e)["radius"===this.dim?0:1]},i.prototype.calculateCategoryInterval=function(){var t=this,e=t.getLabelModel(),i=t.scale,a=i.getExtent(),n=i.count();if(a[1]-a[0]<1)return 0;var o=a[0],r=t.dataToCoord(o+1)-t.dataToCoord(o),s=Math.abs(r),l=g(null==o?"":o+"",e.getFont(),"center","top"),c=Math.max(l.height,7)/s;isNaN(c)&&(c=1/0);var d=Math.max(0,Math.floor(c)),u=at(t.model),h=u.lastAutoInterval,p=u.lastTickCount;return null!=h&&null!=p&&Math.abs(h-d)<=1&&Math.abs(p-n)<=1&&h>d?d=h:(u.lastTickCount=n,u.lastAutoInterval=d),d},i}(c);nt.prototype.dataToAngle=c.prototype.dataToCoord,nt.prototype.angleToData=c.prototype.coordToData;var ot=["radius","angle"];function rt(t){var e=t.seriesModel,i=t.polarModel;return i&&i.coordinateSystem||e&&e.coordinateSystem}var st=function(){function t(t){this.dimensions=ot,this.type="polar",this.cx=0,this.cy=0,this._radiusAxis=new it,this._angleAxis=new nt,this.axisPointerEnabled=!0,this.name=t||"",this._radiusAxis.polar=this._angleAxis.polar=this}return t.prototype.containPoint=function(t){var e=this.pointToCoord(t);return this._radiusAxis.contain(e[0])&&this._angleAxis.contain(e[1])},t.prototype.containData=function(t){return this._radiusAxis.containData(t[0])&&this._angleAxis.containData(t[1])},t.prototype.getAxis=function(t){return this["_"+t+"Axis"]},t.prototype.getAxes=function(){return[this._radiusAxis,this._angleAxis]},t.prototype.getAxesByScale=function(t){var e=[],i=this._angleAxis,a=this._radiusAxis;return i.scale.type===t&&e.push(i),a.scale.type===t&&e.push(a),e},t.prototype.getAngleAxis=function(){return this._angleAxis},t.prototype.getRadiusAxis=function(){return this._radiusAxis},t.prototype.getOtherAxis=function(t){var e=this._angleAxis;return t===e?this._radiusAxis:e},t.prototype.getBaseAxis=function(){return this.getAxesByScale("ordinal")[0]||this.getAxesByScale("time")[0]||this.getAngleAxis()},t.prototype.getTooltipAxes=function(t){var e=null!=t&&"auto"!==t?this.getAxis(t):this.getBaseAxis();return{baseAxes:[e],otherAxes:[this.getOtherAxis(e)]}},t.prototype.dataToPoint=function(t,e){return this.coordToPoint([this._radiusAxis.dataToRadius(t[0],e),this._angleAxis.dataToAngle(t[1],e)])},t.prototype.pointToData=function(t,e){var i=this.pointToCoord(t);return[this._radiusAxis.radiusToData(i[0],e),this._angleAxis.angleToData(i[1],e)]},t.prototype.pointToCoord=function(t){var e=t[0]-this.cx,i=t[1]-this.cy,a=this.getAngleAxis(),n=a.getExtent(),o=Math.min(n[0],n[1]),r=Math.max(n[0],n[1]);a.inverse?o=r-360:r=o+360;var s=Math.sqrt(e*e+i*i);e/=s,i/=s;for(var l=Math.atan2(-i,e)/Math.PI*180,c=l<o?1:-1;l<o||l>r;)l+=360*c;return[s,l]},t.prototype.coordToPoint=function(t){var e=t[0],i=t[1]/180*Math.PI;return[Math.cos(i)*e+this.cx,-Math.sin(i)*e+this.cy]},t.prototype.getArea=function(){var t=this.getAngleAxis(),e=this.getRadiusAxis().getExtent().slice();e[0]>e[1]&&e.reverse();var i=t.getExtent(),a=Math.PI/180;return{cx:this.cx,cy:this.cy,r0:e[0],r:e[1],startAngle:-i[0]*a,endAngle:-i[1]*a,clockwise:t.inverse,contain:function(t,e){var i=t-this.cx,a=e-this.cy,n=i*i+a*a-1e-4,o=this.r,r=this.r0;return n<=o*o&&n>=r*r}}},t.prototype.convertToPixel=function(t,e,i){return rt(e)===this?this.dataToPoint(i):null},t.prototype.convertFromPixel=function(t,e,i){return rt(e)===this?this.pointToData(i):null},t}();function lt(t,e){var i=this,a=i.getAngleAxis(),n=i.getRadiusAxis();if(a.scale.setExtent(1/0,-1/0),n.scale.setExtent(1/0,-1/0),t.eachSeries((function(t){if(t.coordinateSystem===i){var e=t.getData();y(x(e,"radius"),(function(t){n.scale.unionExtentFromData(e,t)})),y(x(e,"angle"),(function(t){a.scale.unionExtentFromData(e,t)}))}})),f(a.scale,a.model),f(n.scale,n.model),"category"===a.type&&!a.onBand){var o=a.getExtent(),r=360/a.scale.count();a.inverse?o[1]+=r:o[1]-=r,a.setExtent(o[0],o[1])}}function ct(t,e){var i;if(t.type=e.get("type"),t.scale=v(e),t.onBand=e.get("boundaryGap")&&"category"===t.type,t.inverse=e.get("inverse"),function(t){return"angleAxis"===t.mainType}(e)){t.inverse=t.inverse!==e.get("clockwise");var a=e.get("startAngle"),n=null!==(i=e.get("endAngle"))&&void 0!==i?i:a+(t.inverse?-360:360);t.setExtent(a,n)}e.axis=t,t.model=e}var dt={dimensions:ot,create:function(t,e){var i=[];return t.eachComponent("polar",(function(t,a){var n=new st(a+"");n.update=lt;var o=n.getRadiusAxis(),r=n.getAngleAxis(),s=t.findAxisModel("radiusAxis"),l=t.findAxisModel("angleAxis");ct(o,s),ct(r,l),function(t,e,i){var a=e.get("center"),n=i.getWidth(),o=i.getHeight();t.cx=h(a[0],n),t.cy=h(a[1],o);var r=t.getRadiusAxis(),s=Math.min(n,o)/2,l=e.get("radius");null==l?l=[0,"100%"]:p(l)||(l=[0,l]);var c=[h(l[0],s),h(l[1],s)];r.inverse?r.setExtent(c[1],c[0]):r.setExtent(c[0],c[1])}(n,t,e),i.push(n),t.coordinateSystem=n,n.model=t})),t.eachSeries((function(t){if("polar"===t.get("coordinateSystem")){var e=t.getReferringComponents("polar",r).models[0];if(!e)throw new Error('Polar "'+u(t.get("polarIndex"),t.get("polarId"),0)+'" not found');t.coordinateSystem=e.coordinateSystem}})),i}},gt=["axisLine","axisLabel","axisTick","minorTick","splitLine","minorSplitLine","splitArea"];function ut(t,e,i){e[1]>e[0]&&(e=e.slice().reverse());var a=t.coordToPoint([e[0],i]),n=t.coordToPoint([e[1],i]);return{x1:a[0],y1:a[1],x2:n[0],y2:n[1]}}function ht(t){return t.getRadiusAxis().inverse?0:1}function pt(t){var e=t[0],i=t[t.length-1];e&&i&&Math.abs(Math.abs(e.coord-i.coord)-360)<1e-4&&t.pop()}var yt=function(e){function i(){var t=null!==e&&e.apply(this,arguments)||this;return t.type=i.type,t.axisPointerClass="PolarAxisPointer",t}return t(i,e),i.prototype.render=function(t,e){if(this.group.removeAll(),t.get("show")){var i=t.axis,a=i.polar,n=a.getRadiusAxis().getExtent(),o=i.getTicksCoords(),r=i.getMinorTicksCoords(),s=A(i.getViewLabels(),(function(t){t=m(t);var e=i.scale,a="ordinal"===e.type?e.getRawOrdinalNumber(t.tickValue):t.tickValue;return t.coord=i.dataToCoord(a),t}));pt(s),pt(o),y(gt,(function(e){!t.get([e,"show"])||i.scale.isBlank()&&"axisLine"!==e||xt[e](this.group,t,a,o,r,n,s)}),this)}},i.type="angleAxis",i}(O),xt={axisLine:function(t,e,i,a,n,o){var r,s=e.getModel(["axisLine","lineStyle"]),l=i.getAngleAxis(),c=Math.PI/180,d=l.getExtent(),g=ht(i),u=g?0:1,h=360===Math.abs(d[1]-d[0])?"Circle":"Arc";(r=0===o[u]?new M[h]({shape:{cx:i.cx,cy:i.cy,r:o[g],startAngle:-d[0]*c,endAngle:-d[1]*c,clockwise:l.inverse},style:s.getLineStyle(),z2:1,silent:!0}):new T({shape:{cx:i.cx,cy:i.cy,r:o[g],r0:o[u]},style:s.getLineStyle(),z2:1,silent:!0})).style.fill=null,t.add(r)},axisTick:function(t,e,i,a,n,o){var r=e.getModel("axisTick"),s=(r.get("inside")?-1:1)*r.get("length"),l=o[ht(i)],c=A(a,(function(t){return new b({shape:ut(i,[l,l+s],t.coord)})}));t.add(S(c,{style:w(r.getModel("lineStyle").getLineStyle(),{stroke:e.get(["axisLine","lineStyle","color"])})}))},minorTick:function(t,e,i,a,n,o){if(n.length){for(var r=e.getModel("axisTick"),s=e.getModel("minorTick"),l=(r.get("inside")?-1:1)*s.get("length"),c=o[ht(i)],d=[],g=0;g<n.length;g++)for(var u=0;u<n[g].length;u++)d.push(new b({shape:ut(i,[c,c+l],n[g][u].coord)}));t.add(S(d,{style:w(s.getModel("lineStyle").getLineStyle(),w(r.getLineStyle(),{stroke:e.get(["axisLine","lineStyle","color"])}))}))}},axisLabel:function(t,e,i,a,n,o,r){var s=e.getCategories(!0),l=e.getModel("axisLabel"),c=l.get("margin"),d=e.get("triggerEvent");y(r,(function(a,n){var r=l,g=a.tickValue,u=o[ht(i)],h=i.coordToPoint([u+c,a.coord]),p=i.cx,y=i.cy,x=Math.abs(h[0]-p)/u<.3?"center":h[0]>p?"left":"right",f=Math.abs(h[1]-y)/u<.3?"middle":h[1]>y?"top":"bottom";if(s&&s[g]){var v=s[g];L(v)&&v.textStyle&&(r=new C(v.textStyle,l,l.ecModel))}var A=new k({silent:J.isLabelSilent(e),style:P(r,{x:h[0],y:h[1],fill:r.getTextColor()||e.get(["axisLine","lineStyle","color"]),text:a.formattedLabel,align:x,verticalAlign:f})});if(t.add(A),d){var m=J.makeAxisEventDataBase(e);m.targetType="axisLabel",m.value=a.rawLabel,E(A).eventData=m}}),this)},splitLine:function(t,e,i,a,n,o){var r=e.getModel("splitLine").getModel("lineStyle"),s=r.get("color"),l=0;s=s instanceof Array?s:[s];for(var c=[],d=0;d<a.length;d++){var g=l++%s.length;c[g]=c[g]||[],c[g].push(new b({shape:ut(i,o,a[d].coord)}))}for(d=0;d<c.length;d++)t.add(S(c[d],{style:w({stroke:s[d%s.length]},r.getLineStyle()),silent:!0,z:e.get("z")}))},minorSplitLine:function(t,e,i,a,n,o){if(n.length){for(var r=e.getModel("minorSplitLine").getModel("lineStyle"),s=[],l=0;l<n.length;l++)for(var c=0;c<n[l].length;c++)s.push(new b({shape:ut(i,o,n[l][c].coord)}));t.add(S(s,{style:r.getLineStyle(),silent:!0,z:e.get("z")}))}},splitArea:function(t,e,i,a,n,o){if(a.length){var r=e.getModel("splitArea").getModel("areaStyle"),s=r.get("color"),l=0;s=s instanceof Array?s:[s];for(var c=[],d=Math.PI/180,g=-a[0].coord*d,u=Math.min(o[0],o[1]),h=Math.max(o[0],o[1]),p=e.get("clockwise"),y=1,x=a.length;y<=x;y++){var f=y===x?a[0].coord:a[y].coord,v=l++%s.length;c[v]=c[v]||[],c[v].push(new D({shape:{cx:i.cx,cy:i.cy,r0:u,r:h,startAngle:g,endAngle:-f*d,clockwise:p},silent:!0})),g=-f*d}for(y=0;y<c.length;y++)t.add(S(c[y],{style:w({fill:s[y%s.length]},r.getAreaStyle()),silent:!0}))}}},ft=yt,vt=["axisLine","axisTickLabel","axisName"],At=["splitLine","splitArea","minorSplitLine"],mt=function(e){function i(){var t=null!==e&&e.apply(this,arguments)||this;return t.type=i.type,t.axisPointerClass="PolarAxisPointer",t}return t(i,e),i.prototype.render=function(t,e){if(this.group.removeAll(),t.get("show")){var i=this._axisGroup,a=this._axisGroup=new _;this.group.add(a);var n=t.axis,o=n.polar,r=o.getAngleAxis(),s=n.getTicksCoords(),l=n.getMinorTicksCoords(),c=r.getExtent()[0],d=n.getExtent(),g=function(t,e,i){return{position:[t.cx,t.cy],rotation:i/180*Math.PI,labelDirection:-1,tickDirection:-1,nameDirection:1,labelRotate:e.getModel("axisLabel").get("rotate"),z2:1}}(o,t,c),u=new J(t,g);y(vt,u.add,u),a.add(u.getGroup()),I(i,a,t),y(At,(function(e){t.get([e,"show"])&&!n.scale.isBlank()&&Mt[e](this.group,t,o,c,d,s,l)}),this)}},i.type="radiusAxis",i}(O),Mt={splitLine:function(t,e,i,a,n,o){var r=e.getModel("splitLine").getModel("lineStyle"),s=r.get("color"),l=0,c=i.getAngleAxis(),d=Math.PI/180,g=c.getExtent(),u=360===Math.abs(g[1]-g[0])?"Circle":"Arc";s=s instanceof Array?s:[s];for(var h=[],p=0;p<o.length;p++){var y=l++%s.length;h[y]=h[y]||[],h[y].push(new M[u]({shape:{cx:i.cx,cy:i.cy,r:Math.max(o[p].coord,0),startAngle:-g[0]*d,endAngle:-g[1]*d,clockwise:c.inverse}}))}for(p=0;p<h.length;p++)t.add(S(h[p],{style:w({stroke:s[p%s.length],fill:null},r.getLineStyle()),silent:!0}))},minorSplitLine:function(t,e,i,a,n,o,r){if(r.length){for(var s=e.getModel("minorSplitLine").getModel("lineStyle"),l=[],c=0;c<r.length;c++)for(var d=0;d<r[c].length;d++)l.push(new B({shape:{cx:i.cx,cy:i.cy,r:r[c][d].coord}}));t.add(S(l,{style:w({fill:null},s.getLineStyle()),silent:!0}))}},splitArea:function(t,e,i,a,n,o){if(o.length){var r=e.getModel("splitArea").getModel("areaStyle"),s=r.get("color"),l=0;s=s instanceof Array?s:[s];for(var c=[],d=o[0].coord,g=1;g<o.length;g++){var u=l++%s.length;c[u]=c[u]||[],c[u].push(new D({shape:{cx:i.cx,cy:i.cy,r0:d,r:o[g].coord,startAngle:0,endAngle:2*Math.PI},silent:!0})),d=o[g].coord}for(g=0;g<c.length;g++)t.add(S(c[g],{style:w({fill:s[g%s.length]},r.getAreaStyle()),silent:!0}))}}};var Tt=mt;function bt(t){return t.get("stack")||"__ec_stack_"+t.seriesIndex}function St(t,e){return e.dim+t.model.componentIndex}function wt(t,e,i){var a={},n=function(t){var e={};y(t,(function(t,i){var a=t.getData(),n=t.coordinateSystem,o=n.getBaseAxis(),r=St(n,o),s=o.getExtent(),l="category"===o.type?o.getBandWidth():Math.abs(s[1]-s[0])/a.count(),c=e[r]||{bandWidth:l,remainedWidth:l,autoWidthCount:0,categoryGap:"20%",gap:"30%",stacks:{}},d=c.stacks;e[r]=c;var g=bt(t);d[g]||c.autoWidthCount++,d[g]=d[g]||{width:0,maxWidth:0};var u=h(t.get("barWidth"),l),p=h(t.get("barMaxWidth"),l),y=t.get("barGap"),x=t.get("barCategoryGap");u&&!d[g].width&&(u=Math.min(c.remainedWidth,u),d[g].width=u,c.remainedWidth-=u),p&&(d[g].maxWidth=p),null!=y&&(c.gap=y),null!=x&&(c.categoryGap=x)}));var i={};return y(e,(function(t,e){i[e]={};var a=t.stacks,n=t.bandWidth,o=h(t.categoryGap,n),r=h(t.gap,1),s=t.remainedWidth,l=t.autoWidthCount,c=(s-o)/(l+(l-1)*r);c=Math.max(c,0),y(a,(function(t,e){var i=t.maxWidth;i&&i<c&&(i=Math.min(i,s),t.width&&(i=Math.min(i,t.width)),s-=i,t.width=i,l--)})),c=(s-o)/(l+(l-1)*r),c=Math.max(c,0);var d,g=0;y(a,(function(t,e){t.width||(t.width=c),d=t,g+=t.width*(1+r)})),d&&(g-=d.width*r);var u=-g/2;y(a,(function(t,a){i[e][a]=i[e][a]||{offset:u,width:t.width},u+=t.width*(1+r)}))})),i}(W(e.getSeriesByType(t),(function(t){return!e.isSeriesFiltered(t)&&t.coordinateSystem&&"polar"===t.coordinateSystem.type})));e.eachSeriesByType(t,(function(t){if("polar"===t.coordinateSystem.type){var e=t.getData(),i=t.coordinateSystem,o=i.getBaseAxis(),r=St(i,o),s=bt(t),l=n[r][s],c=l.offset,d=l.width,g=i.getOtherAxis(o),u=t.coordinateSystem.cx,h=t.coordinateSystem.cy,p=t.get("barMinHeight")||0,y=t.get("barMinAngle")||0;a[s]=a[s]||[];for(var x=e.mapDimension(g.dim),f=e.mapDimension(o.dim),v=R(e,x),A="radius"!==o.dim||!t.get("roundCap",!0),m=g.dataToCoord(0),M=0,T=e.count();M<T;M++){var b=e.get(x,M),S=e.get(f,M),w=b>=0?"p":"n",L=m;v&&(a[s][S]||(a[s][S]={p:m,n:m}),L=a[s][S][w]);var C=void 0,k=void 0,P=void 0,E=void 0;if("radius"===g.dim){var D=g.dataToCoord(b)-m,_=o.dataToCoord(S);Math.abs(D)<p&&(D=(D<0?-1:1)*p),C=L,k=L+D,E=(P=_-c)-d,v&&(a[s][S][w]=k)}else{var I=g.dataToCoord(b,A)-m,B=o.dataToCoord(S);Math.abs(I)<y&&(I=(I<0?-1:1)*y),k=(C=B+c)+d,P=L,E=L+I,v&&(a[s][S][w]=E)}e.setItemLayout(M,{cx:u,cy:h,r0:C,r:k,startAngle:-P*Math.PI/180,endAngle:-E*Math.PI/180,clockwise:P>=E})}}}))}var Lt={startAngle:90,clockwise:!0,splitNumber:12,axisLabel:{rotate:0}},Ct={splitNumber:5},kt=function(e){function i(){var t=null!==e&&e.apply(this,arguments)||this;return t.type=i.type,t}return t(i,e),i.type="polar",i}(G);function Pt(t){V(q),O.registerAxisPointerClass("PolarAxisPointer",Y),t.registerCoordinateSystem("polar",dt),t.registerComponentModel($),t.registerComponentView(kt),Q(t,"angle",tt,Lt),Q(t,"radius",et,Ct),t.registerComponentView(ft),t.registerComponentView(Tt),t.registerLayout(z(wt,"bar"))}export{Pt as install};