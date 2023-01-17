import run from './src/run';
import { argumentsAreValid } from './src/validators';
const args = process.argv.slice(2);
// Validate arguments
if (!argumentsAreValid(args)) throw new Error();
run({
    siteId: args[0],
    startDate: args[1] && args[1],
    endDate: args[2] && args[2]
});