export default class DirectedGraph {

  constructor() {
    this.vertices_ = new Map();
  }

  get edgeCount() {
    // return [...this.vertices_.values()].reduce((count, set) => count += set.size, 0);

    let count = 0;

    for (let set of this.vertices_.values()) {
      count += set.size;
    }

    return count;
  }

  get vertexCount() {
    return this.vertices_.size;
  }

  addEdge(source, target) {
    if (this.vertices_.has(source)) {
      this.vertices_.get(source).add(target);
    } else {
      this.vertices_.set(source, new Set([target]));
    }
  }

  getEdgesOf(vertex) {
    let edges = new Set();

    if (this.vertices_.has(vertex)) {
      for (let target of this.vertices_.get(vertex)) {
        edges.add({ source: vertex, target: target });
      }
    }

    return edges;
  }

  toJSON() {
    const m = new Map();

    for (let [k, v] of this.vertices_.entries()) {
      m.set(k, Array.from(v.entries()));
    }

    return Array.from(m.entries());
  }

  static deserialize(json) {
    if (typeof json === 'string') {
      json = JSON.parse(json);
    }

    const m = new Map(json);

    for (let [k, v] of m.entries()) {
      m.set(k, new Set(v));
    }

    const graph = new DirectedGraph();

    graph.vertices_ = m;

    return graph;
  }

}
