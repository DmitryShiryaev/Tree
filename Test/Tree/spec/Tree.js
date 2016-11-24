
describe(" Tree tests ", function(){	
	describe("create Tree -  Init", function() {
		var testTree,data;
		beforeAll(function() {		
			data = {name: "Test value"};		
			spyOn(Tree.prototype,'renderElement');
			spyOn(Tree.prototype,'subcribeEvents');			
			testTree = new Tree(data);
		});	
		
		it("Initialization ", function() {
			expect(testTree.root).toBeDefined();
			expect(testTree.UI.root).toBeDefined();
			expect(testTree.status.change).toEqual(false);
			expect(testTree.renderElement).toHaveBeenCalledWith(testTree.root,testTree.UI.root);
			expect(testTree.subcribeEvents).toHaveBeenCalled();			
		});  
	  
	});
	
	describe("create Tree -  renderElement", function() {
		var testTree,data,div,i = 0;
		beforeAll(function() {		
			data = {name: "Test value"};						
			testTree = new Tree(data);
			spyOn(testTree.root,'render');	
			
			
		});	
		
		beforeEach(function(){
			if(i != 0){
				div = $("<div/>");
				testTree.renderElement(testTree.root,div);
			}
			else
				testTree.renderElement(testTree.root,testTree.UI.root);
			i++;
				
		});
		it("Root ", function() {
			expect(testTree.root.render).toHaveBeenCalledWith(testTree.UI.root);			
		});  
	  
		it("regular ", function() {
			expect(testTree.root.render).toHaveBeenCalledWith(div);			
		});  
	});
	
	describe(" Tree - saveToLocalStorage/ getFromLocalStorage ", function(){
		var newTree,data,i = 0,compare = 0;
		var restoredTree =  null,realTree = null;
		beforeAll(function() {		
			data = {"name": 1};			
			newTree = new Tree(data);

			newTree.addNodeTo({name: 'aaaa'},newTree.root);
			newTree.addNodeTo({name: 'bbbb'},newTree.root);
			newTree.addNodeTo({name: 'cccc'},newTree.root);

			newTree.addNodeTo({name: 'aaaa-aa'},newTree.root.children[0]);
			newTree.addNodeTo({name: 'aaaa-bb'},newTree.root.children[0]);
			newTree.addNodeTo({name: 'aaaa-cc'},newTree.root.children[0]);

			newTree.addNodeTo({name: 'bbbb-aa'},newTree.root.children[1]);
			newTree.addNodeTo({name: 'bbbb-cc'},newTree.root.children[1]);


			newTree.addNodeTo({name: 'bbbb-aa'},newTree.root.children[2]);
			newTree.addNodeTo({name: 'bbbb-cc'},newTree.root.children[2]);						
		});	
		
		beforeEach(function(){
			if(i == 0){
				
				realTree = newTree.saveToLocalStorage();
				restoredTree = JSON.stringify(newTree.getFromLocalStorage());
				if(realTree == restoredTree) 
					compare = 1;
			}
			else{
				
				realTree = newTree.saveToLocalStorage(); //old one
				restoredTree = JSON.stringify(newTree.getFromLocalStorage());
				newTree.addNodeTo({name: 'hhh'},newTree.root);
				newTree.addNodeTo({name: 'hhh2'},newTree.root);				
				realTree = newTree.saveToLocalStorage();//new one				
				if(realTree == restoredTree) 
					compare = 1;
			}				
			i++;
		});
		
		afterEach(function(){
			realTree =  null;
			restoredTree = null;
			compare = 0;
		});
		
		it("Get same object ", function() {			
			expect(compare).toEqual(1);			
		});
		it("restore from ls compare with changed object", function() {			
			expect(compare).toEqual(0);						
		});
	});
	
	describe(" Tree - test GetNodebyID ", function(){
		var newTree,data,i = 0;
		var id = 0,node = null;
		var obj = {
			clbk: function(){
				return 1;
			}
		}
		beforeAll(function() {		
			data = {"name": 1};			
			newTree = new Tree(data); //1
			
			newTree.addNodeTo({name: 'aaaa'},newTree.root);
			newTree.addNodeTo({name: 'bbbb'},newTree.root);
			newTree.addNodeTo({name: 'cccc'},newTree.root);

			newTree.addNodeTo({name: 'aaaa-aa'},newTree.root.children[0]);
			newTree.addNodeTo({name: 'aaaa-bb'},newTree.root.children[0]);
			newTree.addNodeTo({name: 'aaaa-cc'},newTree.root.children[0]);

			newTree.addNodeTo({name: 'bbbb-aa'},newTree.root.children[1]);
			newTree.addNodeTo({name: 'bbbb-cc'},newTree.root.children[1]);


			newTree.addNodeTo({name: 'bbbb-aa'},newTree.root.children[2]);
			newTree.addNodeTo({name: 'bbbb-cc'},newTree.root.children[2]);	
			
			
		});	
		
		beforeEach(function(){
				id = newTree.root.children[1].children[1].id;
				node = newTree.root.children[1].children[1];
				spyOn(obj,'clbk');	
				newTree.getNodeById(id,obj.clbk);
		});
		
		afterEach(function(){			
			node = null;
			id = 0;
		});
		
		it(" node compare got by id ", function() {			
			//expect(newTree.getNodeById(id,obj.clbk)).toEqual(node);	
			expect(obj.clbk).toHaveBeenCalledWith(node);				
		});	
	});
	
	describe(" Tree - test renderTree ", function(){
		var newTree,data,i = 0,div;
		var id = 0,node = null;
		
		
		
		beforeEach(function(){
				data = {"name": 1};			
				newTree = new Tree(data); 
				newTree.addNodeTo({name: 'aaaa'},newTree.root);
				newTree.addNodeTo({name: 'bbbb'},newTree.root);
				newTree.addNodeTo({name: 'cccc'},newTree.root);

				newTree.addNodeTo({name: 'aaaa-aa'},newTree.root.children[0]);
				newTree.addNodeTo({name: 'aaaa-bb'},newTree.root.children[0]);
				newTree.addNodeTo({name: 'aaaa-cc'},newTree.root.children[0]);

				newTree.addNodeTo({name: 'bbbb-aa'},newTree.root.children[1]);
				newTree.addNodeTo({name: 'bbbb-cc'},newTree.root.children[1]);


				newTree.addNodeTo({name: 'bbbb-aa'},newTree.root.children[2]);
				newTree.addNodeTo({name: 'bbbb-cc'},newTree.root.children[2]);	
				spyOn(newTree,'subcribeEvents');					
				newTree.UI.root.html("");
				div = $("<div/>",{class: "NewTree"})
				newTree.renderTree(div);
		});
		
		afterEach(function(){			
			node = null;
			id = 0;
		});
		
		it("check subscriveEvents called ", function() {						
			expect(newTree.subcribeEvents).toHaveBeenCalled();				
		});	
		
		it("check html isn't empty ", function() {						
			expect(newTree.UI.root.length).not.toEqual(0);				
		});	
	});
	
	describe(" Tree - test subcribeEvents ", function(){
		var newTree,data,i = 0,div;
		var id = 0,node = null;
		
		beforeAll(function() {		
			data = {"name": 1};			
			newTree = new Tree(data); //1
			
			newTree.addNodeTo({name: 'aaaa'},newTree.root);
			newTree.addNodeTo({name: 'bbbb'},newTree.root);
			newTree.addNodeTo({name: 'cccc'},newTree.root);

			newTree.addNodeTo({name: 'aaaa-aa'},newTree.root.children[0]);
			newTree.addNodeTo({name: 'aaaa-bb'},newTree.root.children[0]);
			newTree.addNodeTo({name: 'aaaa-cc'},newTree.root.children[0]);

			newTree.addNodeTo({name: 'bbbb-aa'},newTree.root.children[1]);
			newTree.addNodeTo({name: 'bbbb-cc'},newTree.root.children[1]);


			newTree.addNodeTo({name: 'bbbb-aa'},newTree.root.children[2]);
			newTree.addNodeTo({name: 'bbbb-cc'},newTree.root.children[2]);
			spyOn(newTree,"editElement");
			spyOn(newTree,"getNodeById");
		});	
		
		beforeEach(function(){
			if(i == 0){
				newTree.root.children[1].UI.nameDiv.trigger("click");
			}
			else if(i == 1){
				newTree.root.children[1].UI.nameDiv.input.next().trigger("click");
			}
			else	
				newTree.root.children[1].UI.nameDiv.input.next().next().trigger("click");
				
			i++;
		});
		
		it("check subscriveEvents change node ", function() {													
			expect(newTree.getNodeById).toHaveBeenCalled();	
			//expect(newTree.editElement).toHaveBeenCalled();	
		});	
	});
});