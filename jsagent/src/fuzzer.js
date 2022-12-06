const { UpdateExpression } = require('esprima');

ast = require('./ast.js');
agent = require('./agent.js');

console.log(agent)

// SAMPLE_INPUTS 
codo = "var x = 0;\
if (x != 0){\
  var b = 10;\
} else {\
  var c = 12;\
}\
var d = b|c;\
\
var hugetempl = {length: 0x61};\
var huge = new Float64Array(hugetempl);\
var a = huge[0x61616161]*10;\
console.log(d*a);"

code = "var d = 11;\
var a = 42;\
var b = a;\
var c = a + b;\
a = c + 23;\
c = a + d;"


module.exports = function(){
  fuzz()
};


let Mutator = class {

    constructor (){
        this.seed = Math.floor(Math.random() * (Number.MAX_SAFE_INTEGER + 1));
        console.log("MUTATOR SEED: " + this.seed);
    };

    mutate(ast){

        return ast;
    };
};

let Fuzzer = class {

    constructor (){
        this.mutator = new Mutator();
        this.seed = Math.floor(Math.random() * (Number.MAX_SAFE_INTEGER + 1)); // seed to guide fuzzer
        console.log("FUZZER SEED: " + this.seed);
        this.vectors = [codo, code];  // input vectors for the fuzzer
    };

    fuzz() {
        while(1) {
            console.log('---- cycle START ----')

            // SELECT INPUT VECTOR FROM AVAILABLE ONES
            let a = ast.analyze(this.vectors[this.seed % this.vectors.length])

            let res = this.fuzz_one(a);


            console.log('---- cycle DONE ----')
            break;
        
        }
    };

    fuzz_one(AST) {
            let a = this.mutator.mutate(AST)
            console.log("FUZZING ONE INPUT:" + AST)
            return agent(a)
            // !XXX: RETURN STATUS, HOW TO CHECK EVAL OUTPUT? NEED AGENT?
    }

}


function fuzz(){
    let fuzzer = new Fuzzer();
    fuzzer.fuzz()
}