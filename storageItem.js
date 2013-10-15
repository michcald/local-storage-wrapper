function StorageItem(key, value) {
	this.key = key;
	localStorage.setItem(key, value);
}

StorageItem.prototype.setValue = function(value) {
	localStorage.setItem(this.key, value);
}

StorageItem.prototype.getKey = function() {
	return this.key;
}

StorageItem.prototype.getValue = function() {
	return localStorage.getItem(this.key);
}

StorageItem.prototype.delete = function() {
	localStorage.removeItem(this.key);
}

StorageItem.prototype.submit = function(callback) {
	callback(this);
}

StorageItem.prototype.show = function() {
	console.log("Key(" + this.getKey() + ")\tValue(" + this.getValue() + ")");
}