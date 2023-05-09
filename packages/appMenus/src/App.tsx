import React from 'react'

export interface IProps {
    user?: any;
    apps?: any[];
    lisenceApps?: any[];
    projectSpaceIdMap?: any;
    isDemo?: boolean;
    top?: number;
    showBackPortal?: boolean;
}


const AppMenus = (props: IProps) => {
    const { user, isDemo, top } = props;
    console.log('props', props)
    return (
        <>
            <div> 我是appMenus</div>
            <p>user: {JSON.stringify(user)}</p>
            <p>isDemo: {`${isDemo}`}</p>
            <p>top: {top}</p>
            <a href="http://www.baidu.com" style={{ color: "#fff" }}>跳转</a>
        </>

    )
}

export default AppMenus
