const SEPARATOR = " ";

export class Graph {
    constructor() {
        this.nodes = [];
        this.adjacencyList = [];
    }

    addNode(node) {
        this.nodes.push(node);
        this.adjacencyList[node] = [];
    }
    addEdge(node1, node2, weight) {
        this.adjacencyList[node1].push({ node: node2, weight: weight });
        this.adjacencyList[node2].push({ node: node1, weight: weight });
    }
    findPathWithDijkstra(startNode, endNode) {
        let times = [];
        let backtrace = [];
        let pq = new PriorityQueue();
        times[startNode] = 0;

        this.nodes.forEach(node => {
            if (node !== startNode) {
                times[node] = Infinity;
            }
        });
        pq.enqueue([startNode, 0]);
        while (!pq.isEmpty()) {
            let shortestStep = pq.dequeue();
            let currentNode = shortestStep[0];

            this.adjacencyList[currentNode].forEach(neighbor => {
                let time = times[currentNode] + neighbor.weight;

                if (time < times[neighbor.node]) {
                    times[neighbor.node] = time;
                    backtrace[neighbor.node] = currentNode;
                    pq.enqueue([neighbor.node, time]);
                }
            });
        }
        let path = [endNode];
        let lastStep = endNode;
        console.log("path", path);
        while (lastStep !== startNode) {
            path.unshift(backtrace[lastStep]);

            lastStep = backtrace[lastStep];
        }

        return `Path is ${path} and time is ${times[endNode]}`;
    }
}

class PriorityQueue {
    constructor() {
        this.collection = [];
    }
    enqueue(element) {
        if (this.isEmpty()) {
            this.collection.push(element);
        } else {
            let added = false;
            console.log(this.collection.length);
            for (let i = 1; i <= this.collection.length; i++) {
                if (element[1] < this.collection[i - 1][1]) {
                    this.collection.splice(i - 1, 0, element);
                    added = true;
                    break;
                }
            }
            if (!added) {
                this.collection.push(element);
            }
        }
    }
    dequeue() {
        let value = this.collection.shift();
        return value;
    }

    isEmpty() {
        return this.collection.length === 0;
    }
}

let testGraph01 = new Graph();

testGraph01.addNode("Warszawa Start");
testGraph01.addNode("B");
testGraph01.addNode("C");
testGraph01.addNode("D");
testGraph01.addNode("Warszawa Stop");

testGraph01.addEdge("Warszawa Start", "B", 10);
testGraph01.addEdge("C", "D", 5);
testGraph01.addEdge("D", "B", 5);
testGraph01.addEdge("B", "Warszawa Stop", 1);
testGraph01.addEdge("D", "Warszawa Stop", 1);
const inputData = [
    "16: Warszawa",
    "Białystok Olsztyn 210",
    "Białystok Warszawa 132",
    "Białystok Lublin 226",
    "Białystok Bydgoszcz 306",
    "Białystok Gdańsk 289",
    "Białystok Łódź 209",
    "Białystok Poznań 306",
    "Białystok Szczecin 448",
    "Białystok Gorzów Wielkopolski 391",
    "Białystok Wrocław 333",
    "Białystok Opole 343",
    "Białystok Katowice 309",
    "Białystok Kielce 247",
    "Białystok Kraków 327",
    "Białystok Rzeszów 320",
    "Olsztyn Warszawa 161",
    "Olsztyn Lublin 263",
    "Olsztyn Bydgoszcz 187",
    "Olsztyn Gdańsk 114",
    "Olsztyn Łódź 211",
    "Olsztyn Poznań 268",
    "Olsztyn Szczecin 367",
    "Olsztyn Gorzów Wielkopolski 353",
    "Olsztyn Wrocław 335",
    "Olsztyn Opole 350",
    "Olsztyn Katowice 316",
    "Olsztyn Kielce 273",
    "Olsztyn Kraków 353",
    "Olsztyn Rzeszów 355",
    "Warszawa Lublin 118",
    "Warszawa Bydgoszcz 200",
    "Warszawa Gdańsk 229",
    "Warszawa Łódź 104",
    "Warszawa Poznań 198",
    "Warszawa Szczecin 340",
    "Warszawa Gorzów Wielkopolski 283",
    "Warszawa Wrocław 225",
    "Warszawa Opole 228",
    "Warszawa Katowice 193",
    "Warszawa Kielce 128",
    "Warszawa Kraków 209",
    "Warszawa Rzeszów 207",
    "Lublin Bydgoszcz 286",
    "Lublin Gdańsk 341",
    "Lublin Łódź 189",
    "Lublin Poznań 287",
    "Lublin Szczecin 429",
    "Lublin Gorzów Wielkopolski 372",
    "Lublin Wrocław 314",
    "Lublin Opole 319",
    "Lublin Katowice 248",
    "Lublin Kielce 148",
    "Lublin Kraków 211",
    "Lublin Rzeszów 114",
    "Bydgoszcz Gdańsk 116",
    "Bydgoszcz Łódź 155",
    "Bydgoszcz Poznań 97",
    "Bydgoszcz Szczecin 219",
    "Bydgoszcz Gorzów Wielkopolski 183",
    "Bydgoszcz Wrocław 197",
    "Bydgoszcz Opole 254",
    "Bydgoszcz Katowice 258",
    "Bydgoszcz Kielce 262",
    "Bydgoszcz Kraków 312",
    "Bydgoszcz Rzeszów 380",
    "Gdańsk Łódź 206",
    "Gdańsk Poznań 197",
    "Gdańsk Szczecin 262",
    "Gdańsk Gorzów Wielkopolski 281",
    "Gdańsk Wrocław 295",
    "Gdańsk Opole 345",
    "Gdańsk Katowice 311",
    "Gdańsk Kielce 314",
    "Gdańsk Kraków 365",
    "Gdańsk Rzeszów 422",
    "Łódź Poznań 143",
    "Łódź Szczecin 282",
    "Łódź Gorzów Wielkopolski 226",
    "Łódź Wrocław 145",
    "Łódź Opole 167",
    "Łódź Katowice 137",
    "Łódź Kielce 139",
    "Łódź Kraków 193",
    "Łódź Rzeszów 274",
    "Poznań Szczecin 168",
    "Poznań Gorzów Wielkopolski 109",
    "Poznań Wrocław 127",
    "Poznań Opole 182",
    "Poznań Katowice 232",
    "Poznań Kielce 260",
    "Poznań Kraków 286",
    "Poznań Rzeszów 368",
    "Szczecin Gorzów Wielkopolski 73",
    "Szczecin Wrocław 247",
    "Szczecin Opole 289",
    "Szczecin Katowice 337",
    "Szczecin Kielce 402",
    "Szczecin Kraków 391",
    "Szczecin Rzeszów 473",
    "Gorzów Wielkopolski Wrocław 187",
    "Gorzów Wielkopolski Opole 229",
    "Gorzów Wielkopolski Katowice 278",
    "Gorzów Wielkopolski Kielce 342",
    "Gorzów Wielkopolski Kraków 332",
    "Gorzów Wielkopolski Rzeszów 414",
    "Wrocław Opole 81",
    "Wrocław Katowice 129",
    "Wrocław Kielce 252",
    "Wrocław Kraków 183",
    "Wrocław Rzeszów 265",
    "Opole Katowice 83",
    "Opole Kielce 210",
    "Opole Kraków 138",
    "Opole Rzeszów 220",
    "Katowice Kielce 132",
    "Katowice Kraków 67",
    "Katowice Rzeszów 148",
    "Kielce Kraków 100",
    "Kielce Rzeszów 145",
    "Kraków Rzeszów 112",
];
function getLocation(str) {
    return str.split(" ")[1];
}
function hasLocation(str) {
    return str.includes(location) ? true : false;
}

