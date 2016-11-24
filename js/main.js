
$(document).ready(function(){

var App = {};


data = {"name": 1};
var newTree = new Tree(data);
var restoredTree = new Tree(data);
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
newTree.addNodeTo({name: 'hhh'},newTree.root);


newTree.UI.root.appendTo($("body"));
//newTree.show(body);
//var a = newTree.root.show();//.appendTo(body);

var a = newTree.saveToLocalStorage();
//console.error(a);
newTree.addNodeTo({name: 'dddd'},newTree.root);
newTree.addNodeTo({name: 'dddd'},newTree.root);
newTree.addNodeTo({name: 'dddd'},newTree.root);
newTree.addNodeTo({name: 'dddd'},newTree.root);
$("body").html("");

var b = JSON.stringify(newTree.getFromLocalStorage());
//console.error(b);
//if(a == b)
	//console.error("AAAAAAAAA");
newTree.renderTree($("body"));

});