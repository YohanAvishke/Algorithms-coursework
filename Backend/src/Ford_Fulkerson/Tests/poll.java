package Ford_Fulkerson.Tests;

import java.util.LinkedList;

public class poll {
    public static void main(String[] args) {
        LinkedList<Integer>test = new LinkedList<>();
        test.add(1);
        test.add(2);
        test.add(3);
        System.out.println(test.pop());
        for(int i = 0; i < test.size();i++ ){
            System.out.print(test.get(i) + " ");
        }
        System.out.println("");
        System.out.println(test.poll());
        for(int i = 0; i < test.size();i++ ){
            System.out.print(test.get(i) + " ");
        }
        System.out.println("");
    }
}
