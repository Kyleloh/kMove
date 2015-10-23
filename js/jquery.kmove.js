;(function($){
    $.fn.kMove = function(options){
        var opts = $.extend({}, $.fn.kMove.defaults, options),
            _this = this;
        function bindEvent(x,ev,func){
            if(typeof opts.obj == "string"){
                _this.on(ev,opts.obj,func);
            }else{
                x.on(ev,func);
            }
        }
        function realEvent(e){
                e.stopPropagation();
                var _this = $(this),
                    pLeft = $(this).position().left,
                    pTop = $(this).position().top,
                    pX = e.pageX,
                    pY = e.pageY,
                    maxLeft = $(this).parent().innerWidth()-$(this).outerWidth(),
                    maxTop = $(this).parent().innerHeight()-$(this).outerHeight();
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
        return this.each(function(){
            bindEvent($(this),"mousedown",realEvent);
        });

    }

    $.fn.kMove.defaults = {
        way : "both",
        limit : true
    }
})(jQuery);
