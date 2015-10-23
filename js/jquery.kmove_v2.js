;(function($){
    function Drag(opts,selector){
        var self = this;
        this.selector = selector;
        this.opts = $.extend({},Drag.defaults,opts);
        this.bindEvent(selector,"mousedown",function(e){
            var _this = $(this);
            self.mdownFunc(e,self,_this);
        });
    }

    Drag.prototype = {
        bindEvent : function(x,ev,func){
            var obj = this.opts.obj,
                self = this;
            if(obj.length){
                x.on(ev,obj,func);
            }else{
                x.on(ev,func);
            }
        },
        mdownFunc : function(e,that,xobj){
            e.stopPropagation();
            var _this = xobj,
                opts = that.opts,
                pLeft = _this.position().left,
                pTop = _this.position().top,
                pX = e.pageX,
                pY = e.pageY,
                maxLeft = _this.parent().innerWidth()-_this.outerWidth(),
                maxTop = _this.parent().innerHeight()-_this.outerHeight();
            $(document).on("mousemove",function(e){
                e.stopPropagation();
                var nowLeft = e.pageX-pX+pLeft, nowTop = e.pageY-pY+pTop;
                if(opts.limit){
                    if(nowLeft<0){
                        nowLeft = 0;
                    }
                    if(nowTop<0){
                        nowTop=0;
                    }
                    if(nowLeft > maxLeft){
                        nowLeft = maxLeft;
                    }
                    if(nowTop > maxTop){
                        nowTop = maxTop;
                    }
                }
                if(opts.way=="horizontal" || opts.way=="both")
                {_this.css("left",nowLeft);}
                if(opts.way=="vertical" || opts.way=="both")
                {_this.css("top",nowTop);}

                e.preventDefault();
                return false;
            });

            $(document).on("mouseup",function(){
                $(document).unbind("mousemove");
                $(document).unbind("mouseup");
            });
            return false;
        }
    }

    Drag.defaults={
        obj : "",
        way : "both",
        limit : true
    }

    $.fn.kMove = function(options){
        var drag1  = new Drag(options,$(this));
        return this;
    }

})(jQuery);