var location = getLocation(inputData[0]);
const locationStart = `${location}Start`;
const locationStop = `${location}Stop`;

function setStartPoints(input) {
    const result = input.map(item => {
        if (hasLocation(item)) {
            if (item.startsWith(location)) {
                const newItem = item.replace(location, locationStart);
                return newItem;
            } else {
                const newString = item.replace(location, "");
                item = locationStart.concat(SEPARATOR, newString).replace("  ", SEPARATOR);
                return item;
            }
        } else {
            return item;
        }
    });
    result.shift();
    return result;
}

function setStopPoints(input) {
    input.forEach((item, index, array) => {
        if (hasLocation(item)) {
            const stopItem = item.replace(locationStart, locationStop);
            array.push(stopItem);
        } else {
        }
    });
    return input;
}

function getNodes(input) {
    const starts = input.filter(item => {
        return item.includes(locationStart) ? true : false;
    });
    const nodes = starts.map(item => {
        return item.substring(0, item.lastIndexOf(SEPARATOR)).replace(locationStart, "").trim();
    });
    nodes.unshift(locationStart, locationStop);

    return nodes;
}

function separateEdges(edges, nodes) {
    const separated = edges.map(edge => {
        const separated = edge.split(SEPARATOR);
        const x = +separated[separated.length - 1];
        separated[separated.length - 1] = x;
        if (separated.length > 3) {
            if (nodes.includes(separated[0])) {
                const concatenated = separated[1] + SEPARATOR + separated[2];
                separated.splice(1, 2, concatenated);
            } else {
                const concatenated = separated[0] + SEPARATOR + separated[1];
                separated.splice(0, 2, concatenated);
            }
        }

        return separated;
    });
    return separated;
}

// export function dijkstra2() {
//     const edges = setStopPoints(setStartPoints(inputData)).sort();
//     const nodes = getNodes(edges);
//     const separatedEdges = separateEdges(edges, nodes);

//     let myGraph = new Graph();

//     nodes.forEach(node => {
//         myGraph.addNode(node);
//     });
//     separatedEdges.forEach(edge => {
//         myGraph.addEdge(edge[0], edge[1], edge[2]);
//     });

//     console.log(myGraph.findPathWithDijkstra("WarszawaStart", "WarszawaStop"));
// }

export function dijkstra2() {
    console.log(testGraph01.findPathWithDijkstra("Warszawa Start", "Warszawa Stop"));
}
