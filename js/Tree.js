function Tree(data){	
	this.root = new Node(data);		
	this.UI = {
		root: $("<div/>",{class: "Tree"}),		
	}
	this.status = {
		"change": false
	}
	this.renderElement(this.root,this.UI.root);	
	this.subcribeEvents();
	return this;
}
Tree.prototype.saveToLocalStorage = function(){	
	function replacer(key,value){
		if (key === "parent" && value !== null) {			
			return value.id;			
		}	
		else if(key === "UI")
			return null;
		
		return value;
	}
	var serialize = JSON.stringify(this.root,replacer);
	localStorage.setItem("Tree", serialize);
	return serialize;
};

Tree.prototype.getFromLocalStorage =  function(){
	this_ = this;		
	var object = JSON.parse(localStorage.getItem("Tree"));		
	this.root = new Node(object.data);
	this.UI.root = $("<div/>",{class: "Tree"});	
	
	(function getTree(object_,currentNode) {				
        for (var i = 0, length = object_.children.length; i < length; i++) {  				
			var newParent = this_.addNodeTo(object_.children[i].data,currentNode);
			getTree(object_.children[i],newParent);
        }
    })(object,this.root);	
	return object;
};

Tree.prototype.renderTree = function(element){	
	if(element.length > 0)
		this.UI.root = element;
	else 
		element = this.UI.root;
		
	(function getTree(currentNode,element_) {
		
		element_ = currentNode.render(element_);
        for (var i = 0, length = currentNode.children.length; i < length; i++) { 
            getTree(currentNode.children[i],element_);
        }
    })(this.root,element);
	
	this.subcribeEvents();
};

Tree.prototype.renderElement = function(node,elementUI){
	node.render(elementUI);	
};
Tree.prototype.addNodeTo = function(data,parent){
	var this_ = new Node(data);
	parent.children.push(this_)-1;
	this_.parent = parent;
	if(parent.UI && parent.UI.childList)
		this.renderElement(this_,parent.UI.childList);
	
	return this_;
};
Tree.prototype.editElement =  function(node){
	var this_ = this;
	node.changeElement(function(){
		this_.status.change = false;
	});
};
Tree.prototype.removeElement =  function(node){
	node.remove();
	node = null;	
};
Tree.prototype.subcribeEvents = function(){
	var this_ = this;	
	
	/* change handler */	
	function handleChangeNode(id){
		
		if(this_.status.change) return;
		this_.status.change = true;				
		
		this_.getNodeById(id,function(node_){
			if(node_ != this_.root)
				this_.editElement(node_);
		});
	}
	
	$(this.UI.root).on("click",".Content",function(event){
		var id = $(this).attr("internalId");			
		handleChangeNode(id);
	});
	/* design events */ 
	$(this.UI.root).on("mouseenter",".Content",function(event){	
		$(".Add",this_.UI.root).hide();
		$(".Remove",this_.UI.root).hide();
		event.stopPropagation();
		$(this).next().show();
		$(this).next().next().show();		
	});
	/*$(this.UI.root).on("mouseleave",".Content",function(event){		 
		event.stopPropagation();
		$(this).next().hide();
		$(this).next().next().hide();		
	});*/
	/* add event */
	$(this.UI.root).on("click",".Add",function(event){	
		
		var id = $(this).attr("internalId");			
		
		this_.getNodeById(id,function(node_){
			this_.addNodeTo({name:"new element"},node_);						
		});	
	});
	/* remove event */ 
	$(this.UI.root).on("click",".Remove",function(){
		var id = $(this).attr("internalId");			
		
		this_.getNodeById(id,function(node_){
			this_.status.change = false;
			Tree.prototype.removeElement(node_);
		});		
	});
};
Tree.prototype.getNodeById = function(id,callback){
	
	var result = 0; // flag for break recursion
	if(id < 0) return;
		
	(function getChildren(node) {        
		if(result == 1)
			return;
		else if(node.id == id){
			result = 1;
			if(typeof callback == "function")
				callback(node);
			return;
		}			
		else
			for (var i = 0, length = node.children.length; i < length; i++) {            
			    getChildren(node.children[i]);
			}        
    })(this.root);
};


