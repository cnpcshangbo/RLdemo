const GRID_SIZE = 5;
const ACTIONS = ['up', 'right', 'down', 'left'];
const LEARNING_RATE = 0.1;
const DISCOUNT_FACTOR = 0.9;
const EPSILON = 0.1;

let agentPos = { x: 0, y: 0 };
const goalPos = { x: 4, y: 4 };
let qTable = {};

function initQTable() {
    for (let y = 0; y < GRID_SIZE; y++) {
        for (let x = 0; x < GRID_SIZE; x++) {
            qTable[`${x},${y}`] = {};
            ACTIONS.forEach(action => {
                qTable[`${x},${y}`][action] = 0;
            });
        }
    }
}

function chooseAction(state, epsilon = EPSILON) {
    if (Math.random() < epsilon) {
        return ACTIONS[Math.floor(Math.random() * ACTIONS.length)];
    } else {
        const stateActions = qTable[state];
        return Object.keys(stateActions).reduce((a, b) => stateActions[a] > stateActions[b] ? a : b);
    }
}

function takeAction(action) {
    const newPos = { ...agentPos };
    switch (action) {
        case 'up': newPos.y = Math.max(0, newPos.y - 1); break;
        case 'right': newPos.x = Math.min(GRID_SIZE - 1, newPos.x + 1); break;
        case 'down': newPos.y = Math.min(GRID_SIZE - 1, newPos.y + 1); break;
        case 'left': newPos.x = Math.max(0, newPos.x - 1); break;
    }
    return newPos;
}

function getReward(pos) {
    return (pos.x === goalPos.x && pos.y === goalPos.y) ? 1 : -0.1;
}

function updateQTable(state, action, nextState, reward) {
    const currentQ = qTable[state][action];
    const nextMaxQ = Math.max(...Object.values(qTable[nextState]));
    const newQ = currentQ + LEARNING_RATE * (reward + DISCOUNT_FACTOR * nextMaxQ - currentQ);
    qTable[state][action] = newQ;
}

function step() {
    const state = `${agentPos.x},${agentPos.y}`;
    const action = chooseAction(state);
    const newPos = takeAction(action);
    const reward = getReward(newPos);
    const nextState = `${newPos.x},${newPos.y}`;
    
    updateQTable(state, action, nextState, reward);
    agentPos = newPos;
    
    updateGrid();
    document.getElementById('info').textContent = `Action: ${action}, Reward: ${reward}`;
}

function train(episodes = 1000) {
    for (let i = 0; i < episodes; i++) {
        agentPos = { x: 0, y: 0 };
        while (!(agentPos.x === goalPos.x && agentPos.y === goalPos.y)) {
            step();
        }
        if (i % 100 === 0) {  // Update grid every 100 episodes
            updateGrid();
        }
    }
    updateGrid();
    document.getElementById('info').textContent = 'Training complete!';
}

function updateGrid() {
    const grid = document.getElementById('grid');
    grid.innerHTML = '';
    for (let y = 0; y < GRID_SIZE; y++) {
        for (let x = 0; x < GRID_SIZE; x++) {
            const cell = document.createElement('div');
            cell.className = 'cell';
            if (x === agentPos.x && y === agentPos.y) {
                cell.classList.add('agent');
            } else if (x === goalPos.x && y === goalPos.y) {
                cell.classList.add('goal');
            }
            
            const qValues = document.createElement('div');
            qValues.className = 'q-values';
            
            // Add Q-values
            qValues.innerHTML = `
                <div class="q-value"></div>
                <div class="q-value">${qTable[`${x},${y}`].up.toFixed(2)}</div>
                <div class="q-value"></div>
                <div class="q-value">${qTable[`${x},${y}`].left.toFixed(2)}</div>
                <div class="q-value">${x === agentPos.x && y === agentPos.y ? 'A' : (x === goalPos.x && y === goalPos.y ? 'G' : '')}</div>
                <div class="q-value">${qTable[`${x},${y}`].right.toFixed(2)}</div>
                <div class="q-value"></div>
                <div class="q-value">${qTable[`${x},${y}`].down.toFixed(2)}</div>
                <div class="q-value"></div>
            `;
            
            cell.appendChild(qValues);
            grid.appendChild(cell);
        }
    }
}

function demonstratePolicy() {
    agentPos = { x: 0, y: 0 };
    updateGrid();
    
    function moveStep() {
        if (agentPos.x === goalPos.x && agentPos.y === goalPos.y) {
            document.getElementById('info').textContent = 'Goal reached!';
            return;
        }
        
        const state = `${agentPos.x},${agentPos.y}`;
        const action = chooseAction(state, 0); // Use greedy policy (epsilon = 0)
        const newPos = takeAction(action);
        agentPos = newPos;
        
        updateGrid();
        document.getElementById('info').textContent = `Action: ${action}`;
        
        setTimeout(moveStep, 500); // Move every 500ms
    }
    
    moveStep();
}

initQTable();
updateGrid();

document.getElementById('step').addEventListener('click', step);
document.getElementById('train').addEventListener('click', () => train());
document.getElementById('demonstrate').addEventListener('click', demonstratePolicy);