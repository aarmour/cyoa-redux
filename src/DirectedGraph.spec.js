import expect from 'expect.js';
import DirectedGraph from './DirectedGraph';

describe('new DirectedGraph', () => {

  it('should have no vertices', () => {
    expect((new DirectedGraph()).vertexCount).to.be(0);
  });

});

describe('.addEdge(source, target)', () => {

  it('should add the edge', () => {
    let graph = new DirectedGraph();
    graph.addEdge(1, 2);

    expect(graph.edgeCount).to.be(1);
  });

  it('should add more than one edge with the same source vertex', () => {
    let graph = new DirectedGraph();
    graph.addEdge(1, 2);
    graph.addEdge(1, 3);

    expect(graph.edgeCount).to.be(2);
  });

  it('should not add the same edge more than once', () => {
    let graph = new DirectedGraph();
    graph.addEdge(1, 2);
    graph.addEdge(1, 2);

    expect(graph.edgeCount).to.be(1);
  });

});

describe('.removeEdge(source, target)', () => {

  it('should remove the edge');

});

describe('.getEdgesOf(vertex)', () => {

  it('should return an empty collection if the vertex is not in the graph', () => {
    let graph = new DirectedGraph();

    expect(graph.getEdgesOf(1).size).to.eql(0);
  });

  it('should return an empty collection if there are no edges touching the specified vertex');

  it('should return all of the edges touching the specified vertex', () => {
    let graph = new DirectedGraph();
    graph.addEdge(1, 2);
    graph.addEdge(1, 3);

    let edges = graph.getEdgesOf(1);

    expect(edges.size).to.be(2);
    expect(Array.from(edges)[0]).to.eql({ source: 1, target: 2 });
    expect(Array.from(edges)[1]).to.eql({ source: 1, target: 3 });
  });

});

describe('serialization', () => {

  it('should be serializable', () => {
    const graph = new DirectedGraph();
    const src = { foo: 'bar' };
    const target = { bar: 'baz' };
    const target2 = { baz: 'qux' };

    graph.addEdge(src, target);
    graph.addEdge(src, target2);

    const json = JSON.stringify(graph);
    const graph2 = DirectedGraph.deserialize(json);

    expect(graph2.edgeCount).to.be(2);
  });

});
