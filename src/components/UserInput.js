const UserInput = ({name, state, setState}) => {

    return (
        <div className="storage">
            <p>{name}: {state} $ GB</p>
            <input type="range" value={state} min={0} max={1000} step={1}
                   onChange={(e) => setState(e.target.value)}/>
        </div>
    )
}

export default UserInput
