import React from 'react'
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";

function Skeletons() {
    return (
        <div style={{ width: '100%', margin: '1rem 0' }}>
            <SkeletonTheme color="#343a40" highlightColor="#3c4147">
                <Skeleton height={180} />
                <div>
                    <Skeleton circle={true} height={40} width={40} style={{ margin: "1rem 0px" }} />
                    <Skeleton height={40} width="80%" style={{margin:"0px 2px"}} />
                </div>
            </SkeletonTheme>
        </div>
    )
}

export default Skeletons
