import React from 'react';

const TypeComp = ({ MethodDetails, selectedMethod, readonly, HandleMethodSelection }) => {
   
    return (
        <div>
            <div className="choose-Method-container box-design text-center flex flex-col justify-center w-fit">
                <h1>Choose One</h1>
                <div className="flex">
                    {MethodDetails.map((MethodD, index) => (
                        <div className={`Method-box box-design flex flex-col items-center justify-center m-3 ${selectedMethod === MethodD.id ? "selectedCss_Method" : ''}`} style={{ fontSize: '20px', width: '200px' }} key={MethodD.id} onClick={() => HandleMethodSelection(MethodD.id)}>
                            <input type="radio" id={`Method-${MethodD.id}`} name='Method' disabled={readonly} value={MethodD.id} checked={selectedMethod === MethodD.id} onChange={() => HandleMethodSelection(MethodD.id)} className='Method-radio-btn relative left-16 top-3 w-5 aspect-square' />
                            <label htmlFor={MethodD.label} className={`Method-label`}>
                                <img src={MethodD.imgs} name={MethodD.label} alt="Method-img" width='45px' />{MethodD.label}
                            </label>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default TypeComp;
