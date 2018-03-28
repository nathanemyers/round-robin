const _ = require('lodash')
const Chance = require('chance')

const chance = new Chance()

// KNOBS
const weight_variance = 2
const leads = 1000
const num_agents = 10

function makeAgent(name, weight) {
  return {
    name,
    weight,
    hunger: 0,
    leads_assigned: 0,
  }
}

let agents = []

for( let i=0; i < num_agents; i++ ) {
  const weight = _.round((Math.random() * weight_variance) + 1, 2)
  agents.push(makeAgent(chance.name(), weight))
}

function stepAgents(agents) {
  return agents.map(agent => {
    agent.hunger += agent.weight
    return agent
  })
}

function selectAgent(agent) {
  agent.hunger = 0
  agent.leads_assigned += 1
  return agent
}

for( let i=0; i < leads; i++ ) {
  agents = stepAgents(agents)
  let selected = _.maxBy(agents, agent => agent.hunger)
  selectAgent(selected)

  let { name, weight, leads_assigned } = selected
  console.log(`${name} got a lead! (Weight: ${weight}, Leads: ${leads_assigned})`)
} 

console.log('')
console.log(`REPORT (${leads} Lead Assignments, ${num_agents} Agents)`)
agents.forEach(agent => {
  const { name, weight, leads_assigned } = agent
  const pct = _.round((leads_assigned/leads) * 100, 2)
  console.log(`${pct}% -- ${name}: ${leads_assigned} assignments, ${weight} weight`)
})
