import React from 'react';
import Markdown from 'markdown-to-jsx';
import * as aboutText from './aboutText';

const AboutPage = () => {
  return (
    <div className='row'>
      <div className='col-sm'>
        <Markdown>{aboutText.default.valueOf()}</Markdown>
      </div>
    </div>
  );
};

export default AboutPage;
