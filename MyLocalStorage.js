/*
This is a wrapper of localStorage and effects only the data stored
using this same class
*/
function MyLocalStorage() {

}

// namespace of the keys
MyLocalStorage.preKey = "";

// contains all the items with type "MyLocalStorageItem" in the local storage
MyLocalStorage.elements = [];

MyLocalStorage.init = function(namespace) {

	MyLocalStorage.preKey = namespace + "_";

	// loads the already stored data
	for (i=0; i<=localStorage.length-1; i++) {
        key = localStorage.key(i);
        if(key.indexOf(this.preKey) != 0) {
        	continue;
        }
        value = localStorage.getItem(key);
		item = new MyLocalStorageItem(key, value);
  		MyLocalStorage.elements[key] = item;
    }
}

// verifies if the localStorage is available
MyLocalStorage.isSupported = function() {
	return typeof(Storage) !== "undefined";
}

// adds a new element
MyLocalStorage.add = function(queryString) {
	// max limit reached exception
	try {
		key = MyLocalStorage.generateRandomKey();
		item = new MyLocalStorageItem(key, queryString);
  		MyLocalStorage.elements[key] = item;
  		return true;
	} catch (err) {
  		if(err == QUOTA_EXCEEDED_ERR) {
  			return false;
		}
	}
}

// retrieves an element
MyLocalStorage.get = function(key) {
	if(key in MyLocalStorage.elements) {
		return MyLocalStorage.elements[key];
	}
    return null;
}

// removes an element
MyLocalStorage.remove = function(key) {
	if(item = MyLocalStorage.get(key)) {
		item.delete();
		delete MyLocalStorage.elements[key];
	}
}

// verifies if some elements are stored using this same class
MyLocalStorage.isEmpty = function() {
	return MyLocalStorage.getLength() == 0;
}

// retrieves the number of elements in the local storage
MyLocalStorage.getLength = function() {
	return Object.keys(MyLocalStorage.elements).length;
}

// removes all the elements added through this class
MyLocalStorage.empty = function() {
	for(var k in MyLocalStorage.elements){
		MyLocalStorage.remove(k);
    }
}

MyLocalStorage.submitAll = function(callback) {
	for(var k in MyLocalStorage.elements){
		item = MyLocalStorage.elements[k];
		item.submit(callback);
    }
}

MyLocalStorage.generateRandomKey = function() {
		var d = new Date();
		return MyLocalStorage.preKey + d.getTime() + Math.floor((Math.random()*100)+1);
	}

MyLocalStorage.show = function() {
	console.log("\n#### LocalStorage");
	if(MyLocalStorage.isEmpty()) {
		console.log("## No data");
	} else {
		for(var key in MyLocalStorage.elements){
			MyLocalStorage.elements[key].show();
	    }
	}
    console.log("####\n");
}




/* ---------------------------------------- */
/* - Item class --------------------------- */
/* ---------------------------------------- */

function MyLocalStorageItem(key, value) {
	this.key = key;
	localStorage.setItem(key, value);
}

MyLocalStorageItem.prototype.setValue = function(value) {
	localStorage.setItem(this.key, value);
}

MyLocalStorageItem.prototype.getKey = function() {
	return this.key;
}

MyLocalStorageItem.prototype.getValue = function() {
	return localStorage.getItem(this.key);
}

MyLocalStorageItem.prototype.delete = function() {
	localStorage.removeItem(this.key);
}

MyLocalStorageItem.prototype.submit = function(callback) {
	callback(this);
}

MyLocalStorageItem.prototype.show = function() {
	console.log("Key(" + this.getKey() + ")\tValue(" + this.getValue() + ")");
}