const Roman = [["","I","II","III","IV","V","VI","VII","VIII","IX"],
             ["","X","XX","XXX","XL","L","LX","LXX","LXXX","XC"],
             ["","C","CC","CCC","CD","D","DC","DCC","DCCC","CM"],
             ["","M","MM","MMM","  "," ","  ","   ","    ","  "]];

const UNIT = ["千","","十","百","万","亿"]

const UNUM = ["零","一","二","三","四","五","六","七","八","九"]

const unicodeNum = ['①', '②', '③', '④', '⑤', '⑥',
                    '⑦', '⑧', '⑨', '⑩', '⑪', '⑫',
                    '⑬', '⑭', '⑮', '⑯', '⑰', '⑱',
                    '⑲', '⑳']

function ToFullUpper(n) {
    let S = String(n).split("").reverse();
    let R = "";
    S.map((item, i) => {
        R = UNUM[item] + UNIT[(i+1)%4] + R
    })
 　 return R.replace(/^一十/, '十');
 }

function convert(num) {
    if(isNaN(num)) return num;
    let ReverseArr = num.toString().split("").reverse();
    let CorrectArr = [];
    ReverseArr.map((item, i) => {
        CorrectArr.unshift(Roman[i][item]);
    })
    return CorrectArr.join("");
}

export {
    ToFullUpper, convert, unicodeNum
}
