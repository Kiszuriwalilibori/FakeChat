var graph = {
    A: { B: "5", D: "5", E: "7" },
    B: { C: "4" },
    C: { D: "8", E: "2" },
    D: { C: "8", E: "6" },
    E: { B: "3" },
};

export function dijkstra3(graphStart, graphEnd) {
    var dist = {};
    var done = {};
    var prev = {};

    for (var i in graph) {
        dist[i] = Infinity;
        prev[i] = 0;
        done[i] = false;
    }

    dist[graphStart] = 0;

    var closest;
    var minDist;
    var finalPath = [];
    for (var i in graph) {
        minDist = Infinity /*), closest*/;
        for (var j in graph) {
            if (!done[j]) {
                if (dist[j] <= minDist) {
                    minDist = dist[j];
                    closest = j;
                }
            }
        }

        done[closest] = true;

        var neighbors = tracksFrom(closest);
        for (var nb in neighbors) {
            var w = neighbors[nb];
            if (!done[nb]) {
                if (dist[closest] + w < dist[nb]) {
                    dist[nb] = dist[closest] + w;
                    prev[nb] = closest;
                }
            }
        }
    }

    //     // tidy
    var route = [[graphEnd, 0]];
    var last = graphEnd;
    while (true) {
        last = prev[last];
        if (last != 0) {
            var prevStaton = graph[last];
            route.push([last, prevStaton[route[route.length - 1][0]]]);
        } else {
            break;
        }
    }

    route.reverse();
    //now returns: [ [ 'A', 5 ], [ 'B', 4 ], [ 'C', 0 ] ]

    return route;
}

function tracksFrom(node) {
    var found = graph[node];
    if (found === undefined) {
        return false;
    } else {
        return found;
    }
}

// function out() {
//     var args = Array.prototype.slice.call(arguments, 0);
//     document.getElementById("output").innerHTML += args.join(" ") + "\n";
// }

// out("A-C - should be A-B-C : 5 4 0 (so, 9)");
// out(dijkstra("A", "C"));
// out("");
// out("");
// out("B-B - should be B-C-E-B : 4 2 3 0 (so again, 9)");
// out(dijkstra("B", "B"));

console.log(dijkstra3("B", "B"));
