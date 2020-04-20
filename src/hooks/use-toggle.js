import React from 'react';

export function useToggle(defaultValue = false) {
    const [isOpen, setIsOpen] = React.useState(defaultValue);

    const toggle = () => setIsOpen(!isOpen);

    return { isOpen, toggle };
}
