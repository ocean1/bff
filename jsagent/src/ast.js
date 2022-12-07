escodegen = require('escodegen')
esprima = require('esprima')
estraverse = require('estraverse')

module.exports = {
  "analyze":analyze
};

function create_BBs(ast) {
    estraverse.traverse(ast, {

        enter: function (node, parent) {
            //console.log(node)
            //console.log("\n  ----------------------\n")
            /*if (node.type == 'FunctionExpression' || node.type == 'FunctionDeclaration')
                return estraverse.VisitorOption.Skip;*/
            // allora in teoria qui stiamo facendo il traversal imho, facciamo prima a fare un traversal che crea tutti i BB, poi andiamo in "execution order" sulla lista di BB :)      
        
              },

      leave: function (node, parent) {/*
        if (node.type == 'VariableDeclarator')
          console.log(node.id.name);*/}

    });

}

function analyze(code) {
    var ast = esprima.parse(code);
    var BBs = create_BBs(ast);
    //mutated = mutate(ast);
    return ast;
};

// "Simple and Efficient Construction of Static Single Assignment Form"
// we build independent "strains" of code from SSA form
// JS AST is also great to use as IR :) 
// https://speakerdeck.com/constellation/escodegen-and-esmangle-using-mozilla-javascript-ast-as-an-ir
// https://tobyho.com/2013/12/02/fun-with-esprima/

// should we "separate" basic blocks in AST?? probably not? tipo ci sono 

// helper phi that we will insert in ast
function phi(v1,v2) {
  return v1 || v2;
}


function localValueNumbering(ast){
  // given a ast we traverse it and store a LVN map
  var lvn_map = {};

  return lvn_map;
}

// can I have something like an iterator inside the traversal?
// we keep on adding statements to a block, and when a new block is met (i.e. control flow modified)
// we can create a new BB then

/*function writeVar(var,block,val){
  currentDef[var][block] = val
}

function readVar(var, block){
  if (block in currentDef[var]){
    // local value numbering
    return currentDef[var][block];
  } 
  // global value numbering
  return readVariableRecursive(var, block)
}



*/

function to_ssa(ast){
}

