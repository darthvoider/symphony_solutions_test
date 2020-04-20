import React, { useCallback, useState } from 'react';
import { useAsync } from 'react-async';
import './App.scss';
import { getData } from './api/get-data';
import { RenderOneLevel } from './components/one-level';
import { useToggle } from './hooks/use-toggle';

function App() {
    const [state, setState] = useState({});
    const {isOpen, toggle} = useToggle(true)
    useAsync({
        promiseFn: getData,
        onResolve: useCallback(resp => {
            if (!resp) return;
            setState(resp);
        }, [])
    });

    const objectToArr = obj => {
        let m = [];
        for (let k of Object.keys(obj)) {
            if (obj[k] instanceof Object) {
                m.push({ value: k, children: objectToArr(obj[k])});
            } else {
                m.push(`${k}:${obj[k]}` );
            }
        }
        return m;
    };

    const formatState = objectToArr(state);
    const buttonText = isOpen ? 'Collapse All' : 'Open All';
    return (

        <div className="app">
            <button className='btn' onClick={toggle}>{buttonText}</button>
            {formatState.map((oneLevel, index) => <RenderOneLevel oneLevel={oneLevel} key={index} isOpen={isOpen}/>)}
        </div>
    );
}

export default App;
