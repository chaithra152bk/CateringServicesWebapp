export default (state=[], action) =>
{
    let newStatus = '';
    switch(action.type)
    {
        case 'CHANGE_USER_STATUS':
        if(action.payload.status=='active')
            {
                newStatus = 'unable';
            }
            else
            {
                newStatus = 'acive';
            }
        state = [...state, Object.assign({}, action.payload)]; 
        return [{...state[0], status: newStatus}]; 
        default:
        return state;
    }   
};
