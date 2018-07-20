module.exports = class {
	constructor(webpackConf = null){
		if(!webpackConf) throw new Error("webpackConf不能为空");

		this.webpackConf = webpackConf;
	}

	use(processFn){
		processFn(this.webpackConf);

		return this;
	}

	end(){
        console.log(JSON.stringify(this.webpackConf))
		return this.webpackConf;
	}
}
