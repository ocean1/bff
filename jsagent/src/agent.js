const { exec_cp } = require("child_process");

// !XXX: each agent will allow us to run a snippet of code
// !XXX: simple agent will run a node child process and monitor status

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


        content = "escodegen = require('escodegen');eval(escodegen.generate("+ast+"));";

        try {
            fs.writeFileSync(tmpObj.name, content);
            // file written successfully
        } catch (err) {
            console.error(err);
        }

        exec_cp("node " + tmpObj.name, (error, stdout, stderr) => {
            if (error) {
                console.log(`error: ${error.message}`);
                return;
            }
            if (stderr) {
                console.log(`stderr: ${stderr}`);
                return;
            }
            console.log(`stdout: ${stdout}`);
        });
           
    }

}


function run_cp(ast){
    let cp = new CP_Agent();
    console.log("RUNNING FUZZED INPUT")
    
    cp.run(ast)
}