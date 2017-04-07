const single = Symbol('single'); 
const handleQuestion = Symbol('handleQuestion');
const handleAnswers = Symbol('handleAnswers');
const handleOptions = Symbol('handleOptions');
const replaceData = Symbol('replaceData');
const handleOldOptions = Symbol('handleOldOptions');
const ANSTYPE = {
	1: '<span>（   ）</span>',
	2: '<span>___</span>',
	3: '',
	7: '<span>（   ）</span>',
};

class Compile2Html {
	constructor (obj) {
		let questions = obj.questions || [];
		this.obj = obj;
		if (!obj) {
			throw new Error('参数错误');
			return;
		};
		if (questions.length === 0 || !Array.isArray(questions)) {
			let {stem_html_part, options} = obj;
			this.oldQuestion = true
			this.stem_html_part = stem_html_part;
			this[handleOldOptions](options);
			return;
		}
		this.count = 0;
		this.answer = '';
		this.stem_html_part = '';
		this.options = '';
		this.hint = questions[0].hint ? `<p>${questions[0].hint}</p>` : ''
		this[single](questions);
	}

	[replaceData] (value) {
		try {
			value = value.replace(/\n/g, '<br>');
			value = value.replace(/\s(?!src=")/g, '&nbsp');
		} catch(e) {

		}
		return value;
	}

	[single] (questions) {
		questions.map((item) => {
			this[handleQuestion](item);
			if (item.questions.length > 0) {
				this[single](item.questions);
				this.count++;
			}
		})
	}

	[handleQuestion] (question) {
		let answer = question.answers, arr = Object.keys(answer), i = 0;
		const reg = new RegExp('<answer id="[^"]*"><\/answer>');
	    while(i < arr.length) {
	      let type = answer[arr[i]]['answer_type'];
	      question.content = question.content.replace(reg, ANSTYPE[type])
	      i ++;
	    }

		this.stem_html_part += `<p>${this[replaceData](question.content)}</p>`;
		this[handleAnswers](question.answers);
		this[handleOptions](question.options);
	}

	[handleAnswers] (answers) {
		Object.keys(answers).map((item) => {
			answers[item].answer_result.map((v) => {
				this.answer += `<p>${this[replaceData](v)}</p>`;
			})
		})	
	}

	[handleOptions] (options) {
		Object.keys(options).map((item) => {
			Object.keys(options[item]).map((v) => {
				this.options 
				+= 
				`<p>${v}.<span>${this[replaceData](options[item][v])}</span></p>`;
			})
		})	
	}

	[handleOldOptions] (options) {
		let optionsText = '';
		try {
			options = JSON.parse(options);
            options.forEach((v, i) => {
                let {option, detail} = v;
                let text = option.toString() + '. ' + detail.toString();
                optionsText += `<p>${text}</p>`;
            });
		} catch(e) {

		}
		this.options = optionsText;
	}

	get html() {
		let {stem_html_part, options, answer, oldQuestion, obj, hint} = this;
		let stem_html = stem_html_part + options;
		if (oldQuestion) {
			return {...obj, ...{options, stem_html}};
		}
    	return {...obj, ...{stem_html_part, options, answer, hint, stem_html}};
  	}
}
module.exports = Compile2Html;
export {
	Compile2Html
}
export default Compile2Html;