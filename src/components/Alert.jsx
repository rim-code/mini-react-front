import React from 'react'

export default ({ message, color }) => {
    return (
        <>
            <div class={`alert alert-${color} d-flex align-items-center`} role="alert">
                <svg class="bi flex-shrink-0 me-2" width="24" height="24" role="img" aria-label="Success:"></svg>
                <div>
                    {message}
                </div>
            </div>
        </>
    )
}