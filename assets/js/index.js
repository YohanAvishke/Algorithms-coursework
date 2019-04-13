var N = ((Math.random() * 7) + 6 | 0),
    flowgraph = [],//initial graph
    augPaths = [],//to store augmented paths
    maxflow = 0,
    currentflow = 0,
    step = 0,//to store which is the current
    i,//from node
    j;//to node

//generate a random graph
function generateGraph() {
    for (i = 0; i < N; i++) {
        let temp = [];
        for (j = 0; j < N; j++) {
            let value = 0;
            /*
            * No two edges between same node (j>i :: if (j to i >0) then (i to j <0))
            * No recursive flow to same node (j>i :: (i to i=== 0))
            * No flow towards sink(i != N-1 :: (sink to other_nodes === 0))
            * No flow from source(j !== 0 :: (other_nodes to source === 0)) */
            if (j > i && i !== N - 1 && j !== 0) {
                //values can be from 6 to 19
                value = ((Math.random() * 14) + 6 | 0);
                temp.push(value);
            } else temp.push(value);
        }
        flowgraph.push(temp);//add node to other_nodes flow
    }
}

//change current step
function changeStep(step) {
    addFlow(augPaths[step], s);
    // generateSteps(step);
    console.log(augPaths[step]);
}

// function generateSteps(step) {
//     let stepButton = document.createElement('button'),
//         container = document.getElementById('control-pane').getElementsByTagName('div')[1];
//     stepButton.id = step;
//     stepButton.appendChild(document.createTextNode("Step " + (step + 1)));
//     container.appendChild(stepButton);
//
//     document.getElementById(step).addEventListener('click',function () {
//         nextgraph(step);
//     })
// }

generateGraph();

window.addEventListener("load", function () {
    fordFulkerson(flowgraph, 0, N - 1);//calculate max flow
    renderGraph();//draw graph
    console.log(augPaths);

    document.getElementById('btn-steps').addEventListener('click', function () {
        if (step < augPaths.length) {
            changeStep(step);
            document.getElementById('text-current-flow-value').innerHTML =
                Number(document.getElementById('text-current-flow-value').innerText) + augPaths[step][augPaths[step].length - 1];
            // generateSteps(step);
            step++;
            if (step === augPaths.length) {
                document.getElementById('text-current-flow-container').innerHTML = 'Max Flow : ';
                document.getElementById('btn-steps').disabled = true;
            }
        }
    });

});

