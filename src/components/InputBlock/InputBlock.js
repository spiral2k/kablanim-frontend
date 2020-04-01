import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';

import './InputBlock.scss';

function InputBlock(props) {
    const [touched, setTouched] = useState(!!props.value || false);
    const [focus, setFocus] = useState(false);
    const inputRef = useRef(null);

    const handleBlur = e => {
        if (!touched) setTouched(true);
        setFocus(false);
        props.onBlur(e);
    };

    const handleFocus = () => {
        setFocus(true);
    };

    const handleLabelClick = () => {
        if (!focus) {
            inputRef.current.focus();
        }
    };

    return (
        <div
            className={`input-block ${props.className} ${focus && 'focus'} ${props.value &&
                'has-value'} ${
                !props.error && props.inputClassName !== 'error' && touched && props.value
                    ? ' success'
                    : ''
            }`}
        >
            <label className="input-block-label" htmlFor={props.id} onClick={handleLabelClick}>
                {props.placeholder}
            </label>
            <input
                ref={inputRef}
                id={props.id}
                type={props.type || 'text'}
                className={`input ${props.error && props.errorBorder ? 'error' : ''} ${
                    props.inputClassName
                }`}
                onChange={props.onChange}
                onFocus={handleFocus}
                onBlur={handleBlur}
                value={props.value}
                disabled={props.disabled}
            />
            {props.instructions && <div className="instructions">{props.instructions}</div>}
            {props.error && !props.hideError && (
                <div className={`error-box ${props.errorClass}`}>{props.error}</div>
            )}
        </div>
    );
}

InputBlock.propTypes = {
    id: PropTypes.string,
    type: PropTypes.string,
    instructions: PropTypes.string,
    placeholder: PropTypes.string,
    onChange: PropTypes.func,
    error: PropTypes.string,
    value: PropTypes.string,
    disabled: PropTypes.bool,
    className: PropTypes.string,
    onBlur: PropTypes.func,
    inputClassName: PropTypes.string,
    errorBorder: PropTypes.bool,
    errorClass: PropTypes.string,
    hideError: PropTypes.bool
};

InputBlock.defaultProps = {
    id: '',
    type: '',
    onChange: () => {},
    instructions: '',
    placeholder: '',
    error: '',
    value: '',
    disabled: false,
    className: '',
    onBlur: () => {},
    inputClassName: '',
    errorBorder: true,
    errorClass: '',
    hideError: false
};

export default InputBlock;
