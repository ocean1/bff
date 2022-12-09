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
    // !XXX these won't run properly with current approach if we loop forever on parent...
    // event loop should be considered
  }


let CP_Agent = class {

    run (ast){
        console.log("[+] RUNNING AGENT")

        // create tmp file
        var tmp = require('tmp');
        var tmpObj = tmp.fileSync({ mode: parseInt('0644',8), prefix: 'projectA-', postfix: '.txt' });

        let content = escodegen.generate(ast);

        try {
            fs.writeFileSync(tmpObj.name, content);
            // file written successfully
        } catch (err) {
            console.error(err);
        }

        let child = systemSync("node " + tmpObj.name);
    }

}


function run_cp(ast){
    let cp = new CP_Agent();
    cp.run(ast)
}