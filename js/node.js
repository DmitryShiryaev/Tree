
var iterator = (function Iterator(){
	var i = 0;	
	var add = "";
	return {
		next: function(){
			if(i != Infinity)
				i++;
			else{
				i = 0;
				add += "A";
			}
				return (add+i);
			
		}
	};	
}());

function Node(data){	
	this.data = data;
	this.parent = null;
	this.children = new Array();	
	this.id = iterator.next();
	this.UI = {
		childList: null,
		nameDiv: null,
		input: null
	}
	
	return this;
}

Node.prototype.render = function(element){
	var li,ul,name,div,input;
	name = this.data.name || "node";
	var isRoot = this.isRoot();
	var isParentRoot = this.isParentRoot() ? "isRoot" :"";
	var isLast = this.isLast() ? "isLast" :"";
	
	if(isRoot){
		
		div = $("<div>",{class:"Content",internalId:this.id}).text("Root").appendTo(element);				
		$("<div/>",{class:"Add",internalId:this.id}).hide().appendTo(element);		
		$("<div/>",{class:"Remove",internalId:this.id}).hide().appendTo(element);		
		ul = $("<ul/>",{class:"Container"}).appendTo(element);		
	}	
	else{
		li = $("<li/>",{class:"Node ExpandLeaf " + isParentRoot + " " + isLast }).appendTo(element);
		$("<div/>",{class:"Expand"}).appendTo(li);	
		input = $("<input/>").hide().appendTo(li);		
		div = $("<div/>",{class:"Content",internalId:this.id}).text(name).appendTo(li);				
		$("<div/>",{class:"Add",internalId:this.id}).hide().appendTo(li);		
		$("<div/>",{class:"Remove",internalId:this.id}).hide().appendTo(li);		
		
		ul = $("<ul/>",{class:"Container"}).appendTo(li);
	}
	this.UI.childList = ul;	
	this.UI.nameDiv = div;
	this.UI.input = input;
	
	return ul;
};
Node.prototype.changeElement = function(callback){
	this_ = this;	
	this.UI.nameDiv.hide();
	this.UI.input.show();
	this.UI.input.on("focusout",function(event){	
		var data = {'name': $(this).val()}
		this_.edit(data);
		this_.UI.nameDiv.show();
		this_.UI.input.hide();		
		if(typeof callback == "function")
			callback();
	});
	
}
Node.prototype.edit =  function(data){	
	this.data = data;
	this.UI.nameDiv.text(data.name);
}
Node.prototype.remove =  function(){	
	this.UI.childList.parent().remove();
}
Node.prototype.isLast =  function(){
	return this.children.length == 0 ? true : false;
}
Node.prototype.isRoot = function(){
	return this.parent == null ? true:false;
}
Node.prototype.isParentRoot = function(){
	if(this.parent != null)
		return this.parent.parent == null ? true:false;
}
/*
Node.prototype.getID = function(){
	return this.id;
};

Node.prototype.getParent = function(){
	return this.parent;
};*/