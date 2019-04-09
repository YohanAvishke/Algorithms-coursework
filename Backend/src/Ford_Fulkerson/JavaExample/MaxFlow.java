package Ford_Fulkerson.JavaExample;

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
        int[][] graph = maxFlowObj.generateGraph(); //capacity graph
        int maxFlow = maxFlowObj.fordFulkerson(graph); //calculate max flow

        //display graph
        for (int[] row : graph)
            System.out.println(Arrays.toString(row));

        //display maximum possible flow
        System.out.println("\nThe maximum possible flow is " +
                maxFlow);
    }

    private int[][] generateGraph() {
        int[][] graph = new int[N][N];

        for (int i = 0; i < graph.length-1; i++) {
            for (int j = 1; j < graph[i].length; j++) {
                if (i != j) //skip generating capacities to same node
                    //generate random capacities(5 < cap < 20)
                    graph[i][j] = (int) (Math.random() * ((19 - 6) + 1) + 6);
            }
        }
        return graph;
    }

    private int fordFulkerson(int[][] graph) {
        int u, v;
        int s = 0;//source
        int t = N - 1;//sink
        int[][] rGraph = new int[N][N];//residual graph to store residual capacity(leftover capacity after flow started)

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

        // Augment the flow while there is path from source
        // to sink
        while (bfs(rGraph, s, t, parent)) {
            // Find minimum residual capacity of the edges
            // along the path filled by BFS. Or we can say
            // find the maximum flow through the path found.
            int path_flow = Integer.MAX_VALUE;
            for (v = t; v != s; v = parent[v]) {
                u = parent[v];
                path_flow = Math.min(path_flow, rGraph[u][v]);
            }

            // update residual capacities of the edges and
            // reverse edges along the path
            for (v = t; v != s; v = parent[v]) {
                u = parent[v];
                rGraph[u][v] -= path_flow;
                rGraph[v][u] += path_flow;
            }

//            for (int i=0;i<rGraph.length;i++){
//                for (int j=0;j<rGraph[i].length;j++){
//                    System.out.print(rGraph[i][j]+" ");
//                }
//                System.out.println("");
//            }
//            System.out.println("-----------------");
            // Add path flow to overall flow
            max_flow += path_flow;
        }

        return max_flow;
    }

    private boolean bfs(int[][] rGraph, int s, int t, int[] parent) {
        boolean[] visited = new boolean[N];//to check is a node is visited or not

        /* if there is an element in queue that means that elements child nodes have not been searched yet
         * queue is first in first out ,so the element's children can be searched in the order of the elements
           added */
        LinkedList<Integer> queue = new LinkedList<>();
        queue.add(s);// source node is added to queue
        visited[s] = true;// source node is marked as visited
        parent[s] = -1;//flow to source is marked as coming from -1


//        while loop to check if all the children nodes are searched is used
        while (queue.size() != 0) {

            int u = queue.poll();// first element of queue is stored in 'u' and removed from queue

            for (int v = 0; v < N; v++) {
                //check if each node is visited and if each child node of u has a flow or not
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

