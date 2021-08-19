const UnderConstruction = ({label}:{label?:string}) => {
    return (
        <div style={{display:"flex", alignItems:"center", justifyContent:"center", height:"calc(100vh - 100px)"}}>
            {
                label &&
                <h1>{label}</h1>
            }            
            <h3>Under Construction</h3>
        </div>
    )
}

export default UnderConstruction;