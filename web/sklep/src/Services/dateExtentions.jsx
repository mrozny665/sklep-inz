Date.prototype.toJSONDate = function () {
	return this.toJSON().substring(0, 10);
};

export {};
