var s,
    E = N * (N - 1),
    g = {
        nodes: [],
        edges: []
    };

for (i = 0; i < N; i++) {
    g.nodes.push({
        id: 'n' + i,
        label: 'Node' + i,
        x: Math.random(),
        y: Math.random(),
        size: 3,
        color: '#595959'
    });
}

for (i = 0; i < N; i++) {
    console.log(flowgraph[i]);
    for (j = 0; j < N; j++) {
        if (flowgraph[i][j] > 0) {
            g.edges.push({
                id: 'e' + i + '' + j,
                source: 'n' + i,
                target: 'n' + j,
                label: ''+flowgraph[i][j],
                color: '#A6A6A6',
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
        minArrowSize: 10,
        minEdgeSize:1,
        maxEdgeSize:2,
        edgeLabelSize: 'fixed',
        defaultEdgeLabelSize: 13
    }
});

// Start the layout:
s.refresh();
s.startForceAtlas2();
if (N <= 8) {
    window.setTimeout(function () {
        s.killForceAtlas2()
    }, 10000);
}