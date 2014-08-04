define(function(require, exports, module) {
    
    var Root = require("as/asRoot");
    var Surface = require("as/asSurface");
    var Container = require("as/asContainer");
    
    var Image = require("as/asImage");
    var Sprite = require("as/asSprite");
    var Video = require("as/asVideo");
    var Text = require("as/asInput");

    var root = new Root();
    root.perspective = 1000;

    var stage_size = root.getSize();
    var SW = stage_size[0];
    var SH = stage_size[1];

    var video_size = {width:1920, height:1080};
    var card_size = {width:400, height:246};
    var no_video = false;
    var video;
    var placeholder;
    var card = new Sprite();
    var cardSlider = new Sprite();
    var mainCard = new Sprite();
    var act; // actual menu
    var main_bg;
    var mobile_edge = 840;
    var device = "desktop";
    var page_margin = 34;
    var gap = 10;
    var pageTime = 0.4;
    var align = {
        mobile:[0.5, 0.3],
        desktop:[0.75, 0.386]
    };
    var default_rotations = {
        top:{rotationX:-90},
        right:{rotationY:-90},
        bottom:{rotationX:90},
        left:{rotationY:90},
        left_left:{rotationY:90}
    };

    var isMobile = {
        Android: function() {
            return /Android/i.test(navigator.userAgent);
        },
        BlackBerry: function() {
            return /BlackBerry/i.test(navigator.userAgent);
        },
        iOS: function() {
            return /iPhone|iPad|iPod/i.test(navigator.userAgent);
        },
        Windows: function() {
            return /IEMobile/i.test(navigator.userAgent);
        },
        any: function() {
            return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Windows());
        }
    };

    //start the show
    $("#data").css({visibility:"hidden"});
    function init(){
        if(!$("#data-main").html()){
            setTimeout(init, 1000);
            return;
        }
        var canvasW = $(document).width();
        ///var canvasH = $(document).height();
        if(canvasW < mobile_edge){
            device = "mobile";
        }else{
            device = "desktop";
        }

        main_bg = new Sprite();
        root.addChild(main_bg);
        placeholder = createPlaceholder();
        main_bg.addChild(placeholder);

       // placeholder.mask = {x:0, y:0, width:300, height:300, fixed:true}
        //placeholder.x = placeholder.y = -100;
        no_video = isMobile.any.call();
        if(!no_video){
            video = createVideo();
            main_bg.addChild(video);
        }else{
            video = {};
        }
        
        main_bg.addEventListener("click", bgClick);
        createCard();
        createMenuCards();


        $.sammy(function(){

            this.get('/', function(){
                switchMenu(undefined);
            });
            this.get('/#:page',function(){
             
                if(data.pages[this.params['page']]){
                    var new_page = this.params['page'];
                    switchMenu(this.params['page']);
                }else{
                    //this.setLocation('#');
                    location.hash = '#';
                }   
            });
          }).run();

        //console.log("hash ready");
        /**/
        

    }
    function bgClick(){
        console.log("bgClick");
        //switchMenu(act);
        //act = undefined;
    }

    function createVideo(_parent){
        var vid = new Video();
        vid.setOptions({autoplay:true});
        //vid.regX = vid.regY = .5;
        function isSafari() {
            return /^((?!chrome).)*safari/i.test(navigator.userAgent);
        }
        vid.addContent(isSafari() ? 'video/sharp_bg.mp4' : 'video/sharp_bg.webm');
        vid.addEventListener('deploy', function(){
            vid._currTarget.setAttribute('loop', true); 
            /*video._currTarget.loop = false; 
            video._currTarget.addEventListener('ended', function() { 
                video._currTarget.currentTime=0.1; video.play();
            }, false);*/

            resize();
        });
        //root.addChild(video);

        return vid;
        
    }
    function createPlaceholder(){
        var img = new Image();
        img.addEventListener('deploy', resize);
        img.addContent("img/placeholder.jpg");

        return img;
    }

    function createCard(){
        root.addChild(card);
        
        
        /*card.alignX = 0.75;
        card.alignY = 0.386;
*/
        card.alignX = align[device][0];
        card.alignY = align[device][1];

        card.addChild(cardSlider);
        cardSlider.addChild(mainCard);

        //cardSlider.regX = card_size.width/2

        var bg = new Surface();
        mainCard.addChild(bg);
       
        //bg.alpha = .7;
        var text = new Surface();
        mainCard.addChild(text);

        var footer = new Surface();
        mainCard.addChild(footer);

        var logo = new Image();
        mainCard.addChild(logo);
        
        logo.addContent("img/sharp_logo.png");
        logo.addEventListener("click", function(){
            location.hash = '#';
        });
        //logo.scaleX = 1.111;
        logo.width = 132;
        logo.height = 40;
        logo.y = 18;

        logo.useHandCursor = true;

        bg.width = card.width = card_size.width;
        bg.height = card.height = card_size.height;

        bg.color = "#FFFFFF";

        

        text.addEventListener("deploy", addMainListeners);
        data.main.content = $("#data-main").html();
        text.addContent(data.main.content);
        text.css({
            fontSize:"24px",
            color:"#333333",
            lineHeight:"26px"
        });
        text.x = page_margin;
        text.y = 89;

        footer.width = card.width;
        footer.height = 14;
        data.footer.content = $("#data-footer").html();
        footer.addContent(data.footer.content);
        footer.color = "#FF0000";
        footer.css({
            fontSize:"8px",
            textAlign:"center",
            color:"#FFFFFF",
            lineHeight:"14px",
            fontWeight:"800"
        });
        footer.y = card.height-footer.height;

        card.regX = card.width/2;
        card.regY = card.height/2;
    }
    // root listeners
    function addMainListeners(){
        /*console.log("addMainListeners");
        $("a").attr("href", "#");
        $("#main-text span").on("click", function(e){
            switchMenu(e.currentTarget.id);
        });*/
    }
    
    // menu items

    function createMenuCards(){
        for(var i in data.pages){
            var pages = data.pages[i];
            if(!pages[0].link){
                for(var s = 0; s < pages.length; s++){
                    var htmlID = "#data-"+i+(pages.length > 1 ? "-"+s : "");
                    pages[s].content = $(htmlID).html();
                    var page = pages[s];
                    page.obj = getSubPage(page, i);
                    page.obj._global_width = 0;
                    page.obj._global_height = 0;

                    Object.defineProperty(page.obj, "global_width", {
                       enumerable : true,
                       configurable : true,
                        get : function(){ return this._global_width; },
                        set : function(newValue){
                            this.width = newValue;
                            this._global_width = newValue;
                            this.bg.width = newValue;
                            this.container.width = newValue;
                            this.text.width = newValue;
                        }
                    });
                    Object.defineProperty(page.obj, "global_height", {
                       enumerable : true,
                       configurable : true,
                        get : function(){ return this._global_height; },
                        set : function(newValue){
                            this.height = newValue;
                            this._global_height = newValue;
                            this.bg.height = newValue;
                            this.container.height = newValue;
                            //this.text.height = newValue;
                            
                        }
                    });
                }
            }
        }
        positionElements();
    }


    //
    //
    //
    //
    //
    //
    //   here
    //
    //
    //
    //

    function getSubPage(page, name){
        var pageHolder = new Sprite();
        cardSlider.addChild(pageHolder);
        /*cardSlider.regX = 80;
        cardSlider.regY = 80;
        cardSlider.alignX = 0;
        cardSlider.alignY = 0;*/

        var bg = pageHolder.bg = new Surface();
        //pageHolder.addChild(bg);
        pageHolder.addChild(bg);
        var container = pageHolder.container = new Container();
        pageHolder.addChild(container);
        

        
        bg.color = "#FFFFFF";
        var heigh = 0;
        if(name == "contact"){
            heigh = 132;
        }else{
            heigh = card_size.height*page[device].height;
        }
        pageHolder.width = bg.width = card_size.width*page[device].width;
        pageHolder.height = bg.height = heigh;
        
        container.width = bg.width;
        container.height = bg.height;

       

        var text = pageHolder.text = new Surface();
        text.name = name;
        container.addChild(text);

        //pageHolder.addChild(text);

        text.width = bg.width;
        //text.height = 800;
       // text.mask = {x:0, y:0, width:bg.width, height:bg.height, fixed:true}
        //text.mask = {x:0, y:0, width:200, height:200, fixed:true};
        //text.color = "#FF0000";
        //text.scrollX = true;
        text.scrollY = true;
        //text.drag = true;


        //text.addEventListener("deploy", getHeightOfElement);
        if(name != "contact"){
            text.autoSize = true;
        }
        //text.height = 800;
        //text.width = 800;
        text.addContent(page.content);

        text.css({
            padding:21+"px",
            fontSize:"15px",
            color:"#333333"
        });

        pageHolder.alpha = 0;
        pageHolder.visible = false;

        return pageHolder;
    }
    

    //
    //
    //
    //
    //

    function changeView(){
        positionElements(true);

        TweenLite.to(card, pageTime, {alignX:align[device][0], alignY:align[device][1]});
       // var sub_position = getSubPosition(act);
        //TweenLite.to(cardSlider, {x:sub_position.x, y:sub_position.y});
    }
    function positionElements(change){

        for(var i in data.pages){
            var pages = data.pages[i];
            if(!pages[0].link){
                for(var s = 0; s < pages.length; s++){
                    var page = pages[s];
                    var tweenObj = {};
                    switch(page[device].align){
                        case "top":
                           
                            tweenObj.x = 0;
                            tweenObj.y = -gap;
                            tweenObj.global_width = card_size.width*page[device].width;
                            tweenObj.global_height = card_size.height*page[device].height;

                            tweenObj.regX = 0;
                            tweenObj.regY = tweenObj.global_height;

                        break;
                        case "right":
                            tweenObj.regX = 0;
                            tweenObj.regY = 0.5;
                            tweenObj.x = card_size.width+gap;
                            tweenObj.y = 0;
                            tweenObj.global_width = card_size.width*page[device].width;
                            tweenObj.global_height = card_size.height*page[device].height;
                        break;
                        case "bottom":
                            tweenObj.regX = 0;
                            tweenObj.regY = 0;
                            tweenObj.x = 0;
                            tweenObj.y = card_size.height+gap;
                            tweenObj.global_width = card_size.width*page[device].width;
                            tweenObj.global_height = card_size.height*page[device].height;

                            if(page[device].width < 1){
                                tweenObj.global_width -= gap;
                            }

                        break;
                        case "left":
                            tweenObj.global_width = card_size.width*page[device].width;
                            tweenObj.global_height = card_size.height*page[device].height;

                            tweenObj.regX = tweenObj.global_width;
                            tweenObj.regY = 0;

                            //tweenObj.x = -(card_size.width/2)*page[device].width-gap;
                            tweenObj.x = -gap;
                            tweenObj.y = 0;
                           
                        break;
                        case "left_left":
                            tweenObj.global_width = card_size.width*page[device].width;
                            tweenObj.global_height = card_size.height*page[device].height;

                            tweenObj.regX = tweenObj.global_width;
                            tweenObj.regY = 0;

                            //tweenObj.x = -(card_size.width/2)*page[device].width-gap;
                            tweenObj.x = -tweenObj.global_width-2*gap;
                            tweenObj.y = 0;
                            
                        break;
                    }
                    if(page[device].padX){
                        tweenObj.x += card_size.width*page[device].width+gap;
                    }
                    if(page[device].padY){
                        tweenObj.y += card_size.height*page[device].height+gap;
                    }
                    tweenObj.rotationX = default_rotations[page[device].align].rotationX ? default_rotations[page[device].align].rotationX : 0;
                    tweenObj.rotationY = default_rotations[page[device].align].rotationY ? default_rotations[page[device].align].rotationY : 0;


                    
                    if(act == i && change){// it is the displayed element
                        tweenObj.rotationX = tweenObj.rotationY = 0;
                        TweenLite.to(page.obj, pageTime, tweenObj);
                    }else{
                        for(var p in tweenObj){
                            page.obj[p] = tweenObj[p];
                        }
                    }
                }
            }
        }
    }
    function menuVisible(obj){
        obj.visible = false;
    }
    function switchMenu(_act){
        if(data.pages[_act]){
            if(act && _act != act){
                closeMenu(act);
            }
            if(_act && _act != act){
                openMenu(_act);
            }
            act = _act;
        }else{
            if(data.pages[act]){
                closeMenu(act);
                act = undefined;
            }
            
        }
        
        /*var page = data.pages[act][0];
        if(page.link){
            sendCardTo({x:0, y:0}, 1);
        }else{
            var tweenObj = {};
            switch(page[device].align){
                case "top":
                   
                   tweenObj.x = 0;
                   tweenObj.y = card_size.height*page[device].height;
                break;
                case "right":
                    tweenObj.x = -card_size.width*page[device].width;
                    tweenObj.y = 0;
                break;
                case "bottom":
                    tweenObj.x = 0;
                    tweenObj.y = -card_size.height*page[device].height;
                break;
                case "left":
                   
                break;
                case "left_left":

                break;
            }
            sendCardTo(tweenObj, data.pages[act].length);
        }*/
    }
    function sendCardTo(coor, num){
        if(!coor.x){
            coor.x = 0;
        }
        if(!coor.y){
            coor.y = 0;
        }
        TweenLite.to(cardSlider, pageTime*num, coor);
    }
    function closeMenu(name){
        var pages = data.pages[name];
        if(!pages[0].link){
            for(var s = 0; s < pages.length; s++){
                var page = pages[s];
                var tweenObj = {alpha:0, onComplete:menuVisible, onCompleteParams:[page.obj]};
                if(default_rotations[page[device].align].rotationX){
                    tweenObj.rotationX = default_rotations[page[device].align].rotationX;
                    tweenObj.rotationY = 0;
                }
                if(default_rotations[page[device].align].rotationY){
                    tweenObj.rotationX = 0;
                    tweenObj.rotationY = default_rotations[page[device].align].rotationY;
                }
                tweenObj.delay = (pages.length-1-s)*pageTime*0.5;
                TweenLite.to(page.obj, pageTime, tweenObj);
            }
        }
    }
    function openMenu(name){
        var pages = data.pages[name];
        if(!pages[0].link){
            for(var s = 0; s < pages.length; s++){
                var page = pages[s];
                page.obj.visible = true;

                var tweenObj = {alpha:1, rotationX:0, rotationY:0, delay:s*pageTime*0.8};
                
                TweenLite.to(page.obj, pageTime, tweenObj);
            }
        }
    }

    function getHeightOfElement(e){
        setTimeout(function(){
            //console.log(e);
            //console.log(e.origin);
            //console.log("getHeightOfElement "+e.currentTarget.name);
            //console.log($("."+e.currentTarget.name));
            //console.log(document.getElementById(e.currentTarget.name).getBoundingClientRect());
            //console.log(window.getComputedStyle(document.getElementById(e.currentTarget.name), ""))
            var newW = document.getElementById(e.currentTarget.name).offsetWidth;//$("."+e.currentTarget.name).height();
            var newH = document.getElementById(e.currentTarget.name).offsetHeight;//$("."+e.currentTarget.name).width();
           // console.log(newW+" "+newH);
            //e.currentTarget.height = newH;
        }, 1000);
        
    }

    root.Engine.on('keydown', function(e) {
        if(e.which == 32 && video._currTarget) {
            if(video._currTarget.paused){
                video._currTarget.play();
            }else{
                video._currTarget.pause();
            }
        }
    });
    root.Engine.on('resize', function() {
        resize();
    });
    root.Engine.on('deploy', function() {
        resize();
    });
    function resize(){
        stage_size = root.getSize();
        SW = stage_size[0];
        SH = stage_size[1];
        var ratio1 = SW/SH;
        var ratio2 = video_size.width/video_size.height;
        var w, h, scal;

        if(ratio1 > ratio2){
            scal = SW/video_size.width;
        }else{
            scal = SH/video_size.height;
        }
        video.width = placeholder.width = Math.ceil(video_size.width*scal);
        video.height = placeholder.height = Math.ceil(video_size.height*scal);

        if(SW < mobile_edge && device != "mobile"){
            device = "mobile";
            changeView();
        }else if(SW > mobile_edge && device != "desktop"){
            device = "desktop";
            changeView();
        }
        if(SW < card_size.width+page_margin*2){
            card.scaleX = card.scaleY = SW/(card_size.width+page_margin*2);
        }else{
            card.scaleX = card.scaleY = 1;
        }
    }

    $(init);

});
