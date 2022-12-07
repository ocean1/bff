const { UpdateExpression } = require('esprima');

ast = require('./ast.js');
agent = require('./agent.js');

console.log(agent)

module.exports = function(){
  fuzz()
};


let Mutator = class {

    constructor (){
        //this.seed = Math.floor(Math.random() * (Number.MAX_SAFE_INTEGER + 1));
        this.seed = Math.floor(Math.random() * ((Number.MAX_SAFE_INTEGER-2) - 0 + 1) ) + 0;
        console.log("MUTATOR SEED: " + this.seed);
    };

    mutate(ast){

        return ast;
    };
};

let Fuzzer = class {

    constructor (){
        this.mutator = new Mutator();
        // note we are not using the full range because otherwise it will break RNG
        // https://stackoverflow.com/questions/28461796/randomint-function-that-can-uniformly-handle-the-full-range-of-min-and-max-safe
        this.seed = Math.floor(Math.random() * ((Number.MAX_SAFE_INTEGER-2) - 0 + 1) ) + 0;
        // Math.floor(Math.random() * (Number.MAX_SAFE_INTEGER)); // seed to guide fuzzer
        console.log("FUZZER SEED: " + this.seed);
        this.vectors = new Array();
        this.read_in();
    };

    // read input vectors
    read_in() {
        const testFolder = './in/';
        const fs = require('fs');

        fs.readdirSync(testFolder).forEach(file => {
            try {
                const data = fs.readFileSync('./in/' + file, 'utf8');

                this.vectors.push(data);
            } catch (err) {
                console.error(err);
            }

        });

    }

    // main fuzzing function
    fuzz() {
        while(1) {
            console.log('---- cycle START ----');

            // SELECT INPUT VECTOR FROM AVAILABLE ONES
            let vector = this.vectors[this.seed % this.vectors.length]
            console.log(vector);
            let a = ast.analyze(vector);

            let res = this.fuzz_one(a);
            console.log("EXECUTION: " + res);


            console.log('---- cycle DONE ----');
            break;
        
        }
    };

    fuzz_one(AST) {
            let a = this.mutator.mutate(AST)
            console.log("FUZZING ONE INPUT:" + AST)
            return agent.run_cp(a)
            // !XXX: RETURN STATUS, HOW TO CHECK EVAL OUTPUT? NEED AGENT?
    }

}


function fuzz(){
    let fuzzer = new Fuzzer();
    fuzzer.fuzz()
}