;(function(win){
	'use strict';
     /**
       * params:Object
       *     id:string
       *     text:string  
       *     isShowCheck:boolen 
       *     childNode:array of Object
       *     selectNode:function
       *
       */
    var utils = {
    	isArray:function(ary){
    		return Object.prototype.toString.call(ary) === '[object Array]';
    	}

    } 
    Array.prototype.oneEach = function(callBack,context){
         var context = context||window;
         if("forEach" in Array.prototype){
            return this.forEach(callBack,context);	
         }else {
         	 for (var i = 0,len = this.length; i < len; i ++ ) {
         	 	callback.call(context,this[i],i,this);
         	 }
         } 
    } 
    function Tree(element,options){
         this.element = element;
         this.options = options;
         this.init();
    }

    function create(options){
    	var check = '<input type="checkbox" class="tree-checkbox"/> ';
    	var childDOM = eachFork(options.childNode,options.isShowCheck);
    	var html = '<ul class="sim-tree-parent"><li class="sim-tree-child"><a class="sim-tree-item">'+
    	             '<i class="tree-icon-arrow-close"></i>'+ check +'<span>a</span></a>';				
	    html += childDOM;				    
	    html += '</li></ul>';
		return html;			
    }
    
    function eachFork(ary,hasCheck){
    	var args = arguments,HTMLDOM ='',checkDOM = hasCheck?'<input type="checkbox" class="tree-checkbox"/>':'';
    	console.log(ary);
    	if(utils.isArray(ary) && ary.length > 0){
    		HTMLDOM += '<ul class="sim-tree-child-parent">';
             ary.oneEach(function(item,index){
             	if(item.hasOwnProperty('childNode')){
                    HTMLDOM += '<li><a class="sim-tree-item"><i class="tree-icon-arrow-close"></i>'+ checkDOM +'<span>a</span></a>';
                    HTMLDOM += eachFork(item.childNode,hasCheck);
                    HTMLDOM +='</li>'; 
             	}else{
                    HTMLDOM += '<li><a class="sim-tree-item">'+ checkDOM +'<span>a</span></a></li>'; 
             	}
             	 
             });
            HTMLDOM+='</ul>';
    	}
    	return HTMLDOM;	
    } 

    Tree.prototype = {
    	init:function(){
           var TREEDOM = create(this.options);
           this.element.insertAdjacentHTML('afterbegin',TREEDOM);
    	}
    } 
    

    win.Tree = Tree;
})(window);