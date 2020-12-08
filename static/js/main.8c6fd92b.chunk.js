(this["webpackJsonpcar-prods"]=this["webpackJsonpcar-prods"]||[]).push([[0],{26:function(e,t,n){},46:function(e,t){},48:function(e,t){},58:function(e,t,n){"use strict";n.r(t);var a=n(1),i=n(0),r=n.n(i),s=n(32),c=n.n(s),o=(n(26),n(14)),l=n(17),u=n(13),m=n(33),d=n(16),f=n.n(d),h=n(34),p=n.n(h),j=n(5),g=n(10),v=n(6),b=n(7),x=n(8),O=n(9),w=n(61),y=function(e){Object(b.a)(n,e);var t=Object(x.a)(n);function n(e){var a;return Object(j.a)(this,n),(a=t.call(this,e)).initiate=function(e){var t=[],n=Object(v.a)(a);a.images.forEach((function(e,a){console.log(e);var i=new Promise((function(t){console.log(n.state.textures),n.state.textures[a]=(new O.TextureLoader).load(e,t),n.state.textures[a].name=e.substring(0,e.length-4)}));t.push(i)})),Promise.all(t).then((function(){e()}))},a.setupResize=function(){window.addEventListener("resize",a.resize)},a.settings=function(){Object(v.a)(a);console.log("settings"),Object.keys(a.uniforms).forEach((function(e){a.settings[e]=a.uniforms[e].value,a.debug&&a.gui.add(a.settings,e,a.uniforms[e].min,a.uniforms[e].max,.01)}))},a.addObjects=function(){Object(v.a)(a);a.material=new O.ShaderMaterial({side:O.DoubleSide,uniforms:{time:{type:"f",value:0},progress:{type:"f",value:0},border:{type:"f",value:0},intensity:{value:.3,type:"f",min:0,max:2},scaleX:{type:"f",value:40},scaleY:{type:"f",value:40},transition:{type:"f",value:40},swipe:{type:"f",value:0},width:{type:"f",value:0},radius:{type:"f",value:0},texture1:{type:"f",value:a.state.textures[0]},texture2:{type:"f",value:a.state.textures[1]},displacement:{type:"f",value:(new O.TextureLoader).load("img/disp1.jpg")},resolution:{type:"v4",value:new O.Vector4}},vertexShader:a.vertex,fragmentShader:a.fragment}),a.geometry=new O.PlaneGeometry(1,1,2,2),a.plane=new O.Mesh(a.geometry,a.material),a.scene.add(a.plane)},a.resize=function(){var e,t;a.width=a.container.offsetWidth,a.height=a.container.offsetHeight,a.renderer.setSize(a.width,a.height),a.camera.aspect=a.width/a.height,a.imageAspect=a.state.textures[0].image.height/a.state.textures[0].image.width,a.height/a.width>a.imageAspect?(e=a.width/a.height*a.imageAspect,t=1):(e=1,t=a.height/a.width/a.imageAspect),a.material.uniforms.resolution.value.x=a.width,a.material.uniforms.resolution.value.y=a.height,a.material.uniforms.resolution.value.z=e,a.material.uniforms.resolution.value.w=t;var n=a.camera.position.z;a.camera.fov=180/Math.PI*2*Math.atan(1/(2*n)),a.plane.scale.x=a.camera.aspect,a.plane.scale.y=1,a.camera.updateProjectionMatrix()},a.stop=function(){a.setState({paused:!0})},a.play=function(){a.setState({paused:!1}),a.renderTransition()},a.clickEvent=function(){a.clicker.addEventListener("click",(function(){console.log("hello"),a.next()}))},a.renderTransition=function(){if(!a.state.paused){var e=a.state.time;e+=.05,a.setState({time:e}),a.material.uniforms.time.value=a.time,Object.keys(a.uniforms).forEach((function(e){a.material.uniforms[e].value=a.settings[e]})),requestAnimationFrame(a.renderTransition.bind(Object(v.a)(a))),a.renderer.render(a.scene,a.camera)}},a.state={time:0,paused:!0,textures:[],fragmentValue:"\nuniform float time;\nuniform float progress;\nuniform float width;\nuniform float scaleX;\nuniform float scaleY;\nuniform float transition;\nuniform float radius;\nuniform float intensity;\nuniform sampler2D texture1;\nuniform sampler2D texture2;\nuniform sampler2D displacement;\nuniform vec4 resolution;\nvarying vec2 vUv;\nvoid main()\t{\n  vec2 newUV = (vUv - vec2(0.5))*resolution.zw + vec2(0.5);\n     vec4 d1 = texture2D(texture1, newUV);\n     vec4 d2 = texture2D(texture2, newUV);\n     float displace1 = (d1.r + d1.g + d1.b)*0.33;\n     float displace2 = (d2.r + d2.g + d2.b)*0.33;\n     \n     vec4 t1 = texture2D(texture1, vec2(newUV.x, newUV.y + progress * (displace2 * intensity)));\n     vec4 t2 = texture2D(texture2, vec2(newUV.x, newUV.y + (1.0 - progress) * (displace1 * intensity)));\n     gl_FragColor = mix(t1, t2, progress);\n}\n",current:0,isRunning:!1},a}return Object(g.a)(n,[{key:"componentDidMount",value:function(){var e=this;this.scene=new O.Scene,this.camera=new O.PerspectiveCamera(70,window.innerWidth/window.innerHeight,.001,1e3),this.vertex="varying vec2 vUv;void main() {vUv = uv;gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );}",this.fragment=this.state.fragmentValue,this.uniforms={width:{value:.5,type:"f",min:0,max:10},scaleX:{value:40,type:"f",min:.1,max:60},scaleY:{value:40,type:"f",min:.1,max:60}},this.renderer=new O.WebGLRenderer,this.renderer.setSize(window.innerWidth,window.innerHeight),this.renderer.setPixelRatio(window.devicePixelRatio),this.renderer.setClearColor(15658734,1),this.duration=1,this.debug=!1,this.easing="easeInOut",this.clicker=document.getElementById("menu-wrapper"),this.container=document.getElementById("slider"),this.images=JSON.parse(this.container.getAttribute("data-images")),this.width=this.container.offsetWidth,this.height=this.container.offsetHeight,this.container.appendChild(this.renderer.domElement),this.camera.position.set(0,0,2),this.initiate((function(){console.log(e.state.textures),e.setupResize(),e.settings(),e.addObjects(),e.resize(),e.clickEvent(),e.play()}))}},{key:"next",value:function(){var e=this;if(!this.state.isRunning){this.isRunning=!0;var t=this.state.textures.length,n=this.state.textures[(this.state.current+1)%t];this.material.uniforms.texture2.value=n,(new w.a).to(this.material.uniforms.progress,this.duration,{value:1,ease:"easeOut",onComplete:function(){console.log("FINISH"),e.setState({current:(e.state.current+1)%t}),e.material.uniforms.texture1.value=n,e.material.uniforms.progress.value=0,e.setState({isRunning:!1})}})}}},{key:"render",value:function(){return Object(a.jsx)(i.Fragment,{children:Object(a.jsxs)("main",{className:"background",children:[Object(a.jsx)("div",{className:"frame"}),Object(a.jsx)("div",{id:"content",className:"content",children:Object(a.jsx)("div",{id:"slider","data-images":'["https://i.imgur.com/DEpTca1.jpeg","https://i.imgur.com/SX8n9kc.jpeg","https://i.imgur.com/tYPQKZJ.jpeg"]',"data-displacement":""})})]})})}}]),n}(i.Component),_=n(12),N=n(37),M=["Lorem ipsum dolor","Quisque vel odio vulputate","Etiam quis justo maximus","Vivamus vulputate leo venenatis"],S=[["Iceberg Tours through the coldest lands","The Primary Tour","A lot of ice to be seen in all corners. Tours start at $10 and increment up based on preference"],["Dodge Charger","The Secondary Tour","Famous on and off the screen, this Charger comes with a 5 speed Tremec transmission Tk06 and..."],["Porsche GT3 RS","The Terniary Tour","This 'mean, green, machine' is the most powerful road-legal 911. Don't blink."]],T=["Icebergs","Tours","Ice","Water","Fresh","Salt","Iceland"],E=n(21),k=n(15),C=n(28),D=[[n.p+"static/media/Ice1.aeabf3d9.jpg",n.p+"static/media/Ice2.a65fb84c.jpeg",n.p+"static/media/4.dbbe511c.png",.2]],I=new E.c;function R(e){var t=e.url1,n=e.url2,r=e.disp,s=e.intensity,c=e.hovered,o=Object(C.b)({progress:c?1:0}).progress,l=Object(k.e)().invalidate,u=Object(i.useMemo)((function(){var e=I.load(t,l),a=I.load(n,l),i=I.load(r,l);return i.wrapS=i.wrapT=E.b,e.magFilter=a.magFilter=E.a,e.minFilter=a.minFilter=E.a,{uniforms:{effectFactor:{type:"f",value:s},dispFactor:{type:"f",value:0},texture:{type:"t",value:e},texture2:{type:"t",value:a},disp:{type:"t",value:i}},vertexShader:"\n    varying vec2 vUv;\n    void main() {\n      vUv = uv;\n      gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );\n    }\n  ",fragmentShader:"\n  varying vec2 vUv;\n  uniform sampler2D texture;\n  uniform sampler2D texture2;\n  uniform sampler2D disp;\n  uniform float _rot;\n  uniform float dispFactor;\n  uniform float effectFactor;\n\n   vec2 rotate(vec2 v, float a) {\n    float s = sin(a);\n    float c = cos(a);\n    mat2 m = mat2(c, -s, s, c);\n    return m * v;\n   }\n\n  void main() {\n\n    vec2 uv = vUv;\n\n    vec4 disp = texture2D(disp, uv);\n\n    vec2 distortedPosition = vec2(uv.x + dispFactor * (disp.r*effectFactor), uv.y);\n    vec2 distortedPosition2 = vec2(uv.x - (1.0 - dispFactor) * (disp.r*effectFactor), uv.y);\n\n    vec4 _texture = texture2D(texture, distortedPosition);\n    vec4 _texture2 = texture2D(texture2, distortedPosition2);\n\n    vec4 finalTexture = mix(_texture, _texture2, dispFactor);\n\n    gl_FragColor = finalTexture;\n  }\n"}}),[t,n,r,s,l]);return Object(a.jsxs)("mesh",{children:[Object(a.jsx)("planeBufferGeometry",{name:"geometry",args:[8,8]}),Object(a.jsx)(C.a.shaderMaterial,{name:"material",args:[u],"uniforms-dispFactor-value":o})]})}function z(e){var t=Object(i.useState)(!1),n=Object(u.a)(t,2),r=n[0],s=n[1],c=Object(i.useCallback)((function(){return s(!0)}),[]),l=Object(i.useCallback)((function(){return s(!1)}),[]);return Object(a.jsx)("div",{className:"item",onMouseEnter:c,onMouseLeave:l,onTouchStart:c,onTouchEnd:l,onTouchCancel:l,children:Object(a.jsx)(k.a,{className:"canvas",invalidateFrameloop:!0,props:{antialias:!1,stencil:!1},children:Object(a.jsx)(R,Object(o.a)(Object(o.a)({},e),{},{hovered:r}))})})}var F=function(){return Object(a.jsx)("div",{className:"grid",children:D.map((function(e,t){var n=Object(u.a)(e,4),i=n[0],r=n[1],s=n[2],c=n[3];return Object(a.jsx)(z,{url1:i,url2:r,disp:s,intensity:c},t)}))})},P=n.p+"static/media/img1.70a494a4.jpg",L=n.p+"static/media/img2.e6cd24c4.jpg",V=n.p+"static/media/img3.532b376b.jpg",U=n.p+"static/media/img4.76321957.jpg";var B=function(e){var t=e.magnetIn,n=e.magnetOut,i=e.setRightMenuVisible,r=e.rightMenuVisible,s=e.setCarIndex;return Object(a.jsxs)("div",{className:"sidebar-items",children:[Object(a.jsxs)("div",{className:"menu-container",children:[Object(a.jsx)("input",{type:"checkbox",class:"menu-btn",id:"menu-btn",onMouseEnter:t,onMouseLeave:n}),Object(a.jsx)("label",{for:"menu-btn",class:"menu-icon",onMouseEnter:t,onMouseLeave:n,onClick:function(){return i(!r)},children:Object(a.jsx)("span",{class:"navicon"})})]}),Object(a.jsx)("a",{href:"https://www.dropbox.com/s/wchtpctilaxujfv/ISHAN_UPDATED_RESUME.pdf?dl=0",className:"current-item",onMouseEnter:t,onMouseLeave:n,children:"Resume"}),Object(a.jsxs)("div",{className:"arrow-containers",children:[Object(a.jsx)("button",{id:"menu-wrapper",className:"menu-wrapper",onMouseEnter:t,onMouseLeave:n,onClick:s((function(e){return(e+1)%2})),children:Object(a.jsx)("a",{href:"#",class:"link",children:Object(a.jsx)("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24",width:"24",height:"24",children:Object(a.jsx)("path",{"fill-rule":"evenodd",d:"M6.47 10.78a.75.75 0 010-1.06l5.25-5.25a.75.75 0 011.06 0l5.25 5.25a.75.75 0 11-1.06 1.06L13 6.81v12.44a.75.75 0 01-1.5 0V6.81l-3.97 3.97a.75.75 0 01-1.06 0z"})})})}),Object(a.jsx)("button",{id:"menu-wrapper",className:"menu-wrapper",onMouseEnter:t,onMouseLeave:n,children:Object(a.jsx)("a",{href:"#",class:"link",children:Object(a.jsx)("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24",width:"24",height:"24",children:Object(a.jsx)("path",{"fill-rule":"evenodd",d:"M4.97 13.22a.75.75 0 000 1.06l6.25 6.25a.75.75 0 001.06 0l6.25-6.25a.75.75 0 10-1.06-1.06l-4.97 4.97V3.75a.75.75 0 00-1.5 0v14.44l-4.97-4.97a.75.75 0 00-1.06 0z"})})})})]})]})};function W(){var e=Object(m.a)(['\n  box-sizing: border-box;\n  cursor: pointer;\n\n  padding: "2rem";\n  fontsize: "30px";\n\n  transition: color 0.2s;\n  :hover {\n    color: blue;\n  }\n  :last-child {\n    border-bottom: none;\n  }\n']);return W=function(){return e},e}var H=Object(N.a)(_.a.div)(W());function A(){var e=Object(i.useRef)(null),t=Object(i.useRef)(null),n=1e3,s=1e3,c=1e3,m=1e3,d=Object(i.useState)(!1),h=Object(u.a)(d,2),j=h[0],g=h[1],v=Object(i.useState)([-100,-100]),b=Object(u.a)(v,2),x=Object(u.a)(b[0],2),O=x[0],w=x[1],N=b[1],E=Object(i.useState)(!1),k=Object(u.a)(E,2),C=k[0],D=k[1],I=Object(i.useState)(0),R=Object(u.a)(I,2),z=R[0],W=R[1],A=Object(i.useState)(null),Y=Object(u.a)(A,2),X=Y[0],G=Y[1],J=function(e){g(!0);var t=e.currentTarget.getBoundingClientRect();N([Math.round(t.left+t.width/2),Math.round(t.top+t.height/2)])},q=function(){g(!1)};Object(i.useEffect)((function(){e.current.style.left="-100px",e.current.style.top="-100px",t.current.width=window.innerWidth,t.current.height=window.innerHeight,function(){f.a.setup(t.current);var e=new f.a.Path.RegularPolygon(new f.a.Point(0,0),8,15);e.strokeColor="#266981",e.strokeWidth=1;var a=75,i=!1,r=e.segments.map((function(){return new p.a})),o=[],l=new f.a.Group([e]);l.applyMatrix=!1;var u=function(e,t,n){return(1-n)*e+n*t},d=function(e,t,n,a,i){return(e-t)*(i-a)/(n-t)+a};f.a.view.onFrame=function(t){j?j&&(n=u(n,O,.2),s=u(s,w,.2),l.position=new f.a.Point(n,s)):(n=u(n,c,.2),s=u(s,m,.2),l.position=new f.a.Point(n,s)),j&&e.bounds.width<a?e.scale(1.08):!j&&e.bounds.width>30&&(i&&(e.segments.forEach((function(e,t){e.point.set(o[t][0],o[t][1])})),i=!1,o=[]),e.scale(.92)),j&&e.bounds.width>=a&&(i=!0,0===o.length&&e.segments.forEach((function(e,t){o[t]=[e.point.x,e.point.y]})),e.segments.forEach((function(e,n){var a=r[n].noise2D(t.count/150,0),i=r[n].noise2D(t.count/150,1),s=d(a,-1,1,-4,4),c=d(i,-1,1,-4,4),l=o[n][0]+s,u=o[n][1]+c;e.point.set(l,u)}))),e.smooth()}}()}));var Q=Object(i.useState)(!1),$=Object(u.a)(Q,2),K=$[0],Z=$[1];Object(i.useEffect)((function(){G(S[z])}),[z]);var ee=Object(i.useState)(!0),te=Object(u.a)(ee,2),ne=te[0],ae=(te[1],Object(_.c)({opacity:K?1:0,transform:K?"translateX(0)":"translateX(100%)"})),ie=r.a.useRef(),re=100,se=Object(_.d)(M.length,M.map((function(e,t){return{ref:ie,item:e,delay:K?t*re:M.length*re-t*re,opacity:K?1:0,x:K?"0%":"20%",from:{opacity:0,x:"20%"}}}))),ce=r.a.useRef(),oe=Object(_.d)(X?X.length:3,X?X.map((function(e,t){return{ref:ce,item:e,delay:K?t*re:S[0].length*re-t*re,opacity:K?0:1,y:K?"20%":"0%",from:{opacity:1,y:"0%"}}})):S[0].map((function(e,t){return{ref:ce,item:e,delay:K?S[0].length*re-t*re:t*re,opacity:K?0:1,y:K?"20%":"0%",from:{opacity:1,y:"0%"}}}))),le=Object(_.d)(T.length,T.map((function(e,t){return{item:e,delay:C?t*re:T.length*re-t*re,opacity:C?1:0,y:C?"0%":"20%",from:{opacity:0,y:"20%"}}}))),ue=Object(_.c)({transform:C?"translateY(0)":"translateY(-100%)",opacity:C?1:0});r.a.useEffect((function(){console.log(K),Z(!1)}),[]);var me=r.a.useRef(),de=Object(_.c)({ref:me,iconTransform:ne?"rotate(0deg)":"rotate(-45deg)",height:K?"".concat(60*M.length,"px"):"0px",from:{iconTransform:"rotate(-45deg)",height:"0px"}});de.background,de.iconTransform,Object(l.a)(de,["background","iconTransform"]);return Object(_.b)([ie,ce],K?[.75,0]:[.25,.25]),Object(a.jsxs)("main",{children:[Object(a.jsxs)("div",{className:"frame",children:[Object(a.jsx)("div",{className:"frame__title-wrap"}),Object(a.jsx)("div",{className:"frame__links"}),Object(a.jsxs)("div",{className:"frame__demos",children:[Object(a.jsx)("a",{href:"https://isengupt.github.io/glass-blur/",activeClassName:"frame__demo--current",className:"frame__demo",onMouseEnter:J,onMouseLeave:q,children:Object(a.jsx)("svg",{style:{fill:C?"black":"#fff"},className:"menu__svg",xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 16 16",width:"16",height:"16",children:Object(a.jsx)("path",{"fill-rule":"evenodd",d:"M7.78 12.53a.75.75 0 01-1.06 0L2.47 8.28a.75.75 0 010-1.06l4.25-4.25a.75.75 0 011.06 1.06L4.81 7h7.44a.75.75 0 010 1.5H4.81l2.97 2.97a.75.75 0 010 1.06z"})})}),Object(a.jsx)("a",{href:"https://github.com/isengupt/car-prods",activeClassName:"frame__demo--current",className:"frame__demo",onMouseEnter:J,onMouseLeave:q,children:Object(a.jsx)("svg",{style:{fill:C?"black":"#fff"},className:"menu__svg",xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 16 16",width:"16",height:"16",children:Object(a.jsx)("path",{"fill-rule":"evenodd",d:"M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"})})}),Object(a.jsx)("a",{href:"#",activeClassName:"frame__demo--current",className:"frame__demo",onMouseEnter:J,onMouseLeave:q,onClick:function(){return D(!C)},children:Object(a.jsx)("svg",{style:{transform:C?"rotate(45deg)":"rotate(0deg)",fill:C?"black":"#fff"},xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24",width:"24",height:"24",children:Object(a.jsx)("path",{"fill-rule":"evenodd",d:"M11.75 4.5a.75.75 0 01.75.75V11h5.75a.75.75 0 010 1.5H12.5v5.75a.75.75 0 01-1.5 0V12.5H5.25a.75.75 0 010-1.5H11V5.25a.75.75 0 01.75-.75z"})})})]})]}),Object(a.jsxs)("div",{onMouseMove:function(t){c=t.clientX,m=t.clientY,e.current.style.left="".concat(c-2.5,"px"),e.current.style.top="".concat(m-2.5,"px")},className:"container",children:[Object(a.jsx)("div",{ref:e,className:"cursor cursor--small"}),Object(a.jsx)("canvas",{ref:t,className:"cursor cursor--canvas"}),Object(a.jsx)(y,{}),Object(a.jsxs)("div",{className:"main-content",style:{width:"100%",height:"100%",position:"relative"},children:[Object(a.jsxs)("div",{className:"main-navbar",children:[Object(a.jsxs)("div",{className:"frame__title-wrap",children:[Object(a.jsx)("h1",{className:"frame__title",children:"Ishan Sengupta"}),Object(a.jsx)("p",{className:"frame__tagline",children:"Front-end experimentation"})]}),Object(a.jsx)("div",{className:"collections__item",children:Object(a.jsx)("span",{children:" "})})]}),Object(a.jsxs)("div",{className:"main-info",children:[[oe[0]].map((function(e,t){var n=e.y,i=Object(l.a)(e,["y"]);return Object(a.jsx)(_.a.div,{style:Object(o.a)({paddingBottom:"1rem",fontSize:"62px",fontWeight:"bolder",letterSpacing:"1.25px",maxWidth:"75%",lineHeight:"1.1",transform:n.interpolate((function(e){return"translateY(".concat(e,")")}))},i),children:i.item?i.item:"Iceberg Tours through the coldest lands"},t)})),[oe[1]].map((function(e,t){var n=e.y,i=Object(l.a)(e,["y"]);return Object(a.jsx)(_.a.div,{style:Object(o.a)({paddingBottom:"1rem",fontSize:"20px",fontWeight:"bold",fontStyle:"italic",opacity:"0.5",transform:n.interpolate((function(e){return"translateY(".concat(e,")")}))},i),children:i.item?i.item:"The Primary Tour"},t)})),[oe[2]].map((function(e,t){var n=e.y,i=Object(l.a)(e,["y"]);return Object(a.jsx)(_.a.div,{style:Object(o.a)({paddingBottom:"1rem",fontSize:"14px",color:"rgba(0,0,0,0.7)",fontWeight:"bold",maxWidth:"75%",transform:n.interpolate((function(e){return"translateY(".concat(e,")")}))},i),children:i.item?i.item:"A lot of ice to be seen in all corners. Tours start at $10 and increment up based on preference"},t)})),[oe[2]].map((function(e,t){var n=e.y,i=Object(l.a)(e,["y"]);return Object(a.jsx)(_.a.div,{style:Object(o.a)({paddingBottom:"1rem",letterSpacing:"2",fontSize:"12px",fontWeight:"bolder",textTransform:"uppercase",transform:n.interpolate((function(e){return"translateY(".concat(e,")")}))},i),children:"MORE"},t)}))]}),Object(a.jsx)("div",{className:"main-footer",children:Object(a.jsx)("span",{children:" "})}),Object(a.jsxs)(_.a.div,{className:"big__menu menu--full",style:ue,children:[Object(a.jsx)("div",{style:{height:"100%",width:"100%",overflow:"hidden",display:"flex",marginLeft:"2rem",flexDirection:"column",justifyContent:"center"},children:le.map((function(e,t){var n=e.y,i=Object(l.a)(e,["y"]);return Object(a.jsx)(H,{style:Object(o.a)({padding:"1rem",fontSize:"32px",transform:n.interpolate((function(e){return"translateX(".concat(e,")")}))},i),magnetIn:J,magnetOut:q,children:i.item},t)}))}),Object(a.jsxs)("div",{className:"newsletter__container",children:[Object(a.jsxs)("div",{className:"newsletter__images",children:[Object(a.jsx)("img",{className:"newsletter__image",src:P,alt:"img1"}),Object(a.jsx)("img",{className:"newsletter__image",src:L,alt:"img2"}),Object(a.jsx)("img",{className:"newsletter__image",src:V,alt:"img3"}),Object(a.jsx)("img",{className:"newsletter__image active",src:U,alt:"img4"})]}),Object(a.jsx)("div",{className:"newsletter__footer",children:Object(a.jsx)("input",{placeholder:"NEWSLETTER",className:"newsletter__input",type:"text",id:"lname",name:"lname"})})]})]}),Object(a.jsxs)(_.a.div,{className:"menu menu--right",style:ae,children:[Object(a.jsx)("div",{className:"menu--image",children:Object(a.jsx)(F,{})}),Object(a.jsxs)("div",{style:{height:"100vh",width:"100%",overflow:"hidden",display:"grid",gridTemplateRows:"1fr 50px",background:"#fff",padding:"2rem",flexDirection:"column",justifyContent:"center",alignItems:"flex-start"},children:[Object(a.jsx)("div",{style:{height:"100%",width:"100%",display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"flex-start"},children:se.map((function(e,t){var n=e.x,i=Object(l.a)(e,["x"]);return Object(a.jsx)(H,{style:Object(o.a)({fontSize:"36px",paddingTop:"2rem",paddingBottom:"2rem",paddingLeft:"1rem",transform:n.interpolate((function(e){return"translateX(".concat(e,")")}))},i),magnetIn:J,magnetOut:q,children:i.item},t)}))}),Object(a.jsxs)("div",{style:{display:"flex",flexDirection:"row",width:"100%",paddingBottom:"1rem",letterSpacing:"2",fontSize:"14px",fontWeight:"bold",textTransform:"uppercase",alignItems:"center",justifyContent:"flex-start"},children:[Object(a.jsx)("div",{magnetIn:J,magnetOut:q,style:{paddingLeft:"1rem",marginRight:"2rem"},children:"Hello"}),Object(a.jsx)("div",{style:{marginRight:"2rem"},children:"Goodbye"})]})]})]})]}),Object(a.jsx)("div",{className:"sidebar",children:Object(a.jsx)(B,{magnetIn:J,magnetOut:q,setRightMenuVisible:Z,rightMenuVisible:K,setCarIndex:W})})]})]})}function Y(){return Object(a.jsx)(a.Fragment,{children:Object(a.jsx)(A,{})})}H.defaultProps={bg:"#fff"},c.a.render(Object(a.jsx)(r.a.StrictMode,{children:Object(a.jsx)(Y,{})}),document.getElementById("root"))}},[[58,1,2]]]);
//# sourceMappingURL=main.8c6fd92b.chunk.js.map