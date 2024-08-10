import React, { useEffect, useState } from "react";
import { call_secure_get_api } from "../connect/api";
import { formatDateTime } from "../helper/general.js"
const ActivitySection = () => {
    const [activity_list, SetActivity] = useState([]);
    useEffect(() => {
        get_activity();
    }, []);
    const get_activity = () => {
        call_secure_get_api('activity')
            .then(
                (resolve) => {
                    if (resolve.status === true) {
                        SetActivity(resolve.data.list);
                    }
                    else {
                        SetActivity([]);
                    }
                },
                (reject) => {
                    console.log(reject);
                }
            )
    }
    return (
        <>
            <div className="row">
                {activity_list.map((item, index) => {
                    return (
                        <div className="col-4 mb-3" key={index}>
                            <div className="acitivity-item d-flex">
                                <div className="flex-shrink-0">
                                    <div className="avatar-xs rounded-circle acitivity-avatar shadow "><i className="mdi mdi-logout"></i> </div>
                                </div>
                                <div className="flex-grow-1 ms-3">
                                    <h6 className="mb-1">{item.browserName}
                                        {item.session_status == 1 && <span className="text bg-success-subtle text-success align-middle m-2">Active</span>}
                                     
                                    </h6>
                                    <p className="text-muted mb-1">{item.platformName}</p>
                                    <small className="mb-0 text-muted">{formatDateTime(item.created_at, 'string')}</small>
                                </div>
                            </div>
                        </div>)
                })}
            </div>
        </>
    );
}
export default ActivitySection;