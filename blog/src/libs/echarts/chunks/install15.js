import{e,bg as t,d as a,_ as i,am as r,ak as o,f as s,G as n,s as l,u as d,$ as p,p as u,a8 as c,h as m,bh as h,k as y,j as f,o as g,C as v,B as S,m as I,ah as x,ae as b,Y as D,bi as A,aK as P,S as j,b9 as k}from"./index.js";import{d as M}from"./dataFilter.js";import{c as N}from"./createSeriesDataSimply.js";import{L as _}from"./LegendVisualProvider.js";import{install as w}from"./install34.js";import"./axisDefault.js";import"./AxisBuilder.js";import"./labelLayoutHelper.js";import"./axisAlignTicks.js";function C(a){a.eachSeriesByType("radar",(function(a){var i=a.getData(),r=[],o=a.coordinateSystem;if(o){var s=o.getIndicatorAxes();e(s,(function(e,t){i.each(i.mapDimension(s[t].dim),(function(e,a){r[a]=r[a]||[];var i=o.dataToPoint(e,t);r[a][t]=V(i)?i:E(o)}))})),i.each((function(e){var a=t(r[e],(function(e){return V(e)}))||E(o);r[e].push(a.slice()),i.setItemLayout(e,r[e])}))}}))}function V(e){return!isNaN(e[0])&&!isNaN(e[1])}function E(e){return[e.cx,e.cy]}function L(t){var i=t.polar;if(i){a(i)||(i=[i]);var r=[];e(i,(function(e,i){e.indicator?(e.type&&!e.shape&&(e.shape=e.type),t.radar=t.radar||[],a(t.radar)||(t.radar=[t.radar]),t.radar.push(e)):r.push(e)})),t.polar=r}e(t.series,(function(e){e&&"radar"===e.type&&e.polarIndex&&(e.radarIndex=e.polarIndex)}))}var T=function(t){function a(){var e=null!==t&&t.apply(this,arguments)||this;return e.type=a.type,e}return i(a,t),a.prototype.render=function(t,a,i){var v=t.coordinateSystem,D=this.group,A=t.getData(),P=this._data;function j(e,t){var a=e.getItemVisual(t,"symbol")||"circle";if("none"!==a){var i=x(e.getItemVisual(t,"symbolSize")),r=b(a,-1,-1,2,2),o=e.getItemVisual(t,"symbolRotate")||0;return r.attr({style:{strokeNoScale:!0},z2:100,scaleX:i[0]/2,scaleY:i[1]/2,rotation:o*Math.PI/180||0}),r}}function k(e,a,i,r,o,s){i.removeAll();for(var n=0;n<a.length-1;n++){var l=j(r,o);l&&(l.__dimIdx=n,e[n]?(l.setPosition(e[n]),S[s?"initProps":"updateProps"](l,{x:a[n][0],y:a[n][1]},t,o)):l.setPosition(a[n]),i.add(l))}}function M(e){return I(e,(function(e){return[v.cx,v.cy]}))}A.diff(P).add((function(e){var a=A.getItemLayout(e);if(a){var i=new r,l=new o,d={shape:{points:a}};i.shape.points=M(a),l.shape.points=M(a),s(i,d,t,e),s(l,d,t,e);var p=new n,u=new n;p.add(l),p.add(i),p.add(u),k(l.shape.points,a,u,A,e,!0),A.setItemGraphicEl(e,p)}})).update((function(e,a){var i=P.getItemGraphicEl(a),r=i.childAt(0),o=i.childAt(1),s=i.childAt(2),n={shape:{points:A.getItemLayout(e)}};n.shape.points&&(k(r.shape.points,n.shape.points,s,A,e,!1),l(o),l(r),d(r,n,t),d(o,n,t),A.setItemGraphicEl(e,i))})).remove((function(e){D.remove(P.getItemGraphicEl(e))})).execute(),A.eachItemGraphicEl((function(t,a){var i=A.getItemModel(a),r=t.childAt(0),o=t.childAt(1),s=t.childAt(2),n=A.getItemVisual(a,"style"),l=n.fill;D.add(t),r.useStyle(p(i.getModel("lineStyle").getLineStyle(),{fill:"none",stroke:l})),u(r,i,"lineStyle"),u(o,i,"areaStyle");var d=i.getModel("areaStyle"),v=d.isEmpty()&&d.parentModel.isEmpty();o.ignore=v,e(["emphasis","select","blur"],(function(e){var t=i.getModel([e,"areaStyle"]),a=t.isEmpty()&&t.parentModel.isEmpty();o.ensureState(e).ignore=a&&v})),o.useStyle(p(d.getAreaStyle(),{fill:l,opacity:.7,decal:n.decal}));var S=i.getModel("emphasis"),I=S.getModel("itemStyle").getItemStyle();s.eachChild((function(e){if(e instanceof c){var t=e.style;e.useStyle(m({image:t.image,x:t.x,y:t.y,width:t.width,height:t.height},n))}else e.useStyle(n),e.setColor(l),e.style.strokeNoScale=!0;e.ensureState("emphasis").style=h(I);var r=A.getStore().get(A.getDimensionIndex(e.__dimIdx),a);(null==r||isNaN(r))&&(r=""),y(e,f(i),{labelFetcher:A.hostModel,labelDataIndex:a,labelDimIndex:e.__dimIdx,defaultText:r,inheritColor:l,defaultOpacity:n.opacity})})),g(t,S.get("focus"),S.get("blurScope"),S.get("disabled"))})),this._data=A},a.prototype.remove=function(){this.group.removeAll(),this._data=null},a.type="radar",a}(v),G=function(e){function t(){var a=null!==e&&e.apply(this,arguments)||this;return a.type=t.type,a.hasSymbolVisual=!0,a}return i(t,e),t.prototype.init=function(t){e.prototype.init.apply(this,arguments),this.legendVisualProvider=new _(D(this.getData,this),D(this.getRawData,this))},t.prototype.getInitialData=function(e,t){return N(this,{generateCoord:"indicator_",generateCoordCount:1/0})},t.prototype.formatTooltip=function(e,t,a){var i=this.getData(),r=this.coordinateSystem.getIndicatorAxes(),o=this.getData().getName(e),s=""===o?this.name:o,n=A(this,e);return P("section",{header:s,sortBlocks:!0,blocks:I(r,(function(t){var a=i.get(i.mapDimension(t.dim),e);return P("nameValue",{markerType:"subItem",markerColor:n,name:t.name,value:a,sortParam:a})}))})},t.prototype.getTooltipPosition=function(e){if(null!=e)for(var t=this.getData(),a=this.coordinateSystem,i=t.getValues(I(a.dimensions,(function(e){return t.mapDimension(e)})),e),r=0,o=i.length;r<o;r++)if(!isNaN(i[r])){var s=a.getIndicatorAxes();return a.coordToPoint(s[r].dataToCoord(i[r]),r)}},t.type="series.radar",t.dependencies=["radar"],t.defaultOption={z:2,colorBy:"data",coordinateSystem:"radar",legendHoverLink:!0,radarIndex:0,lineStyle:{width:2,type:"solid",join:"round"},label:{position:"top"},symbolSize:8},t}(j);function B(e){k(w),e.registerChartView(T),e.registerSeriesModel(G),e.registerLayout(C),e.registerProcessor(M("radar")),e.registerPreprocessor(L)}export{B as install};