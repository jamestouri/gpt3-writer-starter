import Head from 'next/head';
import { useState } from 'react';
import Select from 'react-select';
import { keysFromOption } from './helpers';

const options = [
  { value: 'email', label: 'Email' },
  { value: 'text', label: 'Text' },
  { value: 'phone-script', label: 'Phone Script' },
];

const Home = () => {
  const [userInput, setUserInput] = useState('');
  const [apiOutput, setApiOutput] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [selectedOption, setSelectedOption] = useState('email');

  const callGenerateEndpoint = async () => {
    setIsGenerating(true);
    const optionKeys = keysFromOption(selectedOption.value);
    console.log('Calling OpenAI...');
    const response = await fetch('/api/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userInput,
        selectedOption: selectedOption.value,
        wordLength: optionKeys.wordCount,
        communication: optionKeys.communication,
      }),
    });

    const data = await response.json();
    const { output } = data;
    console.log('OpenAI replied...', output.text);

    setApiOutput(`${output.text}`);
    setIsGenerating(false);
  };

  const onUserChangedText = (e) => {
    console.log(e.target.value);
    setUserInput(e.target.value);
  };

  return (
    <div className='root'>
      <Head>
        <title>Cicero</title>
      </Head>
      <div className='container'>
        <div className='header'>
          <div className='header-title'>
            <h1>Cicero</h1>
          </div>
          <div className='header-subtitle'>
            <h2>
              Create emails, texts and call scripts for any topic to succeed at
              your campaign
            </h2>
          </div>
        </div>
      </div>
      <div className='select-container'>
        <h4 className='select-text'>Select content type</h4>
        <Select
          defaultValue={options[0]}
          onChange={setSelectedOption}
          options={options}
        />
      </div>
      <div className='prompt-container'>
        <textarea
          className='prompt-box'
          placeholder='Separate each issue with a comma'
          value={userInput}
          onChange={onUserChangedText}
        />
        <div className='prompt-buttons'>
          <a
            className={
              isGenerating ? 'generate-button loading' : 'generate-button'
            }
            onClick={callGenerateEndpoint}
          >
            <div className='generate'>
              {isGenerating ? (
                <span className='loader'></span>
              ) : (
                <p>Generate</p>
              )}
            </div>
          </a>
        </div>
        {apiOutput && (
          <div className='output'>
            <div className='output-header-container'>
              <div className='output-header'>
                <h3>Output</h3>
              </div>
            </div>
            <div className='output-content'>
              <p>{apiOutput}</p>
            </div>
          </div>
        )}
      </div>
      <div className='badge-container grow'>
        <a
          href='https://buildspace.so/builds/ai-writer'
          target='_blank'
          rel='noreferrer'
        ></a>
      </div>
    </div>
  );
};

export default Home;
