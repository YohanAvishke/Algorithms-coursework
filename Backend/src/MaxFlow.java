//at least 4 and at most 10 nodes, excluding source s and target t nodes.
//The capacities on the edges should be generated randomly in the range between 5 and 20.

import java.util.Arrays;

public class MaxFlow {
    final int N = (int) (Math.random() * ((12 - 6) + 1)) + 6;

    public static void main(String[] args) {
        MaxFlow maxFlow = new MaxFlow();
        int[][]graph = maxFlow.generateGraph(maxFlow.N);
        for (int[] row : graph)
            System.out.println(Arrays.toString(row));
    }

    public int[][] generateGraph(int n) {
        int[][] graph = new int[n][n];
        for (int i = 0; i < graph.length; i++) {
            for (int j = 0; j < graph[i].length; j++) {
                if (i != j)
                graph[i][j] = (int) (Math.random() * ((19 - 6) + 1) + 6);
            }
        }
        return graph;
    }
}
