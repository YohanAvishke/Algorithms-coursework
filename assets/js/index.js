var N,
    flowgraph,//initial graph
    augPaths,//to store augmented paths
    maxflow,
    currStep,//to store current
    i, j;

function tableCreate() {
    let pane = document.getElementById('edge-pane'),
        tbl = document.createElement('table');
    tbl.style.width = '100px';
    tbl.style.border = '1px solid black';

    for (i = 0; i < 3; i++) {
        let tr = tbl.insertRow();
        for (j = 0; j < 2; j++) {
            if (i === 2 && j === 1) {
                break;
            } else {
                let td = tr.insertCell();
                td.appendChild(document.createTextNode('Cell'));
                td.style.border = '1px solid black';
                if (i === 1 && j === 1) {
                    td.setAttribute('rowSpan', '2');
                }
            }
        }
    }
    pane.appendChild(tbl);
}

function generateGraph() {
    for (i = 0; i < N; i++) {
        let temp = [];
        for (j = 0; j < N; j++) {
            let value = 0;
            /*
            * No two edges between same node (j > i :: if (j to i > 0) then (i to j === 0))
            * No recursive flow to same node (j > i :: (i to i === 0))
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
    console.log(flowgraph);
}

function generateSteps() {
    let step = 1,
        container = document.getElementById('container-steps');
    if (container.getElementsByTagName('div')[0]) {
        container.getElementsByTagName('div')[0].outerHTML = "";
    }
    let parent = document.createElement('div');
    augPaths.forEach(function () {
        let stepButton = document.createElement('button');
        stepButton.id = '' + step;
        stepButton.className = "btn btn-light";
        stepButton.style.margin = "5px";
        stepButton.appendChild(document.createTextNode("Step " + step));
        parent.appendChild(stepButton);
        container.appendChild(parent);
        document.getElementById('' + step).addEventListener('click', function () {
            changeStep(this.id);
        });
        step++;
    });
}

function displayFlow(flow, step) {
    document.getElementById('text-current-flow-value').innerHTML =
        Number(document.getElementById('text-current-flow-value').innerText) + flow;
    if (Number(step) === augPaths.length) {
        document.getElementById('text-current-flow-container').innerHTML = 'Max Flow : ';
    } else {
        document.getElementById('text-current-flow-container').innerHTML = 'Current Flow : ';
    }
}

//change current step
function changeStep(step) {
    if (step !== currStep) {
        currStep = Number(currStep);
        step = Number(step);
        if (step > currStep) {
            while (currStep < step) {
                addFlow(augPaths[currStep], s);
                displayFlow(augPaths[currStep][augPaths[currStep].length - 1], step);
                currStep++;
            }
        } else {
            while (currStep > step) {
                currStep--;
                removeFlow(augPaths[currStep], s);
                displayFlow(-augPaths[currStep][augPaths[currStep].length - 1], step);
            }
        }
        currStep = step;
    }
}

function main() {
    N = ((Math.random() * 7) + 6 | 0);
    flowgraph = [];
    augPaths = [];
    maxflow = 0;
    currStep = 0;
    document.getElementById('text-current-flow-container').innerHTML = 'Current Flow : ';
    document.getElementById('text-current-flow-value').innerHTML = '0';

    generateGraph();//generate a random graph
    fordFulkerson(flowgraph, 0, N - 1);//calculate max flow
    renderGraph();//draw the random graph
    generateSteps();
}

window.addEventListener("load", function () {
    document.getElementById('btn-auto').addEventListener('click', function () {
        // location.reload();
        clearGraph();
        main();
    });
    main();
});

