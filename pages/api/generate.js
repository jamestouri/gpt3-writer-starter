import { Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

const generateAction = async (req, res) => {
  console.log(req.body)
  const basePromptPrefix = `
  Write me a ${req.body.selectedOption.replace('-', ' ')} as a politician ${req.body.communication} to a voter about the ${req.body.userInput} issues below in a length of under ${req.body.wordLength} words.

  signed off by Cedric Cheng, Governor of California Candidate and hoping for their vote

  `;

  const baseCompletion = await openai.createCompletion({
    model: 'text-davinci-003',
    prompt: `${basePromptPrefix}`,
    temperature: 0.99,
    max_tokens: 1250,
  });

  const basePromptOutput = baseCompletion.data.choices.pop();
  res.status(200).json({ output: basePromptOutput });
};

export default generateAction;
