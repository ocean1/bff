const exec_cp = require("child_process");
const fs = require('fs');
const escodegen = require('escodegen')


module.exports = function(ast){
    run_cp(ast)
};


let CP_Agent = class {

    run (ast){
        console.log("RUNNING " + ast)

        // create tmp file
        var tmp = require('tmp');
        var tmpObj = tmp.fileSync({ mode: parseInt('0644',8), prefix: 'projectA-', postfix: '.txt' });
        console.log("File: ", tmpObj.name);
        console.log("Filedescriptor: ", tmpObj.fd);


        let content = "eval(`" + escodegen.generate(ast) +"`);";

        try {
            fs.writeFileSync(tmpObj.name, content);
            // file written successfully
        } catch (err) {
            console.error(err);
        }

        exec_cp.exec("node " + tmpObj.name, (error, stdout, stderr) => {
            if (error) {
                console.log(`error: ${error.message}`);
                return 1;
            }
            if (stderr) {
                console.log(`stderr: ${stderr}`);
                return 2;
            }
            console.log(`stdout: ${stdout}`);
            return 0;
        });
           
    }

}


function run_cp(ast){
    let cp = new CP_Agent();
    console.log("RUNNING FUZZED INPUT")
    
    cp.run(ast)
}