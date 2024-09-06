# Reinforcement Learning Grid World Demo

This project is a simple web-based demonstration of reinforcement learning (RL) using a grid world environment. It showcases how an RL agent learns to navigate from a starting position to a goal position using Q-learning.

## Features

- 5x5 grid world environment
- Q-learning algorithm implementation
- Interactive visualization of the learning process
- Step-by-step execution and bulk training options
- Demonstration of learned policy
- Visual representation of Q-values and agent's path

## Files

- `index.html`: The main HTML file containing the structure and style of the web app.
- `app.js`: The JavaScript file implementing the RL logic and user interface interactions.

## How to Use

1. Clone this repository or download the files.
2. Open `index.html` in a web browser.
3. Use the following controls:
   - **Step**: Make the agent take one action based on its current policy.
   - **Train**: Run 1000 episodes of training to improve the agent's policy.
   - **Demonstrate**: Show the agent's learned behavior by moving to the goal.

## Learning Process

The agent learns using the Q-learning algorithm. The Q-values for each state-action pair are updated according to the formula:

Q(s, a) = Q(s, a) + α * [R + γ * max(Q(s', a')) - Q(s, a)]

Where:
- Q(s, a) is the Q-value for the current state s and action a
- α (alpha) is the learning rate
- R is the reward received for taking action a in state s
- γ (gamma) is the discount factor
- max(Q(s', a')) is the maximum Q-value for the next state s' over all possible actions a'

## Reward Structure

The reward structure in this demo is as follows:
- Reaching the goal (4,4): +1 reward
- Any other action: -0.1 reward

This encourages the agent to reach the goal as quickly as possible while minimizing unnecessary steps.

## Visualization

- The grid shows the current Q-values for each action in each cell.
- The agent's position is marked with 'A'.
- The goal position is marked with 'G'.
- During demonstration, the agent's path is highlighted with a magenta border.

## Customization

You can modify the following parameters in `app.js` to experiment with different learning scenarios:

- `GRID_SIZE`: Size of the grid (default: 5x5)
- `LEARNING_RATE`: Alpha value in Q-learning update (default: 0.1)
- `DISCOUNT_FACTOR`: Gamma value in Q-learning update (default: 0.9)
- `EPSILON`: Exploration rate for epsilon-greedy policy (default: 0.1)

## Future Improvements

- Add obstacles to the grid world
- Implement different RL algorithms (e.g., SARSA, Deep Q-Network)
- Allow user-defined start and goal positions
- Visualize the learning progress over time

## License

This project is open source and available under the [MIT License](LICENSE).

## Contributing

Contributions, issues, and feature requests are welcome. Feel free to check [issues page](https://github.com/yourusername/rl-grid-world-demo/issues) if you want to contribute.

## Author

Bo Shang created this project with CursorAI.
