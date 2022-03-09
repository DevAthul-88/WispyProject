

const testReducer = (state , action) => {
    switch (action.type) {
        case "tet":
            
            return {loading:false}
    
        default:
            return {}
    }
}
export default testReducer