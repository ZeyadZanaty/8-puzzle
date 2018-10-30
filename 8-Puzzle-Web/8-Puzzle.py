from flask import Flask, request, jsonify
from flask_cors import CORS
import numpy as np
import json
import math
import game

app = Flask(__name__)
CORS(app)


@app.route('/run', methods=['POST'])
def run():
    print(request.get_json())
    req = request.get_json()
    start_state = req['state']
    start_state = np.array(start_state).reshape((3, 3))

    run_call = getattr(game,req['algorithm'])
    print(run_call)
    if run_call and req['heuristic']:
        can_solve, steps, depth, run_time, visited = run_call(start_state,game.goal_state,req['heuristic'])
    elif run_call:
        can_solve, steps, depth, run_time, visited = run_call(start_state, game.goal_state)

    response = {
        "steps": steps,
        "nodes_visited": visited,
        "run_time": run_time,
        "solvable": can_solve,
        "depth": depth
    }

    print(jsonify(response))
    return jsonify(response),201


if __name__ == '__main__':
    app.run(debug=True)
