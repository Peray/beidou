exports.install = function(Vue,options){

	Vue.prototype.ajaxMenu = function(){
		var a = [];
		this.$http.get('http://192.168.0.44:7005/bcsql/menu/execute',{params:{id:1}}).then(response => {
			a = response.data;
		}, response => {
			console.log("error");
		});
		return a;
	}

}
