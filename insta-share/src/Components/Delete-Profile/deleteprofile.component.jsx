import { Button } from "react-bootstrap";

function DeletePopup({ removeProfilePic, closePopup }) {
    return (
        <div>
            <div>Do You Want Remove Profile</div>
            <Button className="btn btn-danger mt-5 ms-2" onClick={removeProfilePic}>Yes</Button>
            <Button className="btn btn-success mt-5 ms-3" onClick={closePopup}>No</Button>
        </div>
    );
}

export default DeletePopup;
