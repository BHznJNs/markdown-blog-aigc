import{d4 as e,d5 as a,d6 as t,at as i,d7 as l,d8 as s,w as n}from"./index.js";var c=Math.log;function r(r,v,x){var g=e.prototype,f=g.getTicks.call(x),o=g.getTicks.call(x,!0),d=f.length-1,m=g.getInterval.call(x),u=a(r,v),h=u.extent,k=u.fixMin,p=u.fixMax;if("log"===r.type){var M=c(r.base);h=[c(h[0])/M,c(h[1])/M]}r.setExtent(h[0],h[1]),r.calcNiceExtent({splitNumber:d,fixMin:k,fixMax:p});var T=g.getExtent.call(r);k&&(h[0]=T[0]),p&&(h[1]=T[1]);var E=g.getInterval.call(r),b=h[0],F=h[1];if(k&&p)E=(F-b)/d;else if(k)for(F=h[0]+E*d;F<h[1]&&isFinite(F)&&isFinite(h[1]);)E=t(E),F=h[0]+E*d;else if(p)for(b=h[1]-E*d;b>h[0]&&isFinite(b)&&isFinite(h[0]);)E=t(E),b=h[1]-E*d;else{r.getTicks().length-1>d&&(E=t(E));var y=E*d;F=Math.ceil(h[1]/E)*E,(b=i(F-y))<0&&h[0]>=0?(b=0,F=i(y)):F>0&&h[1]<=0&&(F=0,b=-i(y))}var I=(f[0].value-o[0].value)/m,N=(f[d].value-o[d].value)/m;g.setExtent.call(r,b+E*I,F+E*N),g.setInterval.call(r,E),(I||N)&&g.setNiceExtent.call(r,b+E,F-E);var w=g.getTicks.call(r);w[1]&&(!l(E)||s(w[1].value)>s(E))&&n("The ticks may be not readable when set min: "+v.get("min")+", max: "+v.get("max")+" and alignTicks: true")}export{r as a};
