import React, { useState } from 'react'
import PropTypes from 'prop-types'

export default function Textform(props) {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [incSpace, setIncSpace] = useState(1);

  const toggleIncSpace = () => {
    if(incSpace){
      setIncSpace(0);
    } else {
      setIncSpace(1);
    }
  }

  const convertUpperCase = () => {
    setOutput(input.trim().toUpperCase());
  };

  const convertLowerCase = () => {
    setOutput(input.trim().toLowerCase());
  };

  const removeExtraSpaces = () => {
    setOutput(input.trim().split(/[ ]+/).join(' '));
  };

  const capitalizeText = () => {
    let wordsList = input.split(/[ ]+/).filter((w) => { return w !== "" });
    console.log(wordsList);
    let finalWords = [];
    for(let w of wordsList){
      if(w.search('\n') !== -1){
        let words = w.split('\n');
        console.log(words);
        let wordL = []
        let word = "";
        for(let w2 of words){
          if(w2.length > 0) wordL.push(w2[0].toUpperCase() + w2.slice(1).toLowerCase());
          else wordL.push(w2);
        }
        word = wordL.join('\n');
        finalWords.push(word);
      } else {
        finalWords.push(w[0].toUpperCase() + w.slice(1).toLowerCase());
      }
    }
    console.log(finalWords);
    setOutput(finalWords.join(' '));
  }

  const handleOnChangeInput = () => {
    const InpArea = document.getElementById('input-text');
    setInput(InpArea.value);
  };

  const findAndReplace = () => {
    const findText = document.getElementById('findText');
    const replaceText = document.getElementById('replaceText');
    if(findText.value && replaceText.value){
      setOutput(input.replaceAll(findText.value, replaceText.value));
    };
  };

  const handleOnChangeOutput = () => {};

  const clearOutput = () => {
    setOutput('');
  };

  const clearInput = () => {
    setInput('');
  };

  const copyRes = () => {
    const out = document.getElementById('output-text');
    out.select();
    document.execCommand('copy');
    document.getSelection().removeAllRanges();
    document.getElementById('copy-alert').classList.remove('hidden-alert');
    setTimeout(() => {
      document.getElementById('copy-alert').classList.add('hidden-alert');
    }, 2000);
  };

  return (
    <>
    <div className="d-flex gap-4 textform-main-div-1">
      <div className="textform-sub-div-1 mt-4 mb-0">
        <p className="display-6 mb-2">Enter the text to analyse below</p>
        <div className="mb-3">
          <label htmlFor="input-text" className="form-label">Your text:</label>
          <button disabled={input.length === 0} className={`btn btn-sm btn-outline-${(props.mode === 'light') ? 'dark' : 'light'} mb-2 float-end`} onClick={clearInput}>clear</button>
          <textarea className="form-control" id="input-text" rows={props.rows} placeholder={props.phInput} value={input} onChange={handleOnChangeInput} autoFocus></textarea>
        </div>
        <div className="mb-3">
          <div className="">
            <label htmlFor="output-text" className="form-label">Edited text:</label>
            <div className="d-flex gap-2 float-end">
              <button disabled={output.split(/\s+/).filter((w) => { return (w !== "") }).length === 0} className={`btn btn-sm btn-outline-${(props.mode === 'light') ? 'dark' : 'light'} mb-2`} onClick={copyRes}>copy</button>
              <button disabled={output.split(/\s+/).filter((w) => { return (w !== "") }).length === 0} className={`btn btn-sm btn-outline-${(props.mode === 'light') ? 'dark' : 'light'} mb-2`} onClick={clearOutput}>clear</button>
            </div>
          </div>
          <textarea className="form-control" id="output-text" rows={props.rows} placeholder={props.phOutput} value={output} onChange={handleOnChangeOutput}></textarea>
        </div>
        <div className="d-flex gap-4">
          <span>Text formatting: </span>
          <div className="d-flex res-custom mb-0 gap-3">
            <button disabled={input.split(/\s+/).filter((w) => { return (w !== "") }).length === 0} className={`btn btn-${(props.mode === 'light') ? 'primary' : 'warning'}`} onClick={convertUpperCase}>Convert to Uppercase</button>
            <button disabled={input.split(/\s+/).filter((w) => { return (w !== "") }).length === 0} className={`btn btn-${(props.mode === 'light') ? 'primary' : 'warning'}`} onClick={convertLowerCase}>Convert to Lowercase</button>
            <button disabled={input.split(/\s+/).filter((w) => { return (w !== "") }).length === 0} className={`btn btn-${(props.mode === 'light') ? 'primary' : 'warning'}`} onClick={capitalizeText}>Capitalize</button>
            <button disabled={input.split(/\s+/).filter((w) => { return (w !== "") }).length === 0} className={`btn btn-${(props.mode === 'light') ? 'primary' : 'warning'}`} onClick={removeExtraSpaces}>Remove Extra Spaces</button>
          </div>
        </div>
        <div className="mt-3 d-flex gap-3" id="findReplaceForm">
          <span>Find and replace:</span>
          <div className="d-flex res-custom mb-0 gap-3">
            <input disabled={input.split(/\s+/).filter((w) => { return (w !== "") }).length === 0} type="text" id="findText" className="form-control custom-input" placeholder="Find" autoComplete="off" />
            <input disabled={input.split(/\s+/).filter((w) => { return (w !== "") }).length === 0} type="text" id="replaceText" className="form-control custom-input" placeholder="Replace" autoComplete="off" />
            <button disabled={input.split(/\s+/).filter((w) => { return (w !== "") }).length === 0} onClick={findAndReplace} className={`btn btn-${(props.mode === 'light') ? 'primary' : 'warning'}`}>Find and Replace</button>
          </div>
        </div>
      </div>
      <hr style={{margin: '0 0 -30px 0'}} />
      <div className="textform-sub-div-2 mt-4">
        <p className="display-6 mt-0 mb-2">Text summary</p>
        <div className="d-flex flex-column gap-1">
          <div>Your entered text containes:</div>
          <div>{(incSpace) ? input.length : input.split(/\s+/).join('').length} characters and {input.split(/\s+/).filter((w) => { return (w !== "") }).length} words</div>
          <div>Time to read: {0.008 * input.split(/\s+/).filter((w) => { return (w !== "") }).length} minutes</div>
          <div className="form-check form-switch">
            <input className="form-check-input" type="checkbox" role="switch" id="incSpaceSwitch" onClick={toggleIncSpace} checked={incSpace} />
            <label className="form-check-label" for="incSpaceSwitch">Include white spaces in characters</label>
          </div>
        </div>
      </div>
    </div>
    <hr />
    <div className="textform-main-div-1 w-100">
      <p className="display-6 mt-3 mb-2">Output Preview</p>
      <p>{(output === '') ? "Nothing to preview" : output}</p>
    </div>
    </>
  )
}

Textform.propTypes = {
    mode: PropTypes.string.isRequired,
    heading: PropTypes.string.isRequired,
    rows: PropTypes.number.isRequired,
    phInput: PropTypes.string,
    phOutput: PropTypes.string,
};

Textform.defaultProps = {
    mode: 'light',
    heading: 'Enter text',
    rows: 5,
    phInput: 'Input here...',
    phOutput: 'Output here...',
};
