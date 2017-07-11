import { List, Map, Record } from "immutable";

const BRANCH_STATES = "BRANCH_STATES";
const CUT_STATES = "CUT_STATES";
const ADD_PLAYER = "ADD_PLAYER";
const SHOW_ADD_PLAYER = "SHOW_ADD_PLAYER";
const SHOW_BRANCH_STATES = "SHOW_BRANCH_STATES";
const SHOW_CUT_STATES = "SHOW_CUT_STATES";
const SHOW_MAIN_VIEW = "SHOW_MAIN_VIEW";

export const mode = {
  VIEW: "VIEW_MODE",
  BRANCH: "BRANCH_MODE",
  CUT: "CUT_MODE",
  ADD_PLAYER: "ADD_PLAYER_MODE"
}

export const roles = {
  JUDGE: "Judge",
  BISHOP: "Bishop",
  KING: "King",
  FOOL: "Fool",
  QUEEN: "Queen",
  THIEF: "Thief",
  WITCH: "Witch",
  SPY: "Spy",
  PEASANT: "Peasant",
  CHEAT: "Cheat",
  INQUISITOR: "Inquisitor",
  WIDOW: "Widow"
}

const StateRecord = Record({
  players: List(),                        // player ids
  roles: List(),                          // roles in game
  playerNames: Map(),                     // player id => String
  probabilities: Map().set(Map(), 1.),    // (player id => role) => probability
  mode: mode.VIEW
})

class State extends StateRecord {
  probabilitiesSum() {
    return this.probabilities.reduce(
      (accumulator, value) => accumulator + value
    )
  }

  normalizeProbabilities() {
    let probSum = this.probabilitiesSum()
    if(Math.abs(probSum - 1) > 1e-8) {
      return this.update(
        "probabilities", probs => probs.map(prob => prob / probSum)
      )
    } else {
      return this
    }
  }

  cut(player, role) {
    // return states matching (player => role)
    return this.update(
      "probabilities", probs => probs.filter((v, k) => k.get(player) == role)
    ).normalizeProbabilities()
  }

  branch(players, probability) {
    let flip_roles = (k) => {
      let r0 = k.get(players[0])
      let r1 = k.get(players[1])
      return k.set(players[0], r1).set(players[1], r0)
    }
    let no = this.update(
      "probabilities", probs => probs.map(x => x * (1 - probability))
    )
    let yes = this.update(
      "probabilities",
      probs => probs.reduce(
        (a, v, k) => a.set(flip_roles(k), v * probability), Map()
      )
    )
    let all = yes.update(
      "probabilities",
      probs => probs.mergeWith((v1, v2) => v1 + v2, no.probabilities)
    )
    return all
  }

  table() {
    // player => role => probability
    return Map(this.players.map(player =>
      [player, Map(this.roles.map(role =>
        [role, this.probabilities.filter(
          (v, k) => k.get(player) == role
        ).reduce((a, v) => a + v, 0)]
      ))]
    ))
  }

  addPlayer(name, role) {
    let player_id = this.players.reduce((a, v) => Math.max(a, v), 0) + 1;
    return this.update(
      "players", players => players.push(player_id)
    ).update(
      "roles", roles => roles.includes(role) ? roles : roles.push(role)
    ).update(
      "playerNames", pname => pname.set(player_id, name)
    ).update(
      "probabilities", probs => probs.reduce(
        (a, v, k) => a.set(k.set(player_id, role), v), Map()
      )
    )
  }
}

//initiate your starting state
const initial = new State().addPlayer("Wojtek", roles.PEASANT).addPlayer("Asia", roles.PEASANT)
                           .branch([1, 2], 0.4).addPlayer("Przemek", roles.BISHOP)
                           .branch([1, 3], 0.4).branch([1, 2], 0.5).cut(3, roles.PEASANT).cut(1, roles.PEASANT)

const reducer = (state = initial, action) => {
  switch (action.type) {
    case BRANCH_STATES:
      return state.branch(action.players, action.probability)
    case CUT_STATES:
      return state.cut(action.player, action.role)
    case ADD_PLAYER:
      return state.addPlayer(action.name, action.role)
    case SHOW_ADD_PLAYER:
      return state.update("mode", _ => mode.ADD_PLAYER)
    case SHOW_BRANCH_STATES:
      return state.update("mode", _ => mode.BRANCH)
    case SHOW_CUT_STATES:
      return state.update("mode", _ => mode.CUT)
    case SHOW_MAIN_VIEW:
      return state.update("mode", _ => mode.VIEW)
    default:
      return state;
  }
};
export default reducer;

/////////////// ACTION DISPATCHER FUNCTIONS///////////////////
export const branchStates = (players, probability) => dispatch => {
  dispatch({type: BRANCH_STATES, players, probability})
}

export const cutStates = (player, role) => dispatch => {
  dispatch({type: CUT_STATES, player, role})
}

export const addPlayer = (name, role) => dispatch => {
  dispatch({type: ADD_PLAYER, name, role})
}

export const showBranch = () => dispatch => {
  dispatch({type: SHOW_BRANCH_STATES})
}

export const showCut = () => dispatch => {
  dispatch({type: SHOW_CUT_STATES})
}

export const showAddPlayer = () => dispatch => {
  dispatch({type: SHOW_ADD_PLAYER})
}

export const showMainView = () => dispatch => {
  dispatch({type: SHOW_MAIN_VIEW})
}