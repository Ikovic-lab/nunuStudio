"use strict";

//Text3D constructor
function Text3D(text, material, font)
{
	if(font === undefined)
	{
		this.font = new FontLoader().parse(App.readFile("data/fonts/montserrat.json"));
	}
	else
	{
		this.font = new THREE.FontLoader().parse(font);
	}

	THREE.Mesh.call(this, new THREE.TextGeometry(text, {font: this.font}), material);
	
	this.name = "text";
	this.type = "Text3D";

	this.scale.set(0.02, 0.02, 0.02);

	this.text = text;
	
	this.receiveShadow = true;
	this.castShadow = true;
}

//Function Prototype
Text3D.prototype = Object.create(THREE.Mesh.prototype);
Text3D.prototype.initialize = initialize;
Text3D.prototype.update = update;
Text3D.prototype.dispose = dispose;
Text3D.prototype.setText = setText;
Text3D.prototype.toJSON = toJSON;

//Initialize
function initialize()
{
	for(var i = 0; i < this.children.length; i++)
	{
		this.children[i].initialize();
	}
}

//Update state
function update()
{
	for(var i = 0; i < this.children.length; i++)
	{
		this.children[i].update();
	}
}

//Dipose text
function dispose()
{
	//Dipose material and geometry
	this.material.dispose();
	this.geometry.dispose();

	//Dipose children
	for(var i = 0; i < this.children.length; i++)
	{
		this.children[i].dispose();
	}
}

//Set Text
function setText(text)
{
	this.text = text;
	this.geometry.dispose();
	this.geometry = new THREE.TextGeometry(this.text, {font: this.font});
}

//Create JSON for object
function toJSON(meta)
{
	//Backup geometry and set to undefined to avoid being stored
	var geometry = this.geometry;
	this.geometry = undefined;

	//Gen JSON
	var data = THREE.Object3D.prototype.toJSON.call(this, meta);
	
	data.object.text = this.text;
	data.object.font = this.font;

	//Restore geometry
	this.geometry = geometry;

	return data;
}