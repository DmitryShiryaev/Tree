
describe("create Node Tests", function() {
	var testNode,data;
	beforeAll(function() {		
		data = {name: "Test value"};
		testNode =  new Node(data);
	});	
	
	it("Initialization ", function() {
		expect(testNode.data.name).toEqual(data.name);
		expect(testNode.parent).toEqual(null);
		expect(testNode.children.length).toEqual(0);
		expect(testNode.id).not.toEqual(0);
		expect(testNode.UI.childList).toEqual(null);
		expect(testNode.UI.nameDiv).toEqual(null);
		expect(testNode.UI.input).toEqual(null);
	});  
  
});

describe("Node isLast/Parent", function() {
	var testNode,data;
	var i = 0;
	beforeAll(function() {		
		data = {name: "Test value"};
		testNode =  new Node(data);
	});	
	
	beforeEach(function(){
		if(i != 0 ){
			testNode.parent = {};
			testNode.children = [1,2,3];		
		}
		i++;
	});
	it("test Last Root", function() {
		expect(testNode.isLast()).toEqual(true);
		expect(testNode.isRoot()).toEqual(true);		
	});  
	it("test not Last not Root", function() {
		expect(testNode.isLast()).toEqual(false);
		expect(testNode.isRoot()).toEqual(false);		
	});
});

describe("Node Edit", function() {
	var testNode,data,ndata;
	var element;
	beforeAll(function() {
		element = $("div");
		data = {name: "Test value"};
		testNode =  new Node(data);
		testNode.render(element);
		ndata = {name: "New one value"};
		testNode.edit(ndata);
	});	
	
	it("test Edit new data ", function() {
		expect(testNode.data).toEqual(ndata);
		expect(testNode.data.name).toEqual(ndata.name);		
	});  	
});

describe("Node isParentRoot", function() {
	var testNode,data,testParentNode,testRoot;
	var i = 0;
	beforeAll(function() {		
		data = {name: "Test value"};
		testNode =  new Node(data);	
		testParentNode = new Node(data);
		testRoot = new Node(data);
		testNode.parent = testParentNode;		
	});	
	
	beforeEach(function(){
		if(i != 0 ){
			testParentNode.parent = testRoot;
		}
		i++;
	});
	
	it("test parent is Root ", function() {
		expect(testNode.isParentRoot()).toEqual(true);		
	});  	
	
	it("test parent isn't Root ", function() {
		expect(testNode.isParentRoot()).toEqual(false);		
	});
});


describe("Node render", function() {		
	var testNode,data,testRoot;
	var element;
	var i = 0;
	beforeAll(function() {				
		testNode = null;	
		testRoot =  null								
		element = null;
	});	
	
	beforeEach(function(){
		element = $("<div/>");
		if(i == 0 ){
			data = {name: "Root value"};
			testNode = new Node(data);	
			testRoot =  new Node(data);	
											
			testNode.render(element);
		}
		else{
			data = {name: "Non Root value"};
			testNode = new Node(data);	
			testRoot =  new Node(data);	
			testNode.parent = testRoot;
			testNode.render(element);
		}
		i++;
	});
	
	afterEach(function() {
		element = null;
		testNode = null;	
		testRoot =  null
	});
	
	it("test Root render ", function() {
		expect(testNode.isRoot()).toEqual(true);
		expect(element.length).not.toEqual(0);
		expect(element.find(".Content").text()).toEqual("Root");
		expect(element.find(".Add").length).toEqual(1);
		expect(element.find(".Remove").length).toEqual(1);				
		expect(testNode.UI.nameDiv.length).not.toEqual(0);					
		expect(testNode.UI.childList.length).not.toEqual(0);
	});  	
	
	it("test not Root render ", function() {
		expect(testNode.isRoot()).toEqual(false);
		expect(element.length).not.toEqual(0);
		expect(element.find(".Content").text()).toEqual("Non Root value");
		expect(element.find(".Add").length).toEqual(1);
		expect(element.find(".Remove").length).toEqual(1);				
		expect(testNode.UI.nameDiv.length).not.toEqual(0);	
		expect(testNode.UI.input.length).not.toEqual(0);
		expect(testNode.UI.childList.length).not.toEqual(0);		
	});  	
});

describe("Node changeElement", function() {
	var testNode,data,testRoot;
	var element;		
	var obj = {};
	obj.clbk = function(){
		return 1;
	};
	
	beforeEach(function(){
		element = $("<div/>");			
		data = {name: "Non Root value"};
		testNode = new Node(data);	
		testRoot =  new Node(data);	
		testNode.parent = testRoot;
		testNode.render(element);
		
		spyOn(testNode, 'edit');			
		spyOn(obj, 'clbk');			
		
		testNode.changeElement(obj.clbk);
		testNode.UI.input.trigger("focusout");
	});
	
	afterEach(function() {
		element = null;
		testNode = null;	
		testRoot =  null
	});
	
	it("test changeElement ", function() {			
		expect(obj.clbk).toHaveBeenCalled();
		expect(testNode.edit).toHaveBeenCalled();
		
	});  	
});

describe("Node renderElement", function() {
	var testNode,data,testRoot;
	var element;
	
	beforeEach(function(){
		element = $("<div/>");			
		data = {name: "Non Root value"};
		testNode = new Node(data);	
		testRoot =  new Node(data);	
		testNode.parent = testRoot;
		testNode.render();
		testNode.remove();
	});
	
	afterEach(function() {
		element = null;
		testNode = null;	
		testRoot =  null
	});
	
	it("test remove element ", function() {			
		expect(element.find("li").length).toEqual(0);
	});  	
});	

xdescribe("A suite", function() {
  it("contains spec with an expectation", function() {
	expect(true).toBe(true);
  });
});



