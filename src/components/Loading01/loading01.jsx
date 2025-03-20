import "./loading01.css"

function Loading01 (props) {
    return (
        <div className="Loading01" style={{ display: props.display ? 'flex' : "none"}}>
            <div className="Circle_Loading1" ></div>
        </div>
    )
}

export default Loading01