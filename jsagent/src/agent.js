const exec_cp = require("child_process");
const fs = require('fs');
const escodegen = require('escodegen')


module.exports = {
    'run_cp':run_cp
};

function systemSync(cmd){
    console.log("[!] RUNNING!")
    exec_cp.exec(cmd, (err, stdout, stderr) => {
      console.log('stdout is:' + stdout)
      console.log('stderr is:' + stderr)
      console.log('error is:' + err)
    }).on('exit', code => console.log('final exit code is', code))
    // !XXX: on exit update execution status, and information maps
  }


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
        let child = systemSync("node " + tmpObj.name);
        console.log(child)

        return res; 
    }

}


function run_cp(ast){
    let cp = new CP_Agent();
    console.log("[+] RUNNING FUZZED INPUT")
    
    return cp.run(ast)
}