# Perpetual Pools v2 Skew Balancer Bot

Typescript implementation of a sample bot built on top of Tracer Perpetual Pools V2.

This bot makes use of [The Perpetual Pools V2 Pool Watcher](https://github.com/tracer-protocol/perpetual-pools-v2-pool-watcher) to handle watching the pool and calculating the expected pool state.

## Running

Install dependencies with `yarn`.

Make a copy of `example.env`, rename it to `.env` and fill with your variables.

Compile ts source code with `yarn tsc`.

Run keeper bot with `node build/index.js`.