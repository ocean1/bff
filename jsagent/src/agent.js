const exec_cp = require("child_process");
const fs = require('fs');
const escodegen = require('escodegen')


module.exports = {
    'run_cp':run_cp
};


let CP_Agent = class {

    run (ast){
        console.log("RUNNING " + ast)

        // create tmp file
        var tmp = require('tmp');
        var tmpObj = tmp.fileSync({ mode: parseInt('0644',8), prefix: 'projectA-', postfix: '.txt' });
        console.log("File: ", tmpObj.name);
        console.log("Filedescriptor: ", tmpObj.fd);


        let content = escodegen.generate(ast);

        try {
            fs.writeFileSync(tmpObj.name, content);
            // file written successfully
        } catch (err) {
            console.error(err);
        }

        let res = -1;
        exec_cp.exec("node " + tmpObj.name, (error, stdout, stderr) => {
            res = 0;
            console.log("[!] RUNNING!")
            if (error) {
                console.log(`error: ${error.message}`);
                res = 1;
            }
            if (stderr) {
                console.log(`stderr: ${stderr}`);
                res = 2;
            }
            console.log(`stdout: ${stdout}`);
            res = 0;
            return res;
        });

        return res;
           
    }

}


function run_cp(ast){
    let cp = new CP_Agent();
    console.log("[+] RUNNING FUZZED INPUT")
    
    return cp.run(ast)
}