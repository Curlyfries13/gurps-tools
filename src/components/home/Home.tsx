import React from 'react';
import Markdown from 'markdown-to-jsx';
import { homeText, damageCalculatorText, help } from './homeText';

const HomePage = () => {
  return (
    <>
      <div className='row'>
        <div className='col-sm'>
          <Markdown>{homeText}</Markdown>
        </div>
      </div>
      <div className='row'>
        <div className='col-sm'>
          <Markdown>{damageCalculatorText}</Markdown>
        </div>
      </div>
      <div className='row'>
        <div className='col-sm'>
          <Markdown>{help}</Markdown>
        </div>
      </div>
    </>
  );
};

export default HomePage;
