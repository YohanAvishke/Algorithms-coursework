package java;

import java.util.Arrays;
import java.util.LinkedList;

/*Details
 * 2D array to display graph
 * Residual Graph of a flow network is a graph which indicates additional possible flow
 * Search is done using BFS*/

public class MaxFlow {
    //number of nodes(6 <= nodes <= 12 including s and t)
    private final static int N = (int) (Math.random() * ((12 - 6) + 1)) + 6;

    public static void main(String[] args) {
        MaxFlow maxFlowObj = new MaxFlow();
        int[][] graph = maxFlowObj.generateGraph();
        int maxFlow = maxFlowObj.fordFulkerson(graph);

        //display graph
        for (int[] row : graph)
            System.out.println(Arrays.toString(row));

        //display maximum possible flow
        System.out.println("\nThe maximum possible flow is " +
                maxFlow);
    }

    private int[][] generateGraph() {
        int[][] graph = new int[N][N];

        for (int i = 0; i < graph.length; i++) {
            for (int j = 0; j < graph[i].length; j++) {
                if (i != j) //skip generating capacities to same node
                    //generate random capacities(5 < cap < 20)
                    graph[i][j] = (int) (Math.random() * ((19 - 6) + 1) + 6);
            }
        }

        return graph;
    }

    private int fordFulkerson(int[][] graph) {
        int u, v;
        int s = 0;
        int t = N - 1;
        int[][] rGraph = new int[N][N];

        // Residual graph where rGraph[u][v] indicates
        // residual capacity of edge from u to v (if there
        // is an edge. If rGraph[u][v] is 0, then there is
        // not)
        for (u = 0; u < N; u++)
            for (v = 0; v < N; v++)
                rGraph[u][v] = graph[u][v];

        // This array is filled by BFS and to store path
        int[] parent = new int[N];
        int max_flow = 0; // There is no flow initially

        // Augment the flow while tere is path from source
        // to sink
        while (bfs(rGraph, s, t, parent)) {
            int path_flow = Integer.MAX_VALUE;
            for (v = t; v != s; v = parent[v]) {
                u = parent[v];
                path_flow = Math.min(path_flow, rGraph[u][v]);
            }
            for (v = t; v != s; v = parent[v]) {
                u = parent[v];
                rGraph[u][v] -= path_flow;
                rGraph[v][u] += path_flow;
            }
            max_flow += path_flow;
        }

        return max_flow;
    }

    private boolean bfs(int[][] rGraph, int s, int t, int[] parent) {
        boolean[] visited = new boolean[N];

        LinkedList<Integer> queue = new LinkedList<>();
        queue.add(s);
        visited[s] = true;
        parent[s] = -1;

        while (queue.size() != 0) {
            int u = queue.poll();

            for (int v = 0; v < N; v++) {
                if (!visited[v] && rGraph[u][v] > 0) {
                    queue.add(v);
                    parent[v] = u;
                    visited[v] = true;
                }
            }
        }

        return (visited[t]);
    }
}

