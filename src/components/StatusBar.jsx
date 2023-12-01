import React from "react";

const StatusBar = () => {
    return <nav>
        <div>
            <p>Private messages</p>
            <p>Public messages</p>
        </div>
        <div className="status">
            <p><span>Your status:  </span> BLABLABLA...</p>
            <p>Localtime</p>
            <p>theme</p>
            <p>edit your profile</p>
        </div>
    </nav>
};

export default StatusBar;
