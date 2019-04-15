'use strict'

function fordFulkerson(graph, s, t) {
    console.time();//for performance analysis

    var rGraph = [];// residual graph to store residual capacity(leftover capacity after flow started)

    if (s < 0 || t < 0 || s > graph.length - 1 || t > graph.length - 1) {
        throw new Error("Graph error :: invalid sink or source");
    }
    if (graph.length === 0) {
        throw new Error("Graph error :: invalid graph");
    }

    // Residual graph where rGraph[u][v] indicates
    // residual capacity of edge from u to v (if there
    // is an edge. If rGraph[u][v] is 0, then there is
    // not)
    for (var u = 0; u < graph.length; u++) {
        let temp = [];// used to add graph row by row to rGraph
        if (graph[u].length !== graph.length) {
            throw new Error("Graph error :: invalid graph. graph needs to be NxN");
        }
        for (v = 0; v < graph.length; v++) {
            temp.push(graph[u][v]);
        }
        rGraph.push(temp);
    }

    var parent = [];// This array is filled by BFS and to store path
    // Augment the flow while there is path from source
    // to sink
    while (bfs(rGraph, s, t, parent)) {

        // Find minimum residual capacity of the edges
        // along the path filled by BFS. Or we can say
        // find the maximum flow through the path found.
        var pathFlow = Number.MAX_VALUE;
        let temp = [];//to store in augPaths
        for (var v = t; v != s; v = parent[v]) {
            u = parent[v];
            pathFlow = Math.min(pathFlow, rGraph[u][v]);
        }
        // update residual capacities of the edges and
        // reverse edges along the path
        for (v = t; v != s; v = parent[v]) {
            u = parent[v];
            rGraph[u][v] -= pathFlow;
            rGraph[v][u] += pathFlow;
            // finalgraph(u, v);//to get final residual graph
            temp.push(u, v);
        }
        temp.push(pathFlow);
        augPaths.push(temp);//store aug path with path flow
        maxflow += pathFlow;
    }

    console.timeEnd();//for performance analysis
}

function bfs(rGraph, s, t, parent) {
    /* if there is an element in queue that means that elements child nodes have not been searched yet
     * queue is first in first out ,so the element's children can be searched in the order of the elements
       added */
    var queue = [];
    var V = rGraph.length;// number of nodes

    // Create a visited array and mark all vertices as not visited
    var visited = [];
    for (var i = 0; i < V; i++) {
        visited[i] = false;
    }

    queue.push(s);// source node is added to queue
    visited[s] = true;// source node is marked as visited
    parent[s] = -1;//flow to source is marked as coming from -1

    // while loop to check if all the children nodes are searched is used
    while (queue.length != 0) {

        var u = queue.shift();// first element of queue is stored in 'u' and removed from queue

        for (var v = 0; v < V; v++) {
            //check if each node is visited and if each child node of u has a flow or not
            if (visited[v] == false && rGraph[u][v] > 0) {
                queue.push(v);
                parent[v] = u;
                visited[v] = true;
            }
        }
    }
    //If we reached sink in BFS starting from source, then return true, else false
    return (visited[t] == true);
}