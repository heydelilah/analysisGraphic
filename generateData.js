var WEBSITES = ['百度','快递网','撒旦网','宋康昊网','赛迪网','兰陵王网','阿桑奇网','埃美柯网','安居客网','南北纬网',
];
function DataCenter(){

}
DataCenter.prototype = {
	generateData: function(){
		var level1 = this.buildBox();
		var level2 = this.buildBase();
		return{
				"items":[
				{
					"level1":level1,
					"level2":level2
				}],
				"amount":1111
			}

	},
	buildBase :function(noInner) {
		var len = this.randomLen();
		var arr = [];
		var data;
		var hasInner = this.randomBoolean();

		for (var i = len-1; i >= 0; i--) {
			if(i=== 0 ){
				data = this.buildBox("退出");
			}
			else if(i=== 1 ){
				data = this.buildBox("其他");
			}
			else{
				data = this.buildBox();
			}
			if(hasInner&&!noInner){
				data.inner = this.buildBase("noInner");
			}

			if(noInner){
				data.inner = [];
			}
			arr.push(data);
		}
		return arr;
	},
	randomBoolean:function(){
		return Math.random()<0.5
	},
	buildBox :function(name){
		var data = this.randomNum();
		var name = name ? name:this.getWebsite();
		return {
			"name":name,
			"amount":data[1],
			"rate":data[0],
			"inner":[]
		}
	},
	// 0-1000
	randomNum:function(){
		var rate = Math.random();
		var num = Math.round(rate*1000+Math.random()*10);
		return [rate,num];
	},
	getWebsite:function(){
		var i = Math.round(Math.random()*10);
		return WEBSITES[i];
	},
	randomLen:function(){
		// 返回0-4
		return Math.abs(Math.round(Math.random()*10)-5);
	}

};


