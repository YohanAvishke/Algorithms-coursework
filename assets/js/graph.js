var s,//to store sigma obj
    E = N * (N - 1),//number of possible maximum edges
    //to store graph
    g = {
        nodes: [],
        edges: []
    };

function renderGraph() {
    var source = {
        id: 'n' + 0,
        label: 'Source',
        x: Math.random(),
        y: Math.random(),
        size: 3,
        color: '#595959'
    };

    var sink = {
        id: 'n' + (N - 1),
        label: 'Sink',
        x: Math.random(),
        y: Math.random(),
        size: 3,
        color: '#595959'
    };

    g.nodes.push(source);
    for (i = 1; i < N - 1; i++) {
        g.nodes.push({
            id: 'n' + i,
            label: 'Node' + i,
            x: Math.random(),
            y: Math.random(),
            size: 3,
            color: '#3b81b3'
        });
    }
    g.nodes.push(sink);

    for (i = 0; i < N; i++) {
        for (j = 0; j < N; j++) {
            if (flowgraph[i][j] > 0) {
                g.edges.push({
                    id: 'e' + i + '' + j,
                    source: 'n' + i,
                    target: 'n' + j,
                    label: '' + flowgraph[i][j],
                    color: '#d6dbd9',
                    type: 'arrow',
                    size: 2
                });
            }
        }
    }

    s = new sigma({
        graph: g,
        container: 'graph-container',
        renderer: {
            container: document.getElementById('graph-container'),
            type: 'canvas'
        },
        settings: {
            minArrowSize: 8,
            minEdgeSize: 2,
            maxEdgeSize: 3,
            edgeLabelSize: 'fixed',
            defaultEdgeLabelSize: 13
        }
    });

    // Start the layout:
    s.refresh();//render
    s.startForceAtlas2();
    //to stop force atlas
    window.setTimeout(function () {
        s.killForceAtlas2();
        // Initialize the dragNodes plugin:
        var dragListener = sigma.plugins.dragNodes(s, s.renderers[0]);

        dragListener.bind('startdrag', function (event) {
        });
        dragListener.bind('drag', function (event) {
        });
        dragListener.bind('drop', function (event) {
        });
        dragListener.bind('dragend', function (event) {
        });
    }, 5000);
}

function addFlow(augpath, s) {
    let flow = augpath[augpath.length - 1],
        residualcapa;
    for (i = 0; i < augpath.length - 1; i += 2) {
        s.graph.edges().forEach(function (e) {
            if (e.id === 'e' + augpath[i] + '' + augpath[i + 1]) {
                e.color = '#42A5EE';
                residualcapa = Number(e.label) - flow;
                if (residualcapa === 0) e.label = '0';
                else e.label = '' + residualcapa;
            }
        });
    }

    s.refresh();
}

function removeFlow(augpath, s) {
    let flow = augpath[augpath.length - 1],
        residualcapa;
    console.log(augpath);
    for (i = 0; i < augpath.length - 1; i += 2) {
        s.graph.edges().forEach(function (e) {
            let startNode = augpath[i],
                endNode = augpath[i+1];

            if (e.id === 'e' + startNode + '' + endNode) {
                residualcapa = Number(e.label) + flow;
                if (residualcapa === 0) {
                    e.label = '0';
                    e.color = '#42A5EE';
                }
                else {
                    e.label = '' + residualcapa;
                    // console.log("graph: "+ flowgraph[startNode][endNode] + "  label:" + e.label);
                    if (flowgraph[startNode][endNode] === Number(e.label)) {
                        e.color = '#d6dbd9';
                    } else e.color = '#42A5EE';
                }
            }
        });
    }

    s.refresh();
}

