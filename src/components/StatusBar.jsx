import { useSnapshot } from "valtio";
import { FaEdit } from "react-icons/fa";
import state from './../store/index';
import { appWriteUpdateStatus } from "../api/appWrite/api";
import { toast } from 'sonner';
import { useState } from "react";
import { MdCancelPresentation, MdOutlineCheckBox } from "react-icons/md";
const StatusBar = () => {
    const snap = useSnapshot(state)
    const [editing, setEditing] = useState(false);
    const [status, setStatus] = useState(snap.userInfo.status ? snap.userInfo.status : "Your status...");

    const updateStatus = (status) => {
        if (status === snap.userInfo.status) {
            return
        }
        toast.promise(appWriteUpdateStatus(status),
            {
                loading: "Updating status...",
                success: "Status updated successfully",
                error: "Error updating status, please try again",
            })
    }
    return <nav>
        <div>
            <p>Private messages</p>
            <p>Group messages</p>
        </div>
        <div className="status">
            <div>
                <p>Status:</p>
                <input type="text" readOnly={!editing} value={status} onChange={(e) => setStatus(e.target.value)} className={editing ? "editing" : ""} />
            </div>
            <div>
                {/* <FaEdit onClick={() => updateStatus("UPDATE")} /> */}
                {!editing && <FaEdit className="edit" onClick={() => setEditing(!editing)} />}
                {editing &&
                    <>
                        <MdCancelPresentation className="cancel" onClick={() => { setEditing(!editing), setStatus(state.userInfo.status ? state.userInfo.status : "Your status...") }} />
                        <MdOutlineCheckBox className="confirm" onClick={() => { updateStatus(status), setEditing(!editing) }} />
                    </>
                }
            </div>
        </div>
        <div className="userPhoto">
            <img src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png" alt="profileImage" />
            <FaEdit />
        </div>

    </nav>
};

export default StatusBar;
