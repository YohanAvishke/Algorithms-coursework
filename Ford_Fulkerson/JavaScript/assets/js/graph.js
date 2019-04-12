var s,
    E = N * (N - 1),
    g = {
        nodes: [],
        edges: []
    };

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
        color: '#595959'
    });
}
g.nodes.push(sink);

for (i = 0; i < N; i++) {
    console.log(flowgraph[i]);
    for (j = 0; j < N; j++) {
        if (flowgraph[i][j] > 0) {
            g.edges.push({
                id: 'e' + i + '' + j,
                source: 'n' + i,
                target: 'n' + j,
                label: '' + flowgraph[i][j],
                color: '#D9D9D9',
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
        minEdgeSize: 1,
        maxEdgeSize: 2,
        edgeLabelSize: 'fixed',
        defaultEdgeLabelSize: 13
    }
});

function selectpath(u, v, s) {
    console.log(u + "-->" + v);
    s.graph.edges().forEach(function (n) {
        if (n.id === 'e' + u + '' + v) {
            n.color = '#0D0D0D'
        }
    });
    s.refresh();
}


// Start the layout:
s.refresh();
s.startForceAtlas2();
if (N <= 9) {
    window.setTimeout(function () {
        s.killForceAtlas2()
    }, 5000);
}
