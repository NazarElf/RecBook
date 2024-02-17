import React from 'react'

export const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
    <button
        ref={ref}
        onClick={(e) => {
            e.preventDefault();
            onClick(e);
        }}
    >
        {children}{' '}<i class="bi bi-three-dots"></i>
    </button>
));