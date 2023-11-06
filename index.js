import readline from 'readline';
import axios from 'axios';
import ora from 'ora';
import chalk from 'chalk';

const axiosInstance = axios.create({
  baseURL: 'https://api.openai.com',
  headers: {
    'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`
  }
});

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});
const spinner = ora({
  text: 'Loading...',
  color: 'magenta',
  spinner: 'dots'
});
const log = {
  info: message => console.log(chalk.blue(message)),
  error: message => console.log(chalk.red(message)),
  success: message => console.log(chalk.green(message)),
  user: message => console.log(chalk.yellow(message)),
  assistant: message => console.log(chalk.cyan(`Assistant: ${message}`))
};

async function chatWithAssistant() {
  const recursiveAsyncReadLine = () => {
    log.user('Question: ');
    rl.question('', async (userInput) => {
      if (userInput === 'exit') {
        return rl.close();
      }

      try {
        const startTime = new Date();
        rl.pause();
        spinner.start('Thinking...');

        const { data: { choices } } = await axiosInstance.post('/v1/engines/davinci-codex/completions', {
          prompt: userInput,
          max_tokens: 60
        });

        const endTime = new Date();
        const durationInSeconds = ((endTime - startTime) / 1000).toFixed(2);
        spinner.succeed(`${durationInSeconds}s`);

        rl.resume();
        log.success(choices[0].text);
      } catch (error) {
        spinner.fail('Error occurred!');
        log.error('Error invoking the assistant: ' + error);
        rl.resume();
      }

      recursiveAsyncReadLine();
    });
  };
  recursiveAsyncReadLine();
}

chatWithAssistant();