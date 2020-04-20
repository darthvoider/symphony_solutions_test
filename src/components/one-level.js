import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { randomId } from '../helpers';

const renderString = str => <p key={randomId()} className='string'>{str}</p>;

export const RenderOneLevel = ({ oneLevel, propLevel , isOpen }) => {
    const [isShow, setIsShow] = useState(isOpen);
    useEffect(() => {
        setIsShow(isOpen);
    }, [isOpen]);
    const handleIsShow = () => setIsShow(!isShow);
    const classLevel = propLevel + 1;
    if (typeof oneLevel === 'string') {
        return renderString(oneLevel);
    }

    if (oneLevel.hasOwnProperty('children')) {
        const { value, children } = oneLevel;
        return (
            <div className={`wrapper level-${classLevel}`} key={randomId()}>
                <button onClick={handleIsShow} className={`level-btn ${isShow && 'is-show'}`}>{value}</button>
                {isShow && <div className={`inner level-${classLevel}`} key={randomId()}>
                    {children.map(child => {
                        if (typeof child === 'string') {
                            return renderString(child);
                        } else {
                            return (
                                <RenderOneLevel key={randomId()} oneLevel={child} propLevel={classLevel} isOpen={isOpen} />
                            );
                        }
                    })}
                </div>}
            </div>
        );
    }
};

RenderOneLevel.PropTypes = {
    oneLevel: PropTypes.oneOfType([PropTypes.string.isRequired, PropTypes.node.isRequired]),
    propLevel: PropTypes.number,
    isOpen: PropTypes.bool.isRequired
};

RenderOneLevel.defaultProps = {
    propLevel: 0
}
