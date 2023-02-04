import "./style.css";

const VALID_NUMBER_OF_DIGITS = 3;

const validateNumberLength = (value: string | number) => {
  return String(value).length < VALID_NUMBER_OF_DIGITS
}
const resultEl = <HTMLElement>document.querySelector('#result');
const progressEl = <HTMLElement>document.querySelector('#progress');

const Calculator = {
  value: '0',
  numValue: 0,
  signValue: '',
  done: false,
  result: new Array<number | string>,
  render(inputValue?: string | number) {
    
    if(typeof inputValue === 'number') {
      if(this.done) {
        this.numValue = 0;
        this.done = false;
      }
      if(!validateNumberLength(this.numValue)) {
        alert('3자리보다 큰 숫자를 입력할 수 없습니다.')
        this.value = String(this.numValue)
        resultEl.innerText = this.value;
        return;
      }
      this.numValue = (this.numValue*10) + inputValue
      this.value = String(this.numValue)
      progressEl.innerText = this.result.join(' ')
    } else if(typeof inputValue === 'string' && inputValue !== '=') {
      this.done = false;
      this.signValue = String(inputValue)
      this.result.push(this.numValue)
      this.result.push(this.signValue)
      this.numValue = 0;
      progressEl.innerText = this.result.join(' ')
    } else if(inputValue === '=') {
      this.result.push(this.numValue)
      let answer:number = this.result[0] as number;
      for(let i=1; i<this.result.length; i++) {
        if(typeof this.result[i] === 'number') {
          switch(this.result[i-1]) {
            case '+':
              answer += Number(this.result[i])
              continue;
            case '-':
              answer -= Number(this.result[i])
              continue;
            case '×':
              answer *= Number(this.result[i])
              continue;
            case '÷':
              answer /= Number(this.result[i])
              continue;
          }
        }
      }
      this.value = String(Math.round(answer).toLocaleString())
      this.numValue = Math.round(answer);
      this.signValue = ''
      this.result = []
      this.done = true;
      progressEl.innerText = this.result.join(' ')
    }
    console.log(this.result)

    resultEl.innerText = this.value
  },
  reset() {
    this.value = '0';
    this.numValue = 0;
    this.result = [];
    this.render();
    progressEl.innerText = this.result.join(' ')
  },
  operator(inputNumber: number | string) {
    this.render(inputNumber)
  },

  initEvent() {
    const buttonContainerEl = document.querySelector('.contents')
    buttonContainerEl?.addEventListener('click', ({target}) => {
      const buttonClass = target instanceof HTMLButtonElement && target.className
      const buttonText = target instanceof HTMLButtonElement && target.innerText
      if(buttonClass === 'ac') {
        this.reset()
        // addEventListener를 그냥 함수 선언식으로 작성했었으면, 에러 났을텐데, 화살표함수로 만들어서
        // this가 Calculator를 가리킬 수 있게 해줌.
      } else {
        if(buttonClass === 'number') {
          this.operator(Number(buttonText))
        } else {
          this.operator(String(buttonText))
        }
        
      }
    })
  }

}
Calculator.render();
Calculator.reset();
Calculator.initEvent();