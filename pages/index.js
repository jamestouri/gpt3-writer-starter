import Head from 'next/head';
import Image from 'next/image';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

const Home = () => {
  const [userInput, setUserInput] = useState('');
  const [apiOutput, setApiOutput] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const { register, handleSubmit } = useForm();
  const onSubmit = (data) => console.log(data);

  const callGenerateEndpoint = async () => {
    setIsGenerating(true);

    console.log('Calling OpenAI...');
    const response = await fetch('/api/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: JSON.stringify({ userInput }),
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
      <form onSubmit={handleSubmit(onSubmit)}>
        <select {...register('contentType')}>
          <option value='email'>email</option>
          <option value='text'>text</option>
          <option value='phone-script'>phone script</option>
        </select>
      </form>
      <div className='prompt-container'>
        <textarea
          className='prompt-box'
          placeholder='start typing here'
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
              {isGenerating ? <span className='loader'></span> : <p>Generate</p>}
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
