function AnalysisGraph(){

}
AnalysisGraph.prototype = {
	buildGraph: function(dom,data){
		// 后端数据字段
		var level1 = data.items[0].level1,
			level2 = data.items[0].level2;

		var wrap = this.$wrap = $('<div class="P-visitRouteViewContent"/>').appendTo(dom);

		$(['<div class="title">',
				'<span class="fl">起始页</span>',
				'<span class="ce">二级访问</span>',
				'<span class="fr">三级访问</span>',
			'</div>'
			].join('')).appendTo(wrap);

		// 第一级
		this.buildBox(level1,"startPage").appendTo(wrap);

		// 第二级
		var con = $('<div class="wrapper"/>').appendTo(wrap);
		this.buildGroup(level2, con);
	},
	// 构建单个盒子
	buildBox:function(data, className){
		var name = data.name,
			amount = data.amount,
			rate = this.formatRate(data.rate);
		className = className ? className : "boxWrap";

		return $(['<div class="'+ className +'">',
					'<div class="arrow"></div>',
					'<div class="box">',
						'<span class="fl">'+ name +'</span>',
						'<span class="ce">'+ amount +'</span>',
						'<span class="fr">'+ rate +'</span>',
					'</div>',
				'</div>'].join(''));
	},
	// 构建盒子组
	buildGroup:function(data, dom){
		var len = data.length;
		var wrap;

		// 倒序创建
		for(var i=0;i<len;i++){
			wrap = $('<div class="wrap"><div class="con"></div></div>').prependTo(dom);
			this.buildBox(data[len-1-i], "boxWrap hideArrow").appendTo(wrap.find(".con"));
			this.setBox(i, len, wrap.find(".box"), wrap);

			// 第三级
			var inner = data[len-1-i].inner,
				leng = inner.length;
			if(inner){
				var wrapInner = $('<div class="con"/>').appendTo(wrap),
					x,box;

				for(x=0;x<leng;x++){
					box = this.buildBox(inner[leng-1-x]).prependTo(wrapInner);
					this.setBox(x, leng, box.find(".box"), box.find(".arrow"));
				}
			}
		}
	},
	/**
	 * 设置盒子
	 * @param {Number} x     序号
	 * @param {Number} len   长度
	 * @param {Object} box   JQ对象- 盒子
	 * @param {Object} arrow JQ对象- 箭头
	 */
	setBox: function(x, len, box, arrow){
		// 根据类型设置不同的盒子背景色
		// 根据位置设置不同的箭头
		switch(x){
			case 0:		//退出栏
				box.addClass('exitCol');
				arrow.addClass('endCol');
			break;
			case 1:		//其他栏
				box.addClass('otherCol');
			break;
		}
		//开头栏
		if(x==len-1){
			arrow.addClass('headCol');
		}
		// 只有一个
		if(len ==1){
			arrow.addClass('onlyOne');
		}
	},
	/**
	 * 比率格式化
	 */
	formatRate: function(rate){
		return Math.round(rate*100*2)/2+'%';
	},
	reset: function(){
		this.$wrap.empty();
		return this;
	}
}
