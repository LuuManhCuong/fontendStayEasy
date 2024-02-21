
function NumGuest({type, totalGuest, setTotalGuest}) {
    
    if(type === "adult") {
        return (
            <div className="flex justify-between items-center w-full p-4 pb-0">
                <div className="flex flex-col">
                    <span className="text-3xl font-semibold">Adults</span>
                    <span className="text-2xl font-normal">Ages 13 or above</span>
                </div>
                <div className="flex items-center">
                    <button onClick={()=> setTotalGuest(totalGuest-1)} className="text-3xl font-semibold">-</button>
                    <span className="text-3xl font-semibold">{totalGuest}</span>
                    <button onClick={()=> setTotalGuest(totalGuest+1)} className="text-3xl font-semibold">+</button>
                </div>
            </div>
        )
    }else if(type === "children") {
        return (
            <div className="flex justify-between items-center w-full p-4 pb-0">
                <div className="flex flex-col">
                    <span className="text-3xl font-semibold">Children</span>
                    <span className="text-2xl font-normal">Ages 2-12</span>
                </div>
                <div className="flex items-center">
                    <button onClick={()=> setTotalGuest(totalGuest-1)} className="text-3xl font-semibold">-</button>
                    <span className="text-3xl font-semibold">{totalGuest}</span>
                    <button onClick={()=> setTotalGuest(totalGuest+1)} className="text-3xl font-semibold">+</button>
                </div>
            </div>
        )
}else if(type === "infants") {
    return (
        <div className="flex justify-between items-center w-full p-4 pb-0">
            <div className="flex flex-col">
                <span className="text-3xl font-semibold">Infants</span>
                <span className="text-2xl font-normal">Under 2</span>
            </div>
            <div className="flex items-center">
                    <button onClick={()=> setTotalGuest(totalGuest-1)} className="text-3xl font-semibold">-</button>
                    <span className="text-3xl font-semibold">{totalGuest}</span>
                    <button onClick={()=> setTotalGuest(totalGuest+1)} className="text-3xl font-semibold">+</button>
                </div>
        </div>
    )
}else {
    return (
        <div className="flex justify-between items-center w-full p-4 pb-0">
            <div className="flex flex-col">
                <span className="text-3xl font-semibold">Pet</span>
            </div>
            <div className="flex items-center">
                    <button onClick={()=> setTotalGuest(totalGuest-1)} className="text-3xl font-semibold">-</button>
                    <span className="text-3xl font-semibold">{totalGuest}</span>
                    <button onClick={()=> setTotalGuest(totalGuest+1)} className="text-3xl font-semibold">+</button>
                </div>
        </div>
    )
}
}
export default NumGuest;