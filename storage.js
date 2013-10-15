/*
This is a wrapper of localStorage and effects only the data stored
using this same class
*/
function FormStorage() {

}

// namespace of the keys
FormStorage.preKey = "form_";

// contains all the items with type "StorageItem" in the local storage
FormStorage.elements = [];

FormStorage.init = function() {
	// loads the already stored data
	for (i=0; i<=localStorage.length-1; i++) {
        key = localStorage.key(i);
        if(key.indexOf(this.preKey) != 0) {
        	continue;
        }
        value = localStorage.getItem(key);
		item = new StorageItem(key, value);
  		FormStorage.elements[key] = item;
    }
}

// verifies if the localStorage is available
FormStorage.isSupported = function() {
	return typeof(Storage) !== "undefined";
}

// adds a new form
FormStorage.add = function(queryString) {
	// max limit reached exception
	try {
		key = FormStorage.generateRandomKey();
		item = new StorageItem(key, queryString);
  		FormStorage.elements[key] = item;
  		return true;
	} catch (e) {
  		if(e == QUOTA_EXCEEDED_ERR) {
  			return false;
		}
	}
}

// retrieves an element
FormStorage.get = function(key) {
	if(key in FormStorage.elements) {
		return FormStorage.elements[key];
	}
    return null;
}

// removes an element
FormStorage.remove = function(key) {
	if(item = FormStorage.get(key)) {
		item.delete();
		delete FormStorage.elements[key];
	}
}

// verifies if some elements are stored using this same class
FormStorage.isEmpty = function() {
	return Object.keys(FormStorage.elements).length == 0;
}

// removes all the elements added through this class
FormStorage.empty = function() {
	for(var k in FormStorage.elements){
		FormStorage.remove(k);
    }
}

FormStorage.submitAll = function(callback) {
	for(var k in FormStorage.elements){
		item = FormStorage.elements[k];
		item.submit(callback);
    }
}

FormStorage.generateRandomKey = function() {
		var d = new Date();
		return "form_" + d.getTime() + Math.floor((Math.random()*100)+1);
	}

FormStorage.show = function() {
	console.log("\n#### LocalStorage");
	if(FormStorage.isEmpty()) {
		console.log("## No forms");
	} else {
		for(var key in FormStorage.elements){
			FormStorage.elements[key].show();
	    }
	}
    console.log("####\n");
}